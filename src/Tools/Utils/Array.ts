export const removeDuplicatesByKey = (array: any[] = [], key = '', shouldHave?: string): any[] => {
	return Array.from(new Set(array.map(a => a[key]))).map(v => {
		if (!shouldHave) return array.find(a => a[key] === v);
		const allWithKey = array.filter(a => a[key] === v);
		const allShouldHave = allWithKey.filter(a => !!a[shouldHave]);

		return allShouldHave.length > 0 ? allShouldHave[0] : allWithKey[0];
	});
};

export const existIn = (array = [], key = '', value: any) => {
	return !!array?.find?.((a: any) => a?.[key] === value);
};

export const arrayDif = (oldArr: any[] = [], newArr: any[] = [], key: string) => {
	const added: any[] = [];
	const common: any[] = [];
	const deleted: any[] = [];

	removeDuplicatesByKey([...oldArr, ...newArr], key).forEach((obj: any) => {
		const inOld = !!oldArr?.find?.((o: any) => o?.[key] === obj?.[key]);
		const inNew = !!newArr?.find?.((n: any) => n?.[key] === obj?.[key]);
		if (inOld && inNew) return common.push(obj);
		if (inOld && !inNew) return deleted.push(obj);
		if (!inOld && inNew) return added.push(obj);
	});

	return { added, common, deleted };
};

export const strArrayDif = (oldArr: string[] = [], newArr: string[] = []) => {
	const oldStr = oldArr?.map(o => ({ key: o }));
	const newStr = newArr?.map(n => ({ key: n }));
	const { added, common, deleted } = arrayDif(oldStr, newStr, 'key');
	return {
		added: added?.map(a => a?.key),
		common: common?.map(c => c?.key),
		deleted: deleted?.map(d => d?.key),
	};
};

export const arrayInterSec = <T>(a: T[], ...arr: T[][]): T[] =>
	Array.from(new Set(a)).filter(v => arr.every(b => b.includes(v)));

export const insertToArray = (array: any[], index: number, item: any) => {
	array.splice(index, 0, item);
	return array;
};

export const arrayEqual = <T>(a: T[], b: T[]): boolean =>
	JSON.stringify(a.sort()) === JSON.stringify(b.sort());

export const sortListDataHelper = (data: any[]) =>
	data.map((d, i) => {
		delete d?.chosen;
		delete d?.selected;
		return { ...d, sort: i };
	});
