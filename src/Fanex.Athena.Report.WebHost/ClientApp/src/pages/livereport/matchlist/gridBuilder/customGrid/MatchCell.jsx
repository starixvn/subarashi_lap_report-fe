import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cell } from '@legion-lib/react-grid';

import useNavigateParams from '@/hooks/useNavigateParams';

import { constants } from '../../common';
import { ActionCreators } from '../../actions';

const getMatchUrl = sportId => {
    switch (sportId) {
        case 177:
        case 198:
        case 125:
        case 126:
        case 127:
            return constants.BetListPageUrl.VSNEWRACING;
        default:
            return constants.BetListPageUrl.MATCH;
    }
};

const MatchCell = ({ data, ...rest }) => {
    const navigate = useNavigateParams();
    const dispatch = useDispatch();
    const requestParam = useSelector(state => state.requestParam);

    const { toggleLoader } = ActionCreators;

    const onClickMatch = e => {
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
            EventType: data.eventType,
            SportType: data.sportId,
            Distance: data.distance,
            VendorMatchId: data.vendorMatchId,
            Rows: 50,
            Page: 1,
        };

        if (requestParam.SubsidiaryList) {
            params.SubsidiaryList = requestParam.SubsidiaryList;
        }

        const url = getMatchUrl(data.sportId);

        navigate(url, params);
    };

    return (
        <Cell title={data.matchName} {...rest}>
            <a href="#" className="match-detail-link" onClick={onClickMatch}>
                {data.matchName}
            </a>
        </Cell>
    );
};

export default MatchCell;
