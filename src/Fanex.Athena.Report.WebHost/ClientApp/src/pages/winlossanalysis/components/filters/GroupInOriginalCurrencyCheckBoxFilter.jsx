import React, { memo } from 'react';
import PropTypes from 'prop-types';

import LangHelper from '@/helpers/langHelper';
import CheckBox from '@/components/CheckBox';

export const GroupInOriginalCurrencyCheckBoxFilter = (props) => {
    return (
        <div className="form-group">
            <CheckBox id="IsGroupInOriginalCurrency" {...props} label={LangHelper.getSingleResource('IsGroupInOriginalCurrency')} />
        </div>
    );
};

const propTypes = {
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
};

GroupInOriginalCurrencyCheckBoxFilter.propTypes = propTypes;

export default memo(GroupInOriginalCurrencyCheckBoxFilter);
