import { useEffect } from 'react';
import useMountedState from '../useMountedState/useMountedState';

const useModal = <T extends object | any = any>(options: OptionsType = defaultOption) => {
	const [modalData, setModalData] = useMountedState<T>(options?.data);
	const [modalState, setModalState] = useMountedState<boolean>(!!options?.initialState);

	//?------------------- useEffects ---------------------------------------------//

	useEffect(() => {
		if (!!modalData && defaultOption?.onDataOpen) setModalState(true);
	}, [modalData]);

	//?-------------------- Utilities ---------------------------------------------//

	const toggleModalState = () => setModalState(s => !s);

	const registerModal = { open: modalState, onClose: () => setModalState(false) };

	//?----------------------------------------------------------------------------//

	return {
		modalData,
		modalState,
		setModalData,
		setModalState,
		registerModal,
		toggleModalState,

		modal: {
			data: modalData,
			state: modalState,
			set: setModalData,
			register: registerModal,
			toggle: toggleModalState,
			open: () => setModalState(true),
			close: () => setModalState(false),
		},
	};
};

type OptionsType = {
	data?: any;
	initialState?: boolean;
	onDataOpen?: boolean;
};

const defaultOption: OptionsType = {
	onDataOpen: true,
};

export default useModal;
