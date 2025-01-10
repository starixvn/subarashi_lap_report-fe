import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { DateRange } from '@legion-lib/react-daterangepicker';

import LangHelper from '@srcRoot/helpers/langHelper';
import { DateConstraint } from '../../common/dateSetting';
import { DefaultState, ViewInTimeMode } from '../../common/constants';

export const DateRangeFilter = (props) => {
    const {onChange, isMobile, viewInTime} = props;

    const { limitedMonthRange, minDate } = viewInTime == ViewInTimeMode.Settlement
    ? { limitedMonthRange: DateConstraint.settlementTimeLimitedMonthRange, minDate: DateConstraint.settlementTimeMinDate }
    : { limitedMonthRange: DateConstraint.limitedMonthRange, minDate: DateConstraint.minDate };

    const _renderDateRange = () => {
        return (
            <DateRange
                startDate={DefaultState.dateRange.fromDate}
                endDate={DefaultState.dateRange.toDate}
                minDate={minDate}
                maxDate={DateConstraint.maxDate}
                today={DateConstraint.maxDate}
                limitedMonthRange={limitedMonthRange}
                firstDayOfWeek={DateConstraint.firstDayOfWeek}
                onChange={(date, isValid) => onChange(date, isValid, limitedMonthRange)} 
                isMobile={isMobile}
                langHandler={(key) => LangHelper.getSingleResource(key)}
            />
        );
    };

    return (
        <div className="form-group">
            <label className="label-text">{LangHelper.getSingleResource('Date')}</label>
            {_renderDateRange()}
        </div>
    );
};

const propTypes = {
    isMobile: PropTypes.bool,
    onChange: PropTypes.func,
};
const defaultProps = {
    isMobile: false,
};

DateRangeFilter.propTypes = propTypes;
DateRangeFilter.defaultProps = defaultProps;

export default memo(DateRangeFilter);
