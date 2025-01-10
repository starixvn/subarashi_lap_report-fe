import React, { memo } from 'react';
import PropTypes from 'prop-types';

import LangHelper from '@srcRoot/helpers/langHelper';
import CheckBox from '@srcRoot/components/CheckBox';

export const ExcludeTestDataCheckBoxFilter = (props) => {
    return (
        <div className="form-group">
            <CheckBox id="IsExcludeTestData" {...props} label={LangHelper.getSingleResource('ExcludeTestData')} />
        </div>
    );
};

const propTypes = {
    onChange: PropTypes.func,
    checked: PropTypes.bool,
};

ExcludeTestDataCheckBoxFilter.propTypes = propTypes;

export default memo(ExcludeTestDataCheckBoxFilter);
