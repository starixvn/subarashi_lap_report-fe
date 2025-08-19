import React, { memo } from 'react';
import PropTypes from 'prop-types';

import ReportSelect from '@/components/ReportSelect';
import LangHelper from '@/helpers/langHelper';

import { CashOutModeList } from '../../common/constants';

export const CashOutModeFilter = props => {
    const { onChange, value, viewInTime, disabled } = props;

    return (
        <div className="form-group">
            <label className="label-text">{LangHelper.getSingleResource('CashOut')}</label>
            <ReportSelect
                instanceId="CashOutMode"
                value={value}
                options={CashOutModeList}
                isDisabled={disabled}
                onChange={e => {
                    onChange(e, viewInTime);
                }}
            />
        </div>
    );
};

const propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.object,
    disabled: PropTypes.bool,
};

CashOutModeFilter.propTypes = propTypes;

export default memo(CashOutModeFilter);
