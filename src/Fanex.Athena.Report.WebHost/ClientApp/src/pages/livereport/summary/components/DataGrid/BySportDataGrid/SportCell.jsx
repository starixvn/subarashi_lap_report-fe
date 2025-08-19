import React from 'react';
import { Cell } from '@legion-lib/react-grid';
import { useDispatch, useSelector } from 'react-redux';
import Service, { constants } from '../../../common';
import useNavigateParams from '@/hooks/useNavigateParams';
import { createSearchParams } from 'react-router-dom';
import { ActionCreators } from '../../../actions';

const SportCell = ({ data, isShowedDetailLink }) => {
    const navigate = useNavigateParams();
    const dispatch = useDispatch();
    const requestParam = useSelector(state => state.requestParam);

    const { MatchListPage, BetListPageUrl } = constants;
    const { toggleLoader } = ActionCreators;

    if (!data.isLive || !isShowedDetailLink) {
        return (
            <Cell title={data.productName} className="left-align" key={`cell-title`}>
                {data.productName}
            </Cell>
        );
    }

    const onBetListClick = (e, url) => {
        e.preventDefault();
        dispatch(toggleLoader(true));

        navigate(url);
    };

    const betListUrl = BetListPageUrl[data.productCode];
    if (betListUrl) {
        const params = {
            ...requestParam,
            ProductCodeList: Service.getMatchListProductOption(data.productCode ?? 0, requestParam.ProductCode).join(','),
            Rows: 50,
            Page: 1,
        };

        return (
            <Cell title={data.productName} className="left-align" key={`cell-title`}>
                <a href="#" onClick={e => onBetListClick(e, betListUrl + createSearchParams(params))}>
                    {data.productName}
                </a>
            </Cell>
        );
    }

    const onMatchListClickHandler = event => {
        event.preventDefault();
        dispatch(toggleLoader(true));

        const params = {
            ...requestParam,
            ProductName: data.productName,
            SportId: data.productCode ?? 0,
            ProductCodeList: Service.getMatchListProductOption(data.productCode ?? 0, requestParam.ProductCode).join(','),
        };

        return navigate(MatchListPage, params);
    };

    return (
        <Cell title={data.productName} className="left-align" key={`cell-title`}>
            <a href="#" onClick={onMatchListClickHandler}>
                {data.productName}
            </a>
        </Cell>
    );
};

export default React.memo(SportCell);
