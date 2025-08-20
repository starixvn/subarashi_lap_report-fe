import DataService from '@/lib/dataService';
import Service from '../common/service';
import { SET_SELECTED_SPORT, SET_SPORT_LIST } from './types.js';
import ObjectHelper from '@/lib/objectHelper.js';

const setSelectedSport = sportId => ({
    type: SET_SELECTED_SPORT,
    data: sportId,
});

const setSportList = list => ({
    type: SET_SPORT_LIST,
    data: list,
});

const getSportList = productCodes => async dispatch => {
    const response = await DataService.getData('api/CommonDataApi/GetSportsForTreeView', { productCodes: productCodes });
    const data = response.data;

    if (data && Array.isArray(data)) {
        const sbParent = data.find(item => item && item.ID === 0 && item.Value === 'SB');
        if (sbParent && sbParent.Children && Array.isArray(sbParent.Children)) {
            sbParent.Children = sbParent.Children.filter(child => child && (child.ID !== -1 || child.Value !== '-1'));
        }
    }

    const camelData = ObjectHelper.toCamel(data);
    const selectedSports = Service.getSelectedItemFromTreeListItem(camelData);
    dispatch(setSportList(camelData));
    dispatch(setSelectedSport(selectedSports));
};

export default {
    getSportList,
    setSportList,
    setSelectedSport,
};
