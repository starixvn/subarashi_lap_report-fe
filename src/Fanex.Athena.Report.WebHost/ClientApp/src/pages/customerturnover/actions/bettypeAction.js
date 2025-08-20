import * as bettypeAction from '@/actions/bettypeAction';

import { ApiUrl } from '../common/apiSettings';
import Service from '../common';
import LangHelper from '@/helpers/langHelper';
import { toggleLoader } from '@/actions/loaderAction';

const BETTYPE_CACHE_KEY = 'CUSTOMER_TURNOVER_BETTYPE_CACHE_KEY';

export const fetchBetTypeList = sportProducts => async dispatch => {
    try {
        dispatch(toggleLoader(true));

        const cacheKey = `${BETTYPE_CACHE_KEY}:${sportProducts.map(x => x.name).join(',')}`;
        const data = await Service.fetchBetTypeList({
            url: ApiUrl.BETTYPE_URL,
            cacheKey: cacheKey,
            sportProducts,
        });
        if (!data) {
            return;
        }

        const { bettypeTree, selectedBettypeIds } = buildBettypeTree(data);

        dispatch(bettypeAction.setBettypeList(bettypeTree));
        dispatch(bettypeAction.setSelectedBettype(selectedBettypeIds.join(',')));
    } finally {
        dispatch(toggleLoader(false));
    }
};

const buildBettypeTree = bettypeList => {
    const selectedBettypeIds = [];

    const productPrefixs = [...new Set(bettypeList.map(item => item.productPrefix))];
    const bettypeTree = productPrefixs.map((productPrefix, index) => {
        const children = [];
        for (let i = 0; i < bettypeList.length; ++i) {
            const bettype = bettypeList[i];
            if (bettype.productPrefix !== productPrefix) {
                continue;
            }

            selectedBettypeIds.push(`${productPrefix}-${bettype.id}`);
            children.push({
                id: `${productPrefix}-${i + 1}`,
                name: bettype.name,
                value: `${productPrefix}-${bettype.id}`,
                checked: true,
            });
        }

        return {
            id: productPrefix,
            name: LangHelper.getSingleResource(`Product${productPrefix}`),
            value: `-1-${index}`,
            checked: true,
            children: children,
        };
    });

    return {
        bettypeTree,
        selectedBettypeIds,
    };
};

export default {
    ...bettypeAction,
    fetchBetTypeList,
};
