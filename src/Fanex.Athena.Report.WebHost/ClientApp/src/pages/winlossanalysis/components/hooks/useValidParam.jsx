import { shallowEqual, useSelector } from 'react-redux';
import { ViewInTimeMode } from '../../common/constants';
import useSubsidiarySearch from '@/hooks/useSubsidiarySearch';

// eslint-disable-next-line complexity
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
        state => [
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
        shallowEqual
    );

    const { isSubsidiarySearch } = useSubsidiarySearch();

    const hasSelectedProduct = !!selectedProduct;
    const hasSelectedStatus = !!selectedStatus;
    const hasSelectedLiveStatus = !!selectedLiveStatus;
    const hasSelectedCurrency = !!selectedCurrency;
    const hasSelectedBettype = !!selectedBettype;
    const hasSelectedSport = !!selectedSport;
    const hasSelectedPlatform = !!selectedPlatform;
    const hasSelectedCustomerClass = !!selectedCustomerClass;
    const hasSelectedOddsGroup = !!selectedOddsGroup;

    const hasValidTimeSelection = selectedViewInTime === ViewInTimeMode.Financial || !!selectedHour;
    const hasValidSubsidiary = !isSubsidiarySearch || !!selectedSubsidiary;

    const basicRequirementsMet = hasSelectedProduct && hasSelectedStatus && hasSelectedLiveStatus;
    const additionalRequirementsMet = hasSelectedCurrency && hasSelectedBettype && hasSelectedSport;
    const platformRequirementsMet = hasSelectedPlatform && hasSelectedCustomerClass && hasSelectedOddsGroup;

    return basicRequirementsMet && additionalRequirementsMet && platformRequirementsMet && hasValidTimeSelection && hasValidSubsidiary;
};
