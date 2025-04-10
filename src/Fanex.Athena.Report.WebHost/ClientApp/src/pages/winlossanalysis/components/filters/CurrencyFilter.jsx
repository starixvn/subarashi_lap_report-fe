import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import MultipleSelect from '@legion-lib/react-multiselect';
import PropTypes from 'prop-types';

import LangHelper from '@/helpers/langHelper';

export const CurrencyFilter = (props) => {
    const formData = useSelector((state) => state.formData);

    const { onChange, isValid } = props;

    const _renderCurrencySelectList = () => {
        const currencyList = formData.currencyList;

        return (
            currencyList &&
            currencyList.length && (
                <MultipleSelect
                    id="ddlCurrency"
                    language={LangHelper.currentLanguage}
                    dataSource={currencyList}
                    keyField={'id'}
                    valueField={'value'}
                    statusField={'status'}
                    onChange={onChange}
                    isValid={isValid}
                />
            )
        );
    };

    return (
        <div className="form-group">
            <label className="label-text">{LangHelper.getSingleResource('Currency')}</label>
            {_renderCurrencySelectList()}
        </div>
    );
};

const propTypes = {
    onChange: PropTypes.func,
    isValid: PropTypes.bool,
};

CurrencyFilter.propTypes = propTypes;

export default memo(CurrencyFilter);
