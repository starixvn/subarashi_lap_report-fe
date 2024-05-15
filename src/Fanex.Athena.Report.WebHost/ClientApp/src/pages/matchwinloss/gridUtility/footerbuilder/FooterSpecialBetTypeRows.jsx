import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Cell } from '@legion-lib/react-grid';

import useNavigateParams from '@srcRoot/hooks/useNavigateParams';

import CommonCells from '../CommonCells';
import { constants } from '../../common';

function FooterSpecialBetTypeRows(props) {
    const navigate = useNavigateParams();
    const requestParam = useSelector((state) => state.requestParam);

    const { BetListPageUrl } = constants;
    const onClickOutrightMixParlay = (e, match) => {
        e.preventDefault();

        switch (true) {
            case 3601 <= match.betType && match.betType <= 3610:
                return navigate(BetListPageUrl.BETTYPE_WINLOSS, getParams(match));
            case match.betType === 10:
                return navigate(BetListPageUrl.OUTRIGHT, getParams(match));
            default:
                return navigate(BetListPageUrl.MIXPARLAY, getParams(match));
        }
    };

    const getParams = (match) => {
        const params = {
            currencyId: requestParam.currencyId,
            baseCurrency: requestParam.baseCurrency,
            currencyName: requestParam.currencyName,
            fromDate: requestParam.date,
            todate: requestParam.date,
            betType: match.betType,
            productCodeList: requestParam.productOptions.slice(1).reduce((acc, cur) => acc + ',' + cur.code, requestParam.productOptions[0].code),
            rows: 50,
            page: 1,
            sord: 'asc',
        };

        if (requestParam.SubsidiaryList) {
            params.SubsidiaryList = requestParam.SubsidiaryList;
        }

        if (requestParam.SubsidiarySearch) {
            params.SubsidiarySearch = requestParam.SubsidiarySearch;
        }

        return params;
    };

    return props.data.map((item) => (
        <Row key={`footer-SystemParlay-${item.bettypeName}`} className="light-footer">
            <Cell key={'footer-SystemParlay-title'} className="left-align" colSpan={props.totalSpan}>
                <a className="text-bold cell bet-list-link" href="#" onClick={(e) => onClickOutrightMixParlay(e, item)}>
                    {item.bettypeName}
                </a>
            </Cell>
            <CommonCells data={item} />
        </Row>
    ));
}

export default FooterSpecialBetTypeRows;
