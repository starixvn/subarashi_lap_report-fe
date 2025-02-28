import { useCallback } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import { ActionCreators } from '../../actions/index.js';
import Service from '../../common/Service';
import { DisplayGroupBreakDownMapping } from '../../common/constants';

export const useGroupFilterHandler = () => {
    const dispatch = useDispatch();
    const selectedGroupByOption = useSelector((state) => state.selectedGroupByOption);
    const formData = useSelector((state) => state.formData);
    const { setSelectedGroupByOption, setSelectedBreakDownByOption, setGroupInOriginalCurrency } = ActionCreators;

    const _setValueForIsDisplayInOriginalCurrencyFilter = (groupByMode, breakdownByMode) => {
        const currentMapping = DisplayGroupBreakDownMapping.find((item) => item.groupByMode == groupByMode && item.breakdownMode == breakdownByMode);
        if (!currentMapping.isDisplayBreakDownInCurrency) {
            dispatch(setGroupInOriginalCurrency(currentMapping.isDisplayBreakDownInCurrency));
        }
    };
    const onChangeGroupByOption = useCallback((event) => {
        const groupMode = event.target.value;
        const breakDownOption = Service.buildBreakDownOptionFromGroupByMode(groupMode, formData.licenseeName);
        const firstEnabledSelectBreakDown = breakDownOption.find((item) => !item.isDisabled);
        batch(() => {
            dispatch(setSelectedGroupByOption(groupMode));
            dispatch(setSelectedBreakDownByOption(firstEnabledSelectBreakDown.value));
        });
        _setValueForIsDisplayInOriginalCurrencyFilter(groupMode, firstEnabledSelectBreakDown.value);
    }, []);

    const onChangeBreakByOption = useCallback(
        (event) => {
            const mode = event.target.value;
            dispatch(setSelectedBreakDownByOption(mode));
            _setValueForIsDisplayInOriginalCurrencyFilter(selectedGroupByOption, mode);
        },
        [selectedGroupByOption],
    );

    return { onChangeGroupByOption, onChangeBreakByOption };
};

export default useGroupFilterHandler;
