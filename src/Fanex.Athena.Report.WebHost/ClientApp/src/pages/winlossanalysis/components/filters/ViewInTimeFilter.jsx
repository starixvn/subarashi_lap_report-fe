import React, { memo } from 'react';
import PropTypes from 'prop-types';
import LangHelper from '@/helpers/langHelper';
import { ViewInTimeMode } from '../../common/constants';

export const ViewInTimeFilter = props => {
    const { onChange, value } = props;

    return (
        <div className="form-group">
            <div className="form-group radio-group">
                <label className="label-text">{LangHelper.getSingleResource('Viewin2')}:</label>
                <div className="radio-list">
                    <span className="filter-radio-item">
                        <input
                            type="radio"
                            value={ViewInTimeMode.Financial}
                            checked={value === ViewInTimeMode.Financial}
                            id={`ViewIn-${ViewInTimeMode.Financial}`}
                            onChange={onChange}
                        />
                        <label htmlFor={`ViewIn-${ViewInTimeMode.Financial}`}>{LangHelper.getSingleResource('FinancialDate')}</label>
                    </span>
                    <span className="filter-radio-item">
                        <input
                            type="radio"
                            value={ViewInTimeMode.Settlement}
                            checked={value === ViewInTimeMode.Settlement}
                            id={`ViewIn-${ViewInTimeMode.Settlement}`}
                            onChange={onChange}
                        />
                        <label htmlFor={`ViewIn-${ViewInTimeMode.Settlement}`}>{LangHelper.getSingleResource('SettlementTime')}</label>
                    </span>
                </div>
            </div>
        </div>
    );
};

const propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ViewInTimeFilter.propTypes = propTypes;

export default memo(ViewInTimeFilter);
