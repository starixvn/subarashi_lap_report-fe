import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Month from './Month';
import Day from './Day';

const MonthPicker = (props) => {
    const format = 'MM/DD/YYYY';

    const minDate = moment(props.minDate, format);
    const maxDate = moment(props.maxDate, format);

    const min = { year: minDate.year(), month: minDate.month(), date: minDate.date() };
    const max = { year: maxDate.year(), month: maxDate.month(), date: maxDate.date() };

    const fromDate = moment(props.fromDate, format);
    const toDate = moment(props.toDate, format);

    const [month, setMonth] = useState({ year: fromDate.year(), month: fromDate.month() });
    const [from, setFrom] = useState(props.showDate ? fromDate.date() : 1);
    const [to, setTo] = useState(
        props.showDate
            ? toDate.date()
            : toDate.year() === max.year && toDate.month() === max.month
              ? max.date
              : moment({ year: toDate.year(), month: toDate.month() }).daysInMonth()
    );

    useEffect(() => {
        if (!props.showDate) {
            props.onChange({
                fromDate: formatDate(from, fromDate.month(), fromDate.year()),
                toDate: formatDate(to, toDate.month(), toDate.year()),
            });
        }
    }, [from, to, fromDate, toDate, props]);

    const formatDate = (date, month, year) => {
        return `${month < 9 ? '0' + (month + 1) : month + 1}/${date < 10 ? '0' + date : date}/${year}`;
    };

    const onMonthChange = useCallback(
        (value) => {
            const minDate = value.year === min.year && value.month === min.month ? min.date : 1;
            const maxDate = value.year === max.year && value.month === max.month ? max.date : moment({ year: value.year, month: value.month }).daysInMonth();

            setMonth(value);
            setFrom(minDate);
            setTo(maxDate);

            props.onChange({
                fromDate: formatDate(minDate, value.month, value.year),
                toDate: formatDate(maxDate, value.month, value.year),
            });
        },
        [min, max, props]
    );

    const onFromDateChange = (value) => {
        setFrom(value);
        props.onChange({
            fromDate: formatDate(value, month.month, month.year),
            toDate: formatDate(to, month.month, month.year),
        });
    };

    const onToDateChange = (value) => {
        setTo(value);
        props.onChange({
            fromDate: formatDate(from, month.month, month.year),
            toDate: formatDate(value, month.month, month.year),
        });
    };

    const daysInMonth = moment({ year: month.year, month: month.month }).daysInMonth();

    const startDate = month.year === min.year && month.month === min.month ? min.date : 1;
    const endDate = month.year === max.year && month.month === max.month ? max.date : daysInMonth;

    return (
        <div className={`month-picker ${props.showDate ? '' : 'month-only'}`}>
            <Month min={min} max={max} value={month} {...props.monthOption} onChange={onMonthChange} />

            {props.showDate && <Day min={startDate} max={endDate > to ? to : endDate} value={from} {...props.fromDateOption} onChange={onFromDateChange} />}
            {props.showDate && <Day min={startDate < from ? from : startDate} max={endDate} value={to} {...props.toDateOption} onChange={onToDateChange} />}
        </div>
    );
};

MonthPicker.propTypes = {
    monthOption: PropTypes.object.isRequired,
    onChange: PropTypes.func,

    minDate: PropTypes.string.isRequired,
    maxDate: PropTypes.string.isRequired,
    fromDate: PropTypes.string.isRequired,
    toDate: PropTypes.string.isRequired,

    showDate: PropTypes.bool,
};

MonthPicker.defaultProps = {
    label: 'View data in month',
    onChange: () => {},
    fromDateOption: {
        label: 'From',
    },
    toDateOption: {
        label: 'To',
    },
    showDate: true,
};

export default MonthPicker;
