import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import MultipleSelect from '@legion-lib/react-multiselect';

import LangHelper from '@srcRoot/helpers/langHelper';

export const ProductFilter = (props) => {
    const { value, onChange, isValid, disabled } = props;
    const productList = useSelector((state) => state.productList);

    const _renderProductSelectList = () => {
        return (
            productList &&
            productList.length && (
                <MultipleSelect
                    id="ProductList"
                    language={LangHelper.currentLanguage}
                    value={value}
                    hasSearchBox={true}
                    dataSource={productList}
                    valueField={'value'}
                    keyField={'id'}
                    statusField={'status'}
                    onChange={onChange}
                    isValid={isValid}
                    disabled={disabled}
                />
            )
        );
    };

    return (
        <div className="form-group">
            <label className="label-text">{LangHelper.getSingleResource('Product')}</label>
            {_renderProductSelectList()}
        </div>
    );
};

const propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    isValid: PropTypes.bool,
    disabled: PropTypes.bool,
};

const defaultProps = {
    isValid: true,
    disabled: false,
};

ProductFilter.propTypes = propTypes;
ProductFilter.defaultProps = defaultProps;

export default memo(ProductFilter);
