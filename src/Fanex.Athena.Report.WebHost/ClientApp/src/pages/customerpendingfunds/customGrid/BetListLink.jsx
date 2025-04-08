import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BetListPageUrl } from '../common/apiUrl';
import { createSearchParams } from 'react-router-dom';
import { ActionCreators } from '../actions';
import Site from '@/lib/site';

const BetListLink = ({ data }) => {
    const dispatch = useDispatch();
    const requestParams = useSelector((state) => state.requestParam);

    const { setPopUpSettings } = ActionCreators;

    const onClickHandler = (e) => {
        e.preventDefault();

        const params = getParams();
        const searchParams = createSearchParams(params).toString();
        const iframeUrl = `${Site.resolveClientUrl(BetListPageUrl.DATA_URL)}?${searchParams}`;
        dispatch(setPopUpSettings({ iframeUrl: iframeUrl, isShow: true }));
    };

    const getParams = () => ({
        CurrencyId: requestParams.CurrencyId,
        CurrencyName: requestParams.CurrencyName,
        BaseCurrency: requestParams.BaseCurrency,
        CurrencyId: requestParams.CurrencyId,
        ProductCodeList: requestParams.ProductOptions.map((product) => product.code).join(','),
        CustId: data.custId,
        SystemId: data.systemId,
        ExternalId: data.externalId,
        ExcludeFreeBet: true,
    });

    return (
        <a href="#" onClick={onClickHandler}>
            {data.externalId}
        </a>
    );
};

export default BetListLink;
