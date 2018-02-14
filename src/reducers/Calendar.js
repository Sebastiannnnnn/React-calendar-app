import * as Constants from '../Constants.js';

export function calendarObject(state = {}, action) {
	switch (action.type) {
		case Constants.CALENDAR:
			return action.calendarObject
		default:
			return state
	}
}
