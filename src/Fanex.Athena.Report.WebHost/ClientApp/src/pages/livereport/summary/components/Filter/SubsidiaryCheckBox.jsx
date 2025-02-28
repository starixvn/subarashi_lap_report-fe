import React from 'react';
import PropTypes from 'prop-types';

import CheckBox from '@/components/CheckBox';
import LangHelper from '@/helpers/langHelper';

function SubsidiaryCheckBox(props) {
    const { value, onChange } = props;

    return (
        <div className="form-group">
            <CheckBox id="SubsidiarySearch" checked={value} onChange={onChange} label={LangHelper.getSingleResource('SubsidiarySearch')} />
        </div>
    );
}

const propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.bool,
};

SubsidiaryCheckBox.propTypes = propTypes;

export default React.memo(SubsidiaryCheckBox);
