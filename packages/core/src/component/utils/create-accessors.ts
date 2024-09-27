import { Schema } from '../types';

export function createSetFunction(schema: Schema) {
	const keys = Object.keys(schema);

	// Generate a hardcoded set function based on the schema keys
	const setFunctionBody = keys
		.map((key) => `if ('${key}' in values) store.${key}[index] = values.${key};`)
		.join('\n    ');

	// Use new Function to create a set function with hardcoded keys
	const set = new Function(
		'index',
		'store',
		'values',
		`
		${setFunctionBody}
	  `
	);

	return set;
}

export function createGetFunction(schema: Schema) {
	const keys = Object.keys(schema);

	// Create an object literal with all keys assigned from the store
	const objectLiteral = `{ ${keys.map((key) => `${key}: store.${key}[index]`).join(', ')} }`;

	// Use new Function to create a get function that returns the pre-populated object
	const get = new Function(
		'index',
		'store',
		`
        return ${objectLiteral};
        `
	);

	return get;
}
