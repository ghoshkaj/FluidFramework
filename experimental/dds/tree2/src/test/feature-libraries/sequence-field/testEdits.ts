/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { SequenceField as SF, singleTextCursor } from "../../../feature-libraries";
import { brand } from "../../../util";
import {
	ChangeAtomId,
	ChangesetLocalId,
	JsonableTree,
	mintRevisionTag,
	RevisionTag,
	TreeNodeSchemaIdentifier,
} from "../../../core";
import { TestChange } from "../../testChange";
import { composeAnonChanges } from "./utils";

const type: TreeNodeSchemaIdentifier = brand("Node");
const tag: RevisionTag = mintRevisionTag();

export type TestChangeset = SF.Changeset<TestChange>;

export const cases: {
	no_change: TestChangeset;
	insert: TestChangeset;
	modify: TestChangeset;
	modify_insert: TestChangeset;
	delete: TestChangeset;
	revive: TestChangeset;
	move: TestChangeset;
	return: TestChangeset;
	transient_insert: TestChangeset;
} = {
	no_change: [],
	insert: createInsertChangeset(1, 2, 1),
	modify: SF.sequenceFieldEditor.buildChildChange(0, TestChange.mint([], 1)),
	modify_insert: composeAnonChanges([
		createInsertChangeset(1, 1, 1),
		createModifyChangeset(1, TestChange.mint([], 2)),
	]),
	delete: createDeleteChangeset(1, 3),
	revive: createReviveChangeset(2, 2, { revision: tag, localId: brand(0) }),
	move: createMoveChangeset(1, 2, 4),
	return: createReturnChangeset(1, 3, 0, { revision: tag, localId: brand(0) }),
	transient_insert: [
		{ count: 1 },
		createTransientMark(createInsertMark(2, brand(1)), createDeleteMark(2, brand(2))),
	],
};

function createInsertChangeset(
	index: number,
	size: number,
	startingValue: number = 0,
	id?: ChangesetLocalId,
): SF.Changeset<never> {
	const content = generateJsonables(size, startingValue);
	return SF.sequenceFieldEditor.insert(
		index,
		content.map(singleTextCursor),
		id ?? brand(startingValue),
	);
}

function generateJsonables(size: number, startingValue: number = 0) {
	const content = [];
	while (content.length < size) {
		content.push({ type, value: startingValue + content.length });
	}
	return content;
}

function createDeleteChangeset(
	startIndex: number,
	size: number,
	id?: ChangesetLocalId,
): SF.Changeset<never> {
	return SF.sequenceFieldEditor.delete(startIndex, size, id ?? brand(0));
}

function createRedundantRemoveChangeset(
	index: number,
	size: number,
	detachEvent: ChangeAtomId,
): SF.Changeset<never> {
	const changeset = createDeleteChangeset(index, size);
	changeset[changeset.length - 1].cellId = detachEvent;
	return changeset;
}

function createRedundantReviveChangeset(
	startIndex: number,
	count: number,
	detachEvent: SF.CellId,
): SF.Changeset<never> {
	const markList = SF.sequenceFieldEditor.revive(startIndex, count, detachEvent);
	const mark = markList[markList.length - 1];
	delete mark.cellId;
	return markList;
}

function createReviveChangeset(
	startIndex: number,
	count: number,
	detachEvent: SF.CellId,
): SF.Changeset<never> {
	return SF.sequenceFieldEditor.revive(startIndex, count, detachEvent);
}

function createMoveChangeset(
	sourceIndex: number,
	count: number,
	destIndex: number,
	id: ChangesetLocalId = brand(0),
): SF.Changeset<never> {
	return SF.sequenceFieldEditor.move(sourceIndex, count, destIndex, id);
}

function createReturnChangeset(
	sourceIndex: number,
	count: number,
	destIndex: number,
	detachEvent: SF.CellId,
): SF.Changeset<never> {
	return SF.sequenceFieldEditor.return(sourceIndex, count, destIndex, detachEvent);
}

function createModifyChangeset<TNodeChange>(
	index: number,
	change: TNodeChange,
): SF.Changeset<TNodeChange> {
	return SF.sequenceFieldEditor.buildChildChange(index, change);
}

