import { shallowEqual, useSelector } from 'react-redux';
import { ViewInTimeMode } from '../../common/constants';
import useSubsidiarySearch from '@/hooks/useSubsidiarySearch';

export const useValidParam = () => {
    const [
        selectedProduct,
        selectedStatus,
        selectedPlatform,
        selectedLiveStatus,
        selectedCurrency,
        selectedCustomerClass,
        selectedOddsGroup,
        selectedBettype,
        selectedSport,
        selectedHour,
        selectedViewInTime,
        selectedSubsidiary,
    ] = useSelector(
        (state) => [
            state.selectedProduct,
            state.selectedStatus,
            state.selectedPlatform,
            state.selectedLiveStatus,
            state.selectedCurrency,
            state.selectedCustomerClass,
            state.selectedOddsGroup,
            state.selectedBettype,
            state.selectedSport,
            state.selectedHour,
            state.selectedViewInTime,
            state.selectedSubsidiary,
        ],
        shallowEqual,
    );

    const { isSubsidiarySearch } = useSubsidiarySearch();
    return (
        !!selectedProduct &&
        !!selectedStatus &&
        !!selectedLiveStatus &&
        !!selectedCurrency &&
        !!selectedBettype &&
        !!selectedSport &&
        !!selectedPlatform &&
        !!selectedCustomerClass &&
        !!selectedOddsGroup &&
        (selectedViewInTime == ViewInTimeMode.Financial || !!selectedHour) &&
        (!isSubsidiarySearch || !!selectedSubsidiary)
    );
};
