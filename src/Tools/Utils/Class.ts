import { isUpperCase } from './String';

export const isClassID = (id: string) => /^[A-Z_]+-\w{5}-\w{4}-\w{4}/.test(id);

export const isClassIDProp = (id: string) => /^[A-Z_]+_ID$/.test(id);

export const isClassItemOBJ = (obj: OBJECT) => Object.keys(obj || {})?.find(key => isClassIDProp(key));

export const classNameOfID = (ID: string) => {
	let className = /^([A-Z_]+)*/.exec(ID)?.[1];
	return className?.replace?.('_ID', '') || undefined;
};

export const isClassIDCol = (col: string) => {
	if (!isUpperCase(col?.[0])) return false;
	if (col?.endsWith('_ID')) return false;
	return classNameOfID(col) ?? false;
};
