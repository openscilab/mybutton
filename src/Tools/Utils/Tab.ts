import ID from './ID';
import { sortByUtcDate } from './Date';
import { isEmptyObject } from './Object';

const TAB_CREATION_DATE = new Date().toUTCString();
const TAB_ID = new ID().pattern('TAB-XXXXX-XXXXX').withOut('specials').generate();

export const TabChannel = (CHANNEL_NAME: string) => {
	//? Create new BroadcastChannel
	const channel = new BroadcastChannel(CHANNEL_NAME);

	const REGISTERED_TABS: any = {};

	//? -------------- 👇 Utils -------------------------------------

	const register = () => {
		emit({ type: 'REGISTER_TAB', payload: { TAB_ID, TAB_CREATION_DATE } });
	};

	const unregister = () => {
		emit({ type: 'UNREGISTER_TAB', payload: { TAB_ID } });
	};

	const emit = (message: TAB_MESSAGE_TYPE) => {
		channel.postMessage(message);
	};

	const notifyOtherSingleRun = () => {
		delete REGISTERED_TABS?.[TAB_ID];
		let tabs = Object.entries(REGISTERED_TABS || {});
		tabs.sort((a: any, b: any) => sortByUtcDate(b?.TAB_CREATION_DATE, a?.TAB_CREATION_DATE));
		emit({ type: 'SINGLE_RUN', payload: { TAB_ID: (tabs?.[0] as any)?.[0], tabs } });
	};

	const SINGLE: SINGLE_JOB_TYPE = {
		is_ran: false,
		run: () => {
			if (SINGLE.is_ran) return;
			SINGLE.is_ran = true;
			SINGLE?.job?.();
		},
	};

	const on = {
		//? OnMessage call back
		message: (callback: (e: MessageEvent<TAB_MESSAGE_TYPE>) => void) => {
			channel.addEventListener('message', callback);
		},

		//? OnRegister call back
		unregister: (callback: () => void) => {
			window.addEventListener('beforeunload', () => {
				callback?.();
				notifyOtherSingleRun();
			});
		},

		//? Single Run
		singleRun: (fn: Function) => {
			SINGLE.job = fn;
		},
	};

	//? ------------👇 Communication ---------------------------------

	//? Init
	register();
	setTimeout(register, 1000);
	on.unregister(unregister);

	//? If there is no other tab, then run the single job
	setTimeout(() => isEmptyObject(REGISTERED_TABS) && SINGLE.run(), 500);

	//? On message handler
	on.message(e => {
		const { type, payload } = e.data || {};
		if (!payload?.TAB_ID) return;

		//? Single Run
		if (type === 'SINGLE_RUN' && payload?.TAB_ID === TAB_ID) {
			SINGLE.run();
		}

		//? Registration
		if (type === 'REGISTER_TAB') {
			REGISTERED_TABS[payload?.TAB_ID] = payload;
			emit({ type: 'REGISTER_TAB_ACK', payload: { TAB_ID, TAB_CREATION_DATE } });
		}

		//? Registration Ack
		if (type === 'REGISTER_TAB_ACK') {
			REGISTERED_TABS[payload?.TAB_ID] = payload;
		}

		//? UnRegistration
		if (type === 'UNREGISTER_TAB' && payload?.TAB_ID) {
			delete REGISTERED_TABS[payload?.TAB_ID];
		}
	});

	return { emit, on, register, unregister, REGISTERED_TABS };
};

export type TAB_MESSAGE_TYPE = { type: string; payload?: Record<string, any> };

export type TAB_MESSAGE_PAYLOAD = { TAB_ID: string; TAB_CREATION_DATE?: Date };

export type SINGLE_JOB_TYPE = { job?: Function; is_ran: boolean; run: () => void };
