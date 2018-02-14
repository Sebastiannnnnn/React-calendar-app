import React from "react";
import Calendar from '../views/Calendar';
import { Redirect } from "react-router-dom";

export default class MatchCalendar extends React.Component {
	render() {
		if (matchMonth(this.props.match) && matchYear(this.props.match)) {
			return (<Calendar {...this.props}/>)
		} else {
			return setThisMonth();
		}
	}
}

function setThisMonth() {
	let date = new Date(),
		month = date.getMonth(),
		year = date.getFullYear();

	return <Redirect to={'/calendar/' + month + '/' + year} push/>
}


function matchMonth(match) {
	let monthRegex = /^([1-9]{1}||1{1}[012]{1})$/;
	if (monthRegex.test(match.params.month)) {
		return true;
	}
	return false;
}

function matchYear(match) {
	let monthRegex = /^([0-9]{4})$/;
	if (monthRegex.test(match.params.year)) {
		return true;
	}
	return false;
}