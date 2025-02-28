import React, { useMemo, memo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import LangHelper from '@/helpers/langHelper';

import useGroupFilterHandler from '../hooks/useGroupFilterHandler.jsx';
import Service from '../../common/Service.js';

export const BreakDownOptionFilter = () => {
    const [selectedGroupByOption, selectedBreakDownByOption, formData] = useSelector(
        (state) => [state.selectedGroupByOption, state.selectedBreakDownByOption, state.formData],
        shallowEqual
    );
    const { onChangeBreakByOption } = useGroupFilterHandler();
    const breakDownList = useMemo(() => Service.buildBreakDownOptionFromGroupByMode(selectedGroupByOption, formData.licenseeName), [selectedGroupByOption]);

    return (
        <div className="form-group radio-group">
            <label className="label-text">{LangHelper.getSingleResource('BreakdownBy')}:</label>
            <div className="radio-list">
                {breakDownList.map((option, i) => {
                    const key = 'BreakBy' + i;
                    return (
                        <span key={`BreakBy${key}`} className="filter-radio-item">
                            <input
                                disabled={option.isDisabled}
                                type="radio"
                                value={option.value}
                                checked={selectedBreakDownByOption == option.value}
                                id={key}
                                onChange={onChangeBreakByOption}
                            />
                            <label htmlFor={key}>{option.label}</label>
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default memo(BreakDownOptionFilter);
