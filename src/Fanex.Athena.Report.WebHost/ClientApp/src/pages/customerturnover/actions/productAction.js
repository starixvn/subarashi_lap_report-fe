import { fetchBetTypeList } from './bettypeAction';
import { CHILD_ID_PREFIX } from '../common/filterSettings';

export const setSelectedProducts = (selectedProductAndSportIds, sportProducts, productHasNoSport) => async dispatch => {
    const ids = selectedProductAndSportIds ? selectedProductAndSportIds.split(',') : [];

    dispatch(setSelectedSportProducts(ids, productHasNoSport));
    dispatch(setBettypeList(ids, sportProducts));
};

const setSelectedSportProducts = (ids, productHasNoSport) => async dispatch => {
    const sportIds = ids
        .filter(id => id.startsWith(CHILD_ID_PREFIX) || productHasNoSport.includes(Number(id)))
        .map(childId => Number(childId.replace(CHILD_ID_PREFIX, '')));
    dispatch(setSelectedProducts(sportIds.join(',')));
};

const setBettypeList = (ids, sportProducts) => async dispatch => {
    if (!ids?.length) {
        dispatch(fetchBetTypeList([]));
        return;
    }

    const productIds = getProductIds(ids, sportProducts);
    const selectedSportProducts = getSportProducts(ids, productIds, sportProducts);

    dispatch(fetchBetTypeList(selectedSportProducts));
};

const getProductIds = (ids, sportProducts) => {
    const productIds = [];
    for (let i = 0; i < ids.length; ++i) {
        if (!ids[i].startsWith(CHILD_ID_PREFIX)) {
            productIds.push(Number(ids[i]));
            continue;
        }

        const sportId = Number(ids[i].replace(CHILD_ID_PREFIX, ''));
        const sport = sportProducts.find(item => sportId === item.id && item.parentId !== -1);

        if (!productIds.includes(sport.parentId)) {
            productIds.push(sport.parentId);
        }
    }

    return productIds;
};

const getSportProducts = (ids, productIds, sportProducts) => {
    const sportIds = ids.filter(id => id.startsWith(CHILD_ID_PREFIX)).map(childId => Number(childId.replace(CHILD_ID_PREFIX, '')));
    const selectedProducts = [];
    for (let i = 0; i < sportProducts.length; ++i) {
        const sport = sportProducts[i];

        if (sport.parentId === -1 && productIds.includes(sport.id)) {
            selectedProducts.push(sport);
            continue;
        }

        if (sport.parentId !== -1 && sportIds.includes(sport.id)) {
            selectedProducts.push(sport);
            continue;
        }
    }

    return selectedProducts;
};
