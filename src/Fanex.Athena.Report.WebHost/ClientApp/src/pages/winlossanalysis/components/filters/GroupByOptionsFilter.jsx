import React, { useMemo, memo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import LangHelper from '@/helpers/langHelper';
import Service from '../../common/Service.js';
import useGroupFilterHandler from '../hooks/useGroupFilterHandler.jsx';

export const GroupByOptionFilter = () => {
    const formData = useSelector((state) => state.formData);
    const [selectedGroupByOption, selectedViewInTime] = useSelector(state => [state.selectedGroupByOption, state.selectedViewInTime], shallowEqual);
    const groupByList = useMemo(() => Service.buildGroupByOption(selectedViewInTime, formData.licenseeName), [formData.licenseeName, selectedViewInTime])
    const { onChangeGroupByOption } = useGroupFilterHandler();

    return (
        <div className="form-group radio-group">
            <label className="label-text">{LangHelper.getSingleResource('GroupBy')}:</label>
            <div className="radio-list">
                {groupByList.map((option, i) => {
                    const key = 'GroupBy' + i;
                    return (
                        <span key={`GroupBy${key}`} className="filter-radio-item">
                            <input
                                type="radio"
                                value={option.value}
                                checked={selectedGroupByOption == option.value}
                                id={key}
                                onChange={onChangeGroupByOption}
                            />
                            <label htmlFor={key}>{option.label}</label>
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default memo(GroupByOptionFilter);
