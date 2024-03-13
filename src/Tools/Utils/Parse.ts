import Parse from 'parse';
import { CONFIG } from '@config/constants';

//? Initialize Parse
const { appId, liveQueryServerURL, serverURL } = CONFIG.Parse || {};
if (!!appId) {
	Parse.serverURL = serverURL;
	Parse.liveQueryServerURL = liveQueryServerURL;
	Parse.initialize(CONFIG?.Parse?.appId);
}

export const subscribe = async (table: SUG<CLASS_NAMES>) => {
	let subscription: Parse.LiveQuerySubscription | undefined;
	try {
		const query = new Parse.Query(table);
		subscription = await query.subscribe();
		console.log(`🟢 ${table} subscribed`);
	} catch (e) {
		console.warn(`${table} subscription failed`);
	}
	return subscription;
};
