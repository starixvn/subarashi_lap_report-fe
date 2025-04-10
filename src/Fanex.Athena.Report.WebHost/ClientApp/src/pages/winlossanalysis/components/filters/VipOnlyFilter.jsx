import React, { memo } from 'react';
import PropTypes from 'prop-types';

import LangHelper from '@/helpers/langHelper';
import ReportSelect from '@/components/ReportSelect';
import { VipOnlyList } from '../../common/constants';

export const VipOnlyFilter = (props) => {
    const { onChange, value } = props;

    return (
        <div className="form-group" title={LangHelper.getSingleResource('VIPPlayerTooltipMsg')}>
            <label className="label-text">{LangHelper.getSingleResource('VIPPlayerOnly')}</label>
            <ReportSelect instanceId="IsVipOnly" value={value} options={VipOnlyList} onChange={onChange} />
        </div>
    );
};

const propTypes = {
    value: PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    onChange: PropTypes.func,
};

VipOnlyFilter.propTypes = propTypes;

export default memo(VipOnlyFilter);
