import * as Constants from '../Constants';

export function calendarObject(calendarObject) {
	return {
		type: Constants.CALENDAR,
		calendarObject
	}
}

export function setCalendar(calendar, date, value) {
	let year = date.getFullYear();
	if (!(year in calendar)) {
		calendar[year] = {};
	}

	let month = date.getMonth();
	if (!((month + 1) in calendar[year])) {
		calendar[year][month + 1] = {};
	}

	let day = date.getDate();
	if (!(day in calendar[year][month + 1])) {
		calendar[year][month + 1][day] = {};
	}

	let oldDay = calendar[year][month + 1][day];
	let newDay = Object.assign({}, oldDay, value)
	calendar[year][month + 1][day] = newDay;

	return (dispatch) => {
		dispatch(calendarObject(calendar))
	}
}
