export const IS = {
	array: (data: any): data is any[] => Array.isArray(data),
	date: (data: any): data is Date => data instanceof Date,
	blob: (data: any): data is Blob => data instanceof Blob,
	string: (data: any): data is string => typeof data === 'string',
	number: (data: any): data is number => typeof data === 'number',
	boolean: (data: any): data is boolean => typeof data === 'boolean',
	object_only: (data: any): data is OBJECT => typeof data === 'object',
	function: (data: any): data is () => {} => typeof data === 'function',
	object: (data: any): data is OBJECT => typeof data === 'object' && !Array.isArray(data),
};

export default IS;
