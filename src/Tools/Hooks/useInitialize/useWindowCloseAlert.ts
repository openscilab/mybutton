import { useEffect, useState } from 'react';

const useWindowCloseAlert = (msg: string) => {
	const [active, setActive] = useState(false);

	//? ------------------ Utils -------------------------------------------------------------------------------

	const onClose = (e: any) => {
		if (!!active) {
			e.returnValue = msg;
			return msg;
		}
	};

	//? --------------- useEffect ------------------------------------------------------------------------------

	useEffect(() => {
		if (!window) return;
		(window as any).onbeforeunload = onClose;
	}, [active, window]);

	// ---------------------------------------------------------------------------------------------------------

	return { get: active, set: setActive };
};

export default useWindowCloseAlert;
