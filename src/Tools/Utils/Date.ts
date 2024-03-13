import moment, { Moment } from 'moment';

export const getDayPart = () => {
	const now = new Date();
	const hour = now.getHours();
	if (hour <= 12) return 'morning';
	if (12 <= hour && hour <= 18) return 'evening';
	if (18 <= hour) return 'night';
};

export const compareDate = (a: Date, b: Date): boolean => a.getTime() > b.getTime();

export const isAfter = (a: string, b: string) => {
	if (!a || !b) return false;
	const aDate = isValidDate(a);
	const bDate = isValidDate(b);
	if (!aDate || !bDate) return false;
	return compareDate(aDate, bDate);
};

export const wayBackMachine = (d: Date, days: number) =>
	moment.utc(moment.utc(d).toDate().getTime() - days * 24 * 3600 * 1000).toDate();

export const getFutureWed = (d: Date) => {
	const distance = d.getDay() > 3 ? 7 - (d.getDay() - 3) : 3 - d.getDay();
	return wayBackMachine(d, -distance);
};

export const getLastWed = (d: Date) => {
	const distance = d.getDay() >= 3 ? d.getDay() - 3 : 4 + d.getDay();
	return wayBackMachine(d, distance);
};

export const getWeekNumber = (startDay: Date | string) => {
	startDay = moment.utc(startDay).toDate();
	const firstPayrollDay = getLastWed(new Date(new Date().getFullYear(), 0, 1));
	return Math.ceil(
		((new Date(startDay.getFullYear(), startDay.getMonth(), startDay.getDate()).valueOf() -
			firstPayrollDay.valueOf()) /
			86400000 +
			firstPayrollDay.getDay() +
			1) /
			7
	);
};

export const getWeekNumberFromBase = (startDay: Date | Moment | string, firstDay: Date | string | Moment) => {
	startDay = moment.utc(startDay);
	const firstPayrollDay = moment.utc(firstDay);
	return (
		1 +
		Math.ceil(
			((moment.utc([startDay.year(), startDay.month(), startDay.date()]).valueOf() -
				firstPayrollDay.valueOf()) /
				86400000 +
				firstPayrollDay.day() +
				1) /
				7
		)
	);
};

export const getYYMMDD = (date: string, secondDate?: string) =>
	secondDate
		? `${moment.utc(date).format('MM-DD-YYYY')} - ${moment.utc(secondDate).format('MM-DD-YYYY')}`
		: `${moment.utc(date).format('MM-DD-YYYY')}`;

export const diffDays = (date: Date, otherDate: Date): number =>
	Math.ceil(Math.abs(date.valueOf() - otherDate.valueOf()) / (1000 * 60 * 60 * 24));

export const sortByUtcDate = (a: string, b: string) => {
	const aDate = isValidDate(a) || new Date();
	const bDate = isValidDate(b) || new Date();
	return (bDate?.getTime() || 0) - (aDate?.getTime() || 0);
};

export const isValidDate = (str?: string) => {
	if (!str) return undefined;
	const date = new Date(str);
	if (/invalid/i?.test(date.toUTCString())) return undefined;
	return date;
};

export const toMomentISO = (d: Date) => {
	//YYYY-MM-DD
	let temp = d.toLocaleDateString().split('/');
	if (parseInt(temp[0]) < 10) {
		temp[0] = `0${temp[0]}`;
	}
	if (parseInt(temp[1]) < 10) {
		temp[1] = `0${temp[1]}`;
	}
	let finalArr = [temp[2], temp[0], temp[1]];
	return finalArr.join('-');
};
