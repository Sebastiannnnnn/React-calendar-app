import { combineReducers } from 'redux';
import { calendarObject} from './reducers/Calendar.js';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
	calendarObject,
	form: formReducer
});