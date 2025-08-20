import { shallowEqual, useSelector } from 'react-redux';
import { ViewInTimeMode } from '../../common/constants';
import useSubsidiarySearch from '@/hooks/useSubsidiarySearch';

const validateBasicRequirements = (selectedProduct, selectedStatus, selectedLiveStatus) => !!selectedProduct && !!selectedStatus && !!selectedLiveStatus;

const validateAdditionalRequirements = (selectedCurrency, selectedBettype, selectedSport) => !!selectedCurrency && !!selectedBettype && !!selectedSport;

const validatePlatformRequirements = (selectedPlatform, selectedCustomerClass, selectedOddsGroup) =>
    !!selectedPlatform && !!selectedCustomerClass && !!selectedOddsGroup;

const validateTimeSelection = (selectedViewInTime, selectedHour) => selectedViewInTime === ViewInTimeMode.Financial || !!selectedHour;

const validateSubsidiary = (isSubsidiarySearch, selectedSubsidiary) => !isSubsidiarySearch || !!selectedSubsidiary;

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

    const basicRequirementsMet = validateBasicRequirements(selectedProduct, selectedStatus, selectedLiveStatus);
    const additionalRequirementsMet = validateAdditionalRequirements(selectedCurrency, selectedBettype, selectedSport);
    const platformRequirementsMet = validatePlatformRequirements(selectedPlatform, selectedCustomerClass, selectedOddsGroup);
    const hasValidTimeSelection = validateTimeSelection(selectedViewInTime, selectedHour);
    const hasValidSubsidiary = validateSubsidiary(isSubsidiarySearch, selectedSubsidiary);

    const coreRequirementsMet = basicRequirementsMet && additionalRequirementsMet && platformRequirementsMet;
    const validationsPassed = hasValidTimeSelection && hasValidSubsidiary;

    return coreRequirementsMet && validationsPassed;
};
