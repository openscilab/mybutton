import { useState } from 'react';

const useLoading = <K extends string = string>() => {
	const [state, setState] = useState<Partial<Record<K, boolean>>>({});
	return {
		is: (key: K) => state?.[key],
		on: (key: K) => setState(s => ({ ...s, [key]: true })),
		off: (key: K) => setState(s => ({ ...s, [key]: false })),
		set: (key: K, value: boolean) => setState(s => ({ ...s, [key]: value })),
	};
};

export default useLoading;
