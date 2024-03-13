//*---------------------------------- Promise Queue Runner ----------------------------------*//
type PQR_Options = { remain_log?: boolean; collect_result?: boolean; throw_error?: boolean };
export const promiseQueueRunner = async (
	promises: (() => Promise<any>)[],
	n = 2,
	options: PQR_Options = {}
) => {
	const results: any[] = [];
	const { remain_log = false, collect_result = false, throw_error = true } = options;
	try {
		for (let i = 0; i < promises.length; i += n) {
			const ps: any = [];
			if (remain_log) console.log('remain', promises.length - i);
			for (let j = 0; j < n; j++) ps.push(promises?.[i + j]?.());
			for (let k = 0; k < ps.length; k++) {
				const r = await ps?.[k];
				if (collect_result && !!r) results.push(r);
			}
		}
		return results;
		//
	} catch (error) {
		console.log(`❌❌ promiseQueueRunner error : ${error}`);
		if (throw_error) throw error;
		return undefined;
	}
};

export const waitFor = async (ms: number) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};
