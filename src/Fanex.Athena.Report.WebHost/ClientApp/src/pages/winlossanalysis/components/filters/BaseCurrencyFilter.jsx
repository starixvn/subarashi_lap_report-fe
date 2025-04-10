import React, { memo } from 'react';
import PropTypes from 'prop-types';

import LangHelper from '@/helpers/langHelper';
import ReportSelect from '@/components/ReportSelect';
import { DEFAULT_BASE_CURRENCY_VALUE } from '@/constants/config';

export const BaseCurrencyFilter = (props) => {
    const { onChange, value, options } = props;
    const _renderBaseCurrencySelectList = () => {
        const baseCurrencyList = options;
        return (
            baseCurrencyList?.length && (
                <ReportSelect
                    id="select-list-BaseCurrency"
                    instanceId="ddlBased"
                    value={value.value !== DEFAULT_BASE_CURRENCY_VALUE ? value : null}
                    options={options}
                    onChange={onChange}
                />
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
