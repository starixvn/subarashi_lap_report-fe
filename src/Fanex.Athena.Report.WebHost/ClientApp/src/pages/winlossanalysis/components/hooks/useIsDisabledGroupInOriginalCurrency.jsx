import { shallowEqual, useSelector } from 'react-redux';
import { DisplayGroupBreakDownMapping } from '../../common/constants';

export const useIsDisabledGroupInOriginalCurrency = () => {
    const [selectedGroupByOption, selectedBreakDownByOption] = useSelector(
        state => [state.selectedGroupByOption, state.selectedBreakDownByOption],
        shallowEqual
    );

    const currentMapping = DisplayGroupBreakDownMapping.find(
        item => item.groupByMode === selectedGroupByOption && item.breakdownMode === selectedBreakDownByOption
    );

    return !currentMapping.isDisplayBreakDownInCurrency;
};

export default useIsDisabledGroupInOriginalCurrency;
