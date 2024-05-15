import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cell } from '@legion-lib/react-grid';

import useNavigateParams from '@srcRoot/hooks/useNavigateParams';

import { constants } from '../../common';
import { ActionCreators } from '../../actions';

function MatchCell({ data, ...rest }) {
    const navigate = useNavigateParams();
    const dispatch = useDispatch();
    const requestParam = useSelector((state) => state.requestParam);

    const { BetListPageUrl } = constants;
    const { toggleLoader } = ActionCreators;

    const onClickMatch = (e) => {
        e.preventDefault();
        dispatch(toggleLoader(true));

        const params = {
            FromDate: requestParam.FromDate,
            ToDate: requestParam.ToDate,
            LiveIndicator: requestParam.LiveIndicator,
            CurrencyId: requestParam.CurrencyId,
            CurrencyName: requestParam.CurrencyName,
            BaseCurrency: requestParam.BaseCurrency,
            ProductCodeList: requestParam.ProductCodeList,
            SubsidiarySearch: requestParam.SubsidiarySearch,
            MatchId: data.matchId,
            HomeId: data.homeId,
            AwayId: data.awayId,
            BetType: data.betType,
            Rows: 50,
            Page: 1,
        };

        if (requestParam.SubsidiaryList) {
            params.SubsidiaryList = requestParam.SubsidiaryList;
        }

        navigate(BetListPageUrl.MATCH, params);
    };

    return (
        <Cell title={data.matchName} {...rest}>
            <a href="#" className="match-detail-link" onClick={onClickMatch}>
                {data.matchName}
            </a>
        </Cell>
    );
}

export default MatchCell;
