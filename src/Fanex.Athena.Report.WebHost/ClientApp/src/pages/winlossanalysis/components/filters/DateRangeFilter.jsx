import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { DateRange } from '@legion-lib/react-daterangepicker';

import LangHelper from '@srcRoot/helpers/langHelper';
import { DateConstraint } from '../../common/dateSetting';
import { DefaultState } from '../../common/constants';

export const DateRangeFilter = (props) => {
    const { onChange, isMobile } = props;
    const _renderDateRange = () => {
        return (
            <DateRange
                startDate={DefaultState.dateRange.fromDate}
                endDate={DefaultState.dateRange.toDate}
                minDate={DateConstraint.minDate}
                maxDate={DateConstraint.maxDate}
                today={DateConstraint.maxDate}
                limitedMonthRange={DateConstraint.limitedMonthRange}
                firstDayOfWeek={DateConstraint.firstDayOfWeek}
                onChange={onChange}
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
