/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * Mock model for external task data
 */
export interface TaskData {
	[key: string]: {
		name: string;
		priority: number;
	};
}

/**
 * Mock model for external taskList data
 */
export interface TaskListData {
	[key: string]: TaskData;
}

/**
 * Asserts that the input data is a valid {@link TaskData}.
 */
export function assertValidTaskData(input: unknown): TaskData {
	if (input === null || input === undefined) {
		throw new Error("Task data was not defined.");
	}

	const jsonInput = input as Record<string | number | symbol, unknown>;
	for (const [outerKey, outerValue] of Object.entries(jsonInput)) {
		if (typeof outerKey !== "string") {
			throw new TypeError(`Input task data contained malformed key: "${outerKey}".`);
		}
		const jsonOuterValue = outerValue as Record<string | number | symbol, unknown>;
		for (const [key, jsonValue] of Object.entries(jsonOuterValue)) {
			if (typeof key !== "string") {
				throw new TypeError(`Input task data contained malformed key: "${key}".`);
			}
			if (typeof jsonValue !== "object" && jsonValue !== null) {
				throw new TypeError(`Input task data contained malformed value: "${jsonValue}".`);
			}
			if (!Object.prototype.hasOwnProperty.call(jsonValue, "name")) {
				throw new Error(
					`Input task entry under ID "${key}" does not contain required "name" property. Received: "${jsonValue}".`,
				);
			}
			// if (typeof jsonValue.name !== "string") {
			// 	throw new TypeError(`Invalid TaskData "name" value received: "${jsonValue.name}".`);
			// }
			if (!Object.prototype.hasOwnProperty.call(jsonValue, "priority")) {
				throw new Error(
					`Input task entry under ID "${key}" does not contain required "priority" property. Received: "${jsonValue}".`,
				);
			}
			// if (typeof jsonValue.priority !== "number") {
			// 	throw new TypeError(
			// 		`Invalid TaskData "priority" value received: "${jsonValue.priority}".`,
			// 	);
			// }
		}
	}
	return input as TaskData;
}
