import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import MultipleSelect from '@legion-lib/react-multiselect';
import LangHelper from '@/helpers/langHelper';

export const RiskLevelFilter = props => {
    const formData = useSelector(state => state.formData);

    const { onChange, isValid } = props;

    const _renderCustomerClassSelectList = () => {
        const riskLevelList = formData.riskLevelList;
        return (
            riskLevelList?.length && (
                <MultipleSelect
                    id="ddlRiskLevel"
                    language={LangHelper.currentLanguage}
                    dataSource={riskLevelList}
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
            <label className="label-text">{LangHelper.getSingleResource('RiskLevel')}</label>
            {_renderCustomerClassSelectList()}
        </div>
    );
};

const propTypes = {
    onChange: PropTypes.func,
    isValid: PropTypes.bool,
};

const defaultProps = {
    isValid: true,
};

RiskLevelFilter.propTypes = propTypes;
RiskLevelFilter.defaultProps = defaultProps;

export default memo(RiskLevelFilter);
