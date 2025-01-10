import React, { memo } from 'react';
import PropTypes from 'prop-types';

import LangHelper from '@srcRoot/helpers/langHelper';
import ReportSelect from '@srcRoot/components/ReportSelect';
import { DEFAULT_BASE_CURRENCY_VALUE } from '@srcRoot/constants/config';

export const BaseCurrencyFilter = (props) => {
    const { onChange, value, options } = props;
    const _renderBaseCurrencySelectList = () => {
        const baseCurrencyList = options;
        return (
            baseCurrencyList?.length && (
                <ReportSelect instanceId="ddlBased" value={value.value !== DEFAULT_BASE_CURRENCY_VALUE ? value : null} options={options} onChange={onChange} />
            )
        );
    };

    return (
        <div className="form-group">
            <label className="label-text">{LangHelper.getSingleResource('BaseCurrency')}</label>
            {_renderBaseCurrencySelectList()}
        </div>
    );
};

const propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    options: PropTypes.array,
};

BaseCurrencyFilter.propTypes = propTypes;

export default memo(BaseCurrencyFilter);
