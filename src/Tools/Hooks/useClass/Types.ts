import { Obj } from '../../Utils/Object';

export type UC_Options = { primaryKey?: string };

export type UC_getItems_Params<T extends Obj> = Obj & {
	page?: number;
	limit?: number;
	parse_query?: Parse.Query;
	contains?: Record<string, any>;
	props?: (keyof T | (string & {}))[];
	params?: Omit<UC_getItems_Params<T>, 'params'>;
};
export type UC_putItem_Options = { ID?: string; action?: 'add' | 'edit' };

export type UC_Loadings_type = {
	get?: boolean;
	post?: boolean;
	getItem?: boolean;
	putItem?: boolean;
	addItem?: boolean;
	getItems?: boolean;
	editItem?: boolean;
	getSchema?: boolean;
	deleteItem?: boolean;
};