function createModifyDetachedChangeset<TNodeChange>(
	index: number,
	change: TNodeChange,
	detachEvent: SF.CellId,
): SF.Changeset<TNodeChange> {
	const changeset = createModifyChangeset(index, change);
	const modify = changeset[changeset.length - 1] as SF.CellMark<SF.NoopMark, TNodeChange>;
	modify.cellId = detachEvent;
	return changeset;
}

/**
 * @param countOrContent - The content to insert.
 * If a number is passed, that many dummy nodes will be generated.
 * @param cellId - The first cell to insert the content into (potentially includes lineage information).
 * Also defines the ChangeAtomId to associate with the mark.
 * @param overrides - Any additional properties to add to the mark.
 */
function createInsertMark<TChange = never>(
	countOrContent: number | JsonableTree[],
	cellId: ChangesetLocalId | SF.CellId,
	overrides?: Partial<SF.CellMark<SF.Insert, TChange>>,
): SF.CellMark<SF.Insert, TChange> {
	const content = Array.isArray(countOrContent)
		? countOrContent
		: generateJsonables(countOrContent);
	const cellIdObject: SF.CellId = typeof cellId === "object" ? cellId : { localId: cellId };
	const mark: SF.CellMark<SF.Insert, TChange> = {
		type: "Insert",
		content,
		count: content.length,
		cellId: cellIdObject,
	};
	if (cellIdObject.revision !== undefined) {
		mark.revision = cellIdObject.revision;
	}
	return { ...mark, ...overrides };
}

/**
 * @param count - The content to revive.
 * If a number is passed, that many dummy nodes will be generated.
 * @param cellId - The first cell to revive content into.
 * If undefined, the revive targets populated cells and is therefore muted.
 * @param overrides - Any additional properties to add to the mark.
 * Use this to give the mark a `RevisionTag`
 */
function createReviveMark<TChange = never>(
	count: number,
	cellId?: SF.CellId,
	overrides?: Partial<SF.CellMark<SF.Insert, TChange>>,
): SF.CellMark<SF.Insert, TChange> {
	const mark: SF.CellMark<SF.Insert, TChange> = {
		type: "Insert",
		count,
	};
	if (cellId !== undefined) {
		mark.cellId = cellId;
	}
	return { ...mark, ...overrides };
}

/**
 * @param count - The number of nodes to delete.
 * @param markId - The id to associate with the mark.
 * Defines how later edits refer the emptied cells.
 * @param overrides - Any additional properties to add to the mark.
 */
function createDeleteMark<TChange = never>(
	count: number,
	markId: ChangesetLocalId | ChangeAtomId,
	overrides?: Partial<SF.CellMark<SF.Delete, TChange>>,
): SF.CellMark<SF.Delete, TChange> {
	const cellId: ChangeAtomId = typeof markId === "object" ? markId : { localId: markId };
	const mark: SF.CellMark<SF.Delete, TChange> = {
		type: "Delete",
		count,
		id: cellId.localId,
	};
	if (cellId.revision !== undefined) {
		mark.revision = cellId.revision;
	}
	return { ...mark, ...overrides };
}

/**
 * @param count - The number of nodes to move out.
 * @param markId - The id to associate with the mark.
 * Defines how later edits refer the emptied cells.
 * @param overrides - Any additional properties to add to the mark.
 */
function createMoveOutMark<TChange = never>(
	count: number,
	markId: ChangesetLocalId | ChangeAtomId,
	overrides?: Partial<SF.CellMark<SF.MoveOut, TChange>>,
): SF.CellMark<SF.MoveOut, TChange> {
	const atomId: ChangeAtomId = typeof markId === "object" ? markId : { localId: markId };
	const mark: SF.CellMark<SF.MoveOut, TChange> = {
		type: "MoveOut",
		count,
		id: atomId.localId,
	};
	if (atomId.revision !== undefined) {
		mark.revision = atomId.revision;
	}
	return { ...mark, ...overrides };
}

/**
 * @param count - The number of nodes moved in.
 * @param cellId - The first cell to move the content into (potentially includes lineage information).
 * Also defines the ChangeAtomId to associate with the mark.
 * @param overrides - Any additional properties to add to the mark.
 */
function createMoveInMark(
	count: number,
	cellId: ChangesetLocalId | SF.CellId,
	overrides?: Partial<SF.CellMark<SF.MoveIn, never>>,
): SF.CellMark<SF.MoveIn, never> {
	const cellIdObject: SF.CellId = typeof cellId === "object" ? cellId : { localId: cellId };
	const mark: SF.CellMark<SF.MoveIn, never> = {
		type: "MoveIn",
		id: cellIdObject.localId,
		cellId: cellIdObject,
		count,
	};
	if (cellIdObject.revision !== undefined) {
		mark.revision = cellIdObject.revision;
	}
	return { ...mark, ...overrides };
}

