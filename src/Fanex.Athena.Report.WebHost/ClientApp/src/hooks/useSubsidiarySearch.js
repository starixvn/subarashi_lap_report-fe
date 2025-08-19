import { useSelector } from 'react-redux';
import { SubsidiaryViewType } from '@/constants/report';

export const useSubsidiarySearch = () => {
    const isSubsidiarySearch = useSelector(state => state.subsidiarySearch);
    const formData = useSelector(state => state.formData);
    const defaultSelectedSubsidiary = formData.subsidiaryList.join(',');
    const isShowSubsidiaryDropdown = formData.subsidiaryViewType !== SubsidiaryViewType.NOT_MANAGEMENT && formData.subsidiaryList.length > 0;
    const isShowSubsidiarySearchCheckBox = isShowSubsidiaryDropdown && formData.subsidiaryViewType === SubsidiaryViewType.MASTER_MANAGEMENT;
    const isWhiteLabelView = formData.subsidiaryViewType === SubsidiaryViewType.MASTER_MANAGEMENT && !formData.isOneworksMaster;
    return { isSubsidiarySearch, isShowSubsidiaryDropdown, isShowSubsidiarySearchCheckBox, isWhiteLabelView, defaultSelectedSubsidiary };
};

export default useSubsidiarySearch;
