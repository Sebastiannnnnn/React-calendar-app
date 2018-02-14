import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { submit } from 'redux-form';

import { setCalendar } from '../actions/Calendar';
import EnterValue from '../components/EnterValue';
import * as Constants from '../Constants';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    prev() {
        let date = this.props.match.params,
            month,
            year;

        if (parseInt(date.month, 10) === 1) {
            month = 12;
            year = parseInt(date.year, 10) - 1;
        } else {
            month = parseInt(date.month, 10) - 1;
            year = parseInt(date.year, 10);
        }

        return {month, year};
    }

    next() {
        let date = this.props.match.params,
            month,
            year;

        if (parseInt(date.month, 10) === 12) {
            month = 1;
            year = parseInt(date.year, 10) + 1;
        } else {
            month = parseInt(date.month, 10) + 1;
            year = parseInt(date.year, 10);
        }

        return {month, year};
    }

    setCalendar(date) {
        return '/calendar/' + date.month + '/' + date.year;
    }

    printCalendarTime() {
        let calendarObj = this.props.match.params,
            date = new Date(calendarObj.year, calendarObj.month - 1, 1),
            text = date.toLocaleString(Constants.LOCALE, {month: 'long', year: 'numeric'});

        return text;
    }

    createCalendar() {
        let calendarObj = this.props.match.params;
        let date = new Date(parseInt(calendarObj.year, 10), parseInt(calendarObj.month, 10), 0);
        let days = [];
        for (var i = date.getDate(); i > 0; i--) {
            date.setDate(i)
            days.unshift({date: this.createNewDateObject(date), className: 'day'});
        }

        let prev = this.prev();
        let next = this.next();

        let firstDay = new Date(prev.year, prev.month, 1);
        if (firstDay.getDay() !== 1) {
            let prevDays = new Date(prev.year, prev.month, 0);
            while (prevDays.getDay() !== 0) {
                days.unshift({date: this.createNewDateObject(prevDays), className: 'day prev', edge: 'prev'})
                prevDays.setDate(prevDays.getDate() - 1);
            }
        }

        let lastDay = new Date(next.year, next.month - 1, 1);
        if (lastDay !== 0) {
            let nextDays = new Date(next.year, next.month - 1, 1);
            while (nextDays.getDay() !== 1) {
                days.push({date: this.createNewDateObject(nextDays), className: 'day next', edge: 'next'})
                nextDays.setDate(nextDays.getDate() + 1);
            }
        }

        return days;
    }

    createNewDateObject(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    printWeekDays(days) {
        let array = [];
        for (var i = 0; i < 7; i++) {
            array.push(<li className={'weekday'} key={i}>{ days[i].date.toLocaleDateString(Constants.LOCALE, { weekday: 'short' }) }</li>)
        }

        return array;
    }

    printDay(item, i) {
        let dayData = this.getEntryData(item);
        if (item.edge) {
            let date = {month: item.date.getMonth() + 1, year: item.date.getFullYear()}
            return <li className={item.className} key={i}>
                <Link to={this.setCalendar(date)}>
                    <span>{item.date.getDate()}</span>
                    <div className={'entry'}>
                        {this.printEntryData(dayData)}
                    </div>
                </Link>
            </li>
        } else {
            return <li className={item.className} key={i} onClick={this.updateCalendar.bind(this, item.date)}>
                <span>{item.date.getDate()}</span>
                <div className={'entry'}>
                    {this.printEntryData(dayData)}
                </div>
            </li>
        }
    }

    printEntryData(item) {
        let array = [];
        if (item) {
            Object.entries(item).forEach(([key, value]) => {
                array.push(<div key={key}>{`${key} ${value}`}</div>);
            });
        }
        return array;
    }

    getEntryData(item) {
        var calendar = this.props.calendarObject,
            year = item.date.getFullYear(),
            month = item.date.getMonth() + 1,
            day = item.date.getDate();

        if (year in calendar && month in calendar[year] && day in calendar[year][month]) {
            return calendar[year][month][day];
        }
        return null;
    }

    printDetails(entry) {
        if (entry) {
            entry.map((item) => {
                return <div>item.name</div>
            })
        }
    }

    updateCalendar(date) {
        this.setState({
            date: date
        })
        this.props.submitForm('hourForm')
    }

    submit(value) {
        this.props.setCalendarObject(
            Object.assign({}, this.props.calendarObject),
            this.state.date,
            {[value.description]: [value.hours]}
        );
    }

    render() {
        let days = this.createCalendar();

        return (
            <div className="month"> 
                <div>
                    <Link className="prev-arrow" style={{textDecoration: 'none'}} to={this.setCalendar(this.prev())}>&#10094;</Link>
                    <Link className="next-arrow" style={{textDecoration: 'none'}} to={this.setCalendar(this.next())}>&#10095;</Link>
                    <h1>{this.printCalendarTime()}</h1>
                </div>

                <ul className="weekdays">
                    { this.printWeekDays(days) }
                </ul>

                <ul className="days">
                    { days.map((item, i) => {
                        return this.printDay(item, i);
                    }) }
                </ul>

                <EnterValue onSubmit={this.submit.bind(this)}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        calendarObject: state.calendarObject,
        formObject: state.form
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCalendarObject: (calendar, date, value) => dispatch(setCalendar(calendar, date, value)),
        submitForm: (val) => dispatch(submit (val)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)