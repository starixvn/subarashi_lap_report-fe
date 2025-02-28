import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Overlay from '@/components/Overlay';
import LangHelper from '@/helpers/langHelper';

const Month = ({ id, label, value, min, max, onChange }) => {
    const shortMonths = LangHelper.getResources(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
    const fullMonths = LangHelper.getResources([
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]);

    const [expandYear, setExpandYear] = useState(value.year);
    const [showMonthDrop, setShowMonthDrop] = useState(false);

    const handleChange = useCallback(
        (newValue) => {
            onChange(newValue);
            setShowMonthDrop(false);
        },
        [onChange],
    );

    const formatString = (month, year) => {
        return `${shortMonths[month]} ${year}`;
    };

    const renderOption = (min, max, value) => {
        let options = [];
        for (let i = min.year; i <= max.year; i++) {
            if (i === expandYear) {
                options.push(
                    <li key={i} className="year" style={{ fontWeight: 'bold' }}>
                        <a href="javascript:;">{i}</a>
                    </li>,
                );

                const minMonth = i === min.year ? min.month : 0;
                const maxMonth = i === max.year ? max.month : 11;

                for (let j = minMonth; j <= maxMonth; j++) {
                    const isSelected = i === value.year && j === value.month;
                    const valueItem = { year: i, month: j };

                    options.push(
                        <li key={`${j}${i}`} className="month-option" onClick={() => handleChange(valueItem)}>
                            <a href="javascript:;" className={`${isSelected ? 'selected' : ''}`}>
                                {fullMonths[j]}
                            </a>
                        </li>,
                    );
                }
            } else {
                options.push(
                    <li key={i} className="year" onClick={() => setExpandYear(i)}>
                        <a href="javascript:;">{i}</a>
                    </li>,
                );
            }
        }
        return options;
    };

    const getNextMonth = () => {
        let month = value.month + 1;
        let year = value.year;

        if (month > 11) {
            month = 0;
            year += 1;
        }

        return { year, month };
    };

    const getPrevMonth = () => {
        let month = value.month - 1;
        let year = value.year;

        if (month < 0) {
            month = 11;
            year -= 1;
        }

        return { year, month };
    };

    const checkValidMonth = (month, year) => {
        return (year > min.year && year < max.year) || (year === min.year && month >= min.month) || (year === max.year && month <= max.month);
    };

    const goToMonth = (e, newValue) => {
        e.preventDefault();
        if (newValue.year !== expandYear) {
            setExpandYear(newValue.year);
        }
        onChange(newValue);
    };

    const nextMonth = getNextMonth();
    const prevMonth = getPrevMonth();
    const validNextMonth = checkValidMonth(nextMonth.month, nextMonth.year);
    const validPrevMonth = checkValidMonth(prevMonth.month, prevMonth.year);

    return (
        <div id={id} className="month">
            <label className="label-text">{label}</label>
            <div className="month-content">
                <div className="month-container">
                    <div className="month-picked">
                        <a href="javascript:;" className="prev" onClick={(e) => validPrevMonth && goToMonth(e, prevMonth)}>
                            <span className={`arrow-icon left-arrow ${validPrevMonth ? '' : 'disable'}`}></span>
                        </a>
                        <span className="month-label" onClick={() => setShowMonthDrop(true)}>
                            {formatString(value.month, value.year)}
                        </span>
                        <a href="javascript:;" className="next" onClick={(e) => validNextMonth && goToMonth(e, nextMonth)}>
                            <span className={`arrow-icon right-arrow ${validNextMonth ? '' : 'disable'}`}></span>
                        </a>
                    </div>
                    <Overlay isOpening={showMonthDrop} onClose={() => setShowMonthDrop(false)}>
                        {showMonthDrop && (
                            <div className="month-selection-container">
                                <ul className="month-selection">{renderOption(min, max, value)}</ul>
                            </div>
                        )}
                    </Overlay>
                </div>
            </div>
        </div>
    );
};

Month.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.object.isRequired,
    min: PropTypes.object.isRequired,
    max: PropTypes.object.isRequired,
    onChange: PropTypes.func,
};

Month.defaultProps = {
    label: 'View data in month',
    onChange: () => {},
};

export default Month;