/**
 * @param count - The number of nodes to be detached.
 * @param markId - The id to associate with the mark.
 * Defines how later edits refer the emptied cells.
 * @param overrides - Any additional properties to add to the mark.
 */
function createReturnFromMark<TChange = never>(
	count: number,
	markId: ChangesetLocalId | ChangeAtomId,
	overrides?: Partial<SF.CellMark<SF.ReturnFrom, TChange>>,
): SF.CellMark<SF.ReturnFrom, TChange> {
	const atomId: ChangeAtomId = typeof markId === "object" ? markId : { localId: markId };
	const mark: SF.CellMark<SF.ReturnFrom, TChange> = {
		type: "ReturnFrom",
		count,
		id: atomId.localId,
	};
	if (atomId.revision !== undefined) {
		mark.revision = atomId.revision;
	}
	return { ...mark, ...overrides };
}

/**
 * @param count - The number of nodes to attach.
 * @param markId - The id to associate with the mark.
 * @param cellId - The cell to return the nodes to.
 * If undefined, the mark targets populated cells and is therefore muted.
 * @param overrides - Any additional properties to add to the mark.
 */
function createReturnToMark(
	count: number,
	markId: ChangesetLocalId | ChangeAtomId,
	cellId?: SF.CellId,
	overrides?: Partial<SF.CellMark<SF.MoveIn, never>>,
): SF.CellMark<SF.MoveIn, never> {
	const atomId: ChangeAtomId = typeof markId === "object" ? markId : { localId: markId };
	const mark: SF.CellMark<SF.MoveIn, never> = {
		type: "MoveIn",
		id: atomId.localId,
		count,
	};
	if (cellId !== undefined) {
		mark.cellId = cellId;
	}
	if (atomId.revision !== undefined) {
		mark.revision = atomId.revision;
	}
	return { ...mark, ...overrides };
}

/**
 * @param changes - The changes to apply to the node.
 * @param cellId - Describes the cell that the target node used to reside in. Used when the target node is removed.
 */
function createModifyMark<TChange>(
	changes: TChange,
	cellId?: SF.CellId,
): SF.CellMark<SF.NoopMark, TChange> {
	const mark: SF.CellMark<SF.NoopMark, TChange> = {
		count: 1,
		changes,
	};
	if (cellId !== undefined) {
		mark.cellId = cellId;
	}
	return mark;
}

function createTransientMark<TChange>(
	attach: SF.CellMark<SF.Attach, TChange>,
	detach: SF.CellMark<SF.Detach, TChange>,
	overrides?: Partial<SF.CellMark<SF.TransientEffect, TChange>>,
): SF.CellMark<SF.TransientEffect, TChange> {
	const transient: SF.CellMark<SF.TransientEffect, TChange> = {
		type: "Transient",
		count: attach.count,
		attach: SF.extractMarkEffect(attach),
		detach: SF.extractMarkEffect(detach),
		...overrides,
	};

	if (attach.cellId !== undefined) {
		transient.cellId = attach.cellId;
	}
	return transient;
}

function overrideCellId<TMark extends SF.HasMarkFields<unknown>>(
	cellId: SF.CellId,
	mark: TMark,
): TMark {
	mark.cellId = cellId;
	return mark;
}

export const MarkMaker = {
	onEmptyCell: overrideCellId,
	insert: createInsertMark,
	revive: createReviveMark,
	delete: createDeleteMark,
	modify: createModifyMark,
	moveOut: createMoveOutMark,
	moveIn: createMoveInMark,
	returnFrom: createReturnFromMark,
	returnTo: createReturnToMark,
	transient: createTransientMark,
};

export const ChangeMaker = {
	insert: createInsertChangeset,
	delete: createDeleteChangeset,
	redundantRemove: createRedundantRemoveChangeset,
	revive: createReviveChangeset,
	redundantRevive: createRedundantReviveChangeset,
	move: createMoveChangeset,
	return: createReturnChangeset,
	modify: createModifyChangeset,
	modifyDetached: createModifyDetachedChangeset,
};
