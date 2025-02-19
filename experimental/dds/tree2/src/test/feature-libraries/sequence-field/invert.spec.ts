/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { strict as assert } from "assert";
import {
	ChangeAtomId,
	ChangesetLocalId,
	mintRevisionTag,
	RevisionTag,
	tagChange,
} from "../../../core";
import { TestChange } from "../../testChange";
import { deepFreeze } from "../../utils";
import { brand } from "../../../util";
import { SequenceField as SF } from "../../../feature-libraries";
import { composeAnonChanges, invert as invertChange } from "./utils";
import { ChangeMaker as Change, MarkMaker as Mark, TestChangeset } from "./testEdits";

function invert(change: TestChangeset): TestChangeset {
	deepFreeze(change);
	return invertChange(tagChange(change, tag1));
}

const tag1: RevisionTag = mintRevisionTag();
const tag2: RevisionTag = mintRevisionTag();

const childChange1 = TestChange.mint([0], 1);
const childChange2 = TestChange.mint([1], 2);
const childChange3 = TestChange.mint([2], 3);
const inverseChildChange1 = TestChange.invert(childChange1);
const inverseChildChange2 = TestChange.invert(childChange2);
const inverseChildChange3 = TestChange.invert(childChange3);

describe("SequenceField - Invert", () => {
	it("no changes", () => {
		const input: TestChangeset = [];
		const expected: TestChangeset = [];
		const actual = invert(input);
		assert.deepEqual(actual, expected);
	});

	it("child changes", () => {
		const input = Change.modify(0, childChange1);
		const expected = Change.modify(0, inverseChildChange1);
		const actual = invert(input);
		assert.deepEqual(actual, expected);
	});

	it("child changes of removed content", () => {
		const detachEvent = { revision: tag1, localId: brand<ChangesetLocalId>(0) };
		const input = Change.modifyDetached(0, childChange1, detachEvent);
		const actual = invert(input);
		const expected = Change.modifyDetached(0, inverseChildChange1, detachEvent);
		assert.deepEqual(actual, expected);
	});

	it("insert => delete", () => {
		const input = Change.insert(0, 2);
		const expected = Change.delete(0, 2);
		const actual = invert(input);
		assert.deepEqual(actual, expected);
	});

	it("insert & modify => modify & delete", () => {
		const insert = Change.insert(0, 1);
		const nodeChange = TestChange.mint([], 42);
		const modify = Change.modify(0, nodeChange);
		const input = composeAnonChanges([insert, modify]);
		const inverseModify = Change.modify(0, TestChange.invert(nodeChange));
		const expected = composeAnonChanges([inverseModify, Change.delete(0, 1)]);
		const actual = invert(input);
		assert.deepEqual(actual, expected);
	});

	it("delete => revive", () => {
		const input = composeAnonChanges([Change.modify(0, childChange1), Change.delete(0, 2)]);
		const expected = composeAnonChanges([
			Change.revive(0, 2, { revision: tag1, localId: brand(0) }),
			Change.modify(0, inverseChildChange1),
		]);
		const actual = invert(input);
		assert.deepEqual(actual, expected);
	});

	it("delete => revive (with override ID)", () => {
		const cellId: ChangeAtomId = { revision: tag2, localId: brand(0) };
		const input: TestChangeset = [
			{
				type: "Delete",
				count: 2,
				id: brand(5),
				detachIdOverride: cellId,
			},
		];

		const expected = Change.revive(0, 2, cellId);
		const actual = invert(input);
		assert.deepEqual(actual, expected);
	});

	it("active revive => delete", () => {
		const cellId: ChangeAtomId = { revision: tag1, localId: brand(0) };
		const input = Change.revive(0, 2, cellId);
		const expected: TestChangeset = [Mark.delete(2, brand(0), { detachIdOverride: cellId })];
		const actual = invert(input);
		assert.deepEqual(actual, expected);
	});

	it("move => return", () => {
		const input = composeAnonChanges([Change.modify(0, childChange1), Change.move(0, 2, 5)]);
		const expected = composeAnonChanges([
			Change.modify(3, inverseChildChange1),
			Change.return(3, 2, 0, { revision: tag1, localId: brand(0) }),
		]);
		const actual = invert(input);
		assert.deepEqual(actual, expected);
	});

	it("move backward => return", () => {
		const input = composeAnonChanges([Change.modify(3, childChange1), Change.move(2, 2, 0)]);
		const expected = composeAnonChanges([
			Change.modify(1, inverseChildChange1),
			Change.return(0, 2, 4, { revision: tag1, localId: brand(0) }),
		]);
		const actual = invert(input);
		assert.deepEqual(actual, expected);
	});

	it("return => return", () => {
		const cellId: ChangeAtomId = { revision: tag1, localId: brand(0) };
		const input = composeAnonChanges([
			Change.modify(0, childChange1),
			Change.return(0, 2, 5, cellId),
		]);

		const expected: TestChangeset = [
			Mark.returnTo(2, brand(0), cellId),
			{ count: 3 },
			Mark.returnFrom(1, brand(0), {
				detachIdOverride: cellId,
				changes: inverseChildChange1,
			}),
			Mark.returnFrom(1, brand(1), {
				detachIdOverride: { revision: tag1, localId: brand(1) },
			}),
		];
		const actual = invert(input);
		assert.deepEqual(actual, expected);
	});

	it("transient => transient", () => {
		const transient = [
			Mark.transient(Mark.insert(1, brand(1)), Mark.delete(1, brand(0)), {
				changes: childChange1,
			}),
		];

		const inverse = invert(transient);
		const expected = [
			Mark.transient(
				Change.revive(0, 1, { revision: tag1, localId: brand(0) })[0] as SF.CellMark<
					SF.Insert,
					unknown
				>,
				Mark.delete(1, brand(1)),
				{ changes: inverseChildChange1 },
			),
		];

		assert.deepEqual(inverse, expected);
	});

	it("Muted transient => delete", () => {
		const transient = [
			Mark.transient(Mark.revive(1, undefined), Mark.delete(1, brand(0)), {
				changes: childChange1,
			}),
		];

		const inverse = invert(transient);
		const expected = [
			Mark.revive(1, { revision: tag1, localId: brand(0) }, { changes: inverseChildChange1 }),
		];

		assert.deepEqual(inverse, expected);
	});

	it("Insert and move => move and delete", () => {
		const insertAndMove = [
			Mark.transient(Mark.insert(1, brand(0)), Mark.moveOut(1, brand(1)), {
				changes: childChange1,
			}),
			{ count: 1 },
			Mark.moveIn(1, brand(1)),
		];

		const inverse = invert(insertAndMove);
		const expected = [
			Mark.transient(
				Mark.returnTo(1, brand(1), { revision: tag1, localId: brand(1) }),
				Mark.delete(1, brand(0)),
			),
			{ count: 1 },
			Mark.returnFrom(1, brand(1), { changes: inverseChildChange1 }),
		];

		assert.deepEqual(inverse, expected);
	});

	it("Move and delete => revive and move", () => {
		const moveAndDelete = [
			Mark.moveOut(1, brand(0), { changes: childChange1 }),
			{ count: 1 },
			Mark.transient(Mark.moveIn(1, brand(0)), Mark.delete(1, brand(1))),
		];

		const inverse = invert(moveAndDelete);
		const expected = [
			Mark.returnTo(1, brand(0), { revision: tag1, localId: brand(0) }),
			{ count: 1 },
			Mark.transient(
				Mark.revive(1, { revision: tag1, localId: brand(1) }),
				Mark.returnFrom(1, brand(0)),
				{ changes: inverseChildChange1 },
			),
		];

		assert.deepEqual(inverse, expected);
	});

	it("Move chain => return chain", () => {
		const moves = [
			Mark.moveOut(1, brand(0), {
				changes: childChange1,
				finalEndpoint: { localId: brand(1) },
			}),
			{ count: 1 },
			Mark.transient(Mark.moveIn(1, brand(0)), Mark.moveOut(1, brand(1))),
			{ count: 1 },
			Mark.moveIn(1, brand(1), { finalEndpoint: { localId: brand(0) } }),
		];

		const inverse = invert(moves);
		const expected = [
			Mark.returnTo(
				1,
				brand(0),
				{ revision: tag1, localId: brand(0) },
				{ finalEndpoint: { localId: brand(1) } },
			),
			{ count: 1 },
			Mark.transient(
				Mark.returnTo(1, brand(1), { revision: tag1, localId: brand(1) }),
				Mark.returnFrom(1, brand(0)),
			),
			{ count: 1 },
			Mark.returnFrom(1, brand(1), {
				changes: inverseChildChange1,
				finalEndpoint: { localId: brand(0) },
			}),
		];

		assert.deepEqual(inverse, expected);
	});

	describe("Redundant changes", () => {
		it("delete", () => {
			const cellId = { revision: tag1, localId: brand<ChangesetLocalId>(0) };
			const input = [
				Mark.onEmptyCell(cellId, Mark.delete(1, brand(0), { changes: childChange1 })),
			];

			const actual = invert(input);
			const expected = Change.modifyDetached(0, inverseChildChange1, cellId);
			assert.deepEqual(actual, expected);
		});

		it("move out", () => {
			const cellId = { revision: tag1, localId: brand<ChangesetLocalId>(0) };
			const input = [
				Mark.onEmptyCell(cellId, Mark.moveOut(1, brand(0), { changes: childChange1 })),
				Mark.moveIn(1, brand(0), { isSrcConflicted: true }),
			];

			const actual = invert(input);
			const expected = Change.modifyDetached(0, inverseChildChange1, cellId);
			assert.deepEqual(actual, expected);
		});

		it("redundant revive => skip", () => {
			const input = composeAnonChanges([
				Change.modify(0, childChange1),
				Change.redundantRevive(1, 1, { revision: tag1, localId: brand(0) }),
				Change.modify(2, childChange2),
			]);
			const expected = composeAnonChanges([
				Change.modify(0, inverseChildChange1),
				Change.modify(2, inverseChildChange2),
			]);
			const actual = invert(input);
			assert.deepEqual(actual, expected);
		});

		it("return-from + redundant return-to => skip + skip", () => {
			const input = [
				Mark.returnFrom(1, brand(0), { isDstConflicted: true, changes: childChange1 }),
				Mark.returnTo(1, brand(0)),
				Mark.modify(childChange2),
			];
			const actual = invert(input);
			const expected = [
				Mark.modify(inverseChildChange1), // Inactive return-from
				{ count: 1 }, // Inactive return-to whose cells are occupied
				Mark.modify(inverseChildChange2),
			];
			assert.deepEqual(actual, expected);
		});

		it("redundant move-out + move-in => nil + nil", () => {
			const input = [
				Mark.onEmptyCell({ revision: tag2, localId: brand(0) }, Mark.moveOut(1, brand(0))),
				Mark.modify(childChange1),
				Mark.moveIn(1, brand(0), { isSrcConflicted: true }),
				Mark.modify(childChange2),
			];
			const actual = invert(input);
			const expected = composeAnonChanges([
				Change.modify(0, inverseChildChange1),
				Change.modify(1, inverseChildChange2),
			]);
			assert.deepEqual(actual, expected);
		});

		it("redundant return-from + return to => nil + nil", () => {
			const input = [
				Mark.onEmptyCell(
					{ revision: tag2, localId: brand(0) },
					Mark.returnFrom(1, brand(0)),
				),
				Mark.modify(childChange1),
				Mark.returnTo(
					1,
					brand(0),
					{ revision: tag2, localId: brand(0) },
					{ isSrcConflicted: true },
				),
				Mark.modify(childChange2),
			];
			const actual = invert(input);
			const expected = composeAnonChanges([
				Change.modify(0, inverseChildChange1),
				Change.modify(1, inverseChildChange2),
			]);
			assert.deepEqual(actual, expected);
		});

		it("redundant return-from + redundant return-to => nil + skip", () => {
			const input = [
				Mark.onEmptyCell(
					{ revision: tag2, localId: brand(0) },
					Mark.returnFrom(1, brand(0), { isDstConflicted: true }),
				),
				Mark.modify(childChange1),
				Mark.returnTo(1, brand(0), undefined, { isSrcConflicted: true }),
				Mark.modify(childChange2),
			];
			const actual = invert(input);
			const expected = composeAnonChanges([
				Change.modify(0, inverseChildChange1),
				Change.modify(2, inverseChildChange2),
			]);
			assert.deepEqual(actual, expected);
		});
	});
});
