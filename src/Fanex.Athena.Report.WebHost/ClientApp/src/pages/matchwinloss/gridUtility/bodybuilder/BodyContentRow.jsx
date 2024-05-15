import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Cell } from '@legion-lib/react-grid';

import useNavigateParams from '@srcRoot/hooks/useNavigateParams';
import useToggleRequest from '@srcRoot/hooks/useToggleRequest';
import DataService from '@srcRoot/lib/dataService';

import Service, { constants } from '../../common';
import { ActionCreators } from '../../actions';
import CommonCells from '../CommonCells';
import Site from '@srcRoot/lib/site';

function BodyContentRow(props) {
    const navigate = useNavigateParams();

    const dispatch = useDispatch();
    const requestParam = useSelector((state) => state.requestParam);

    const [expanded, setExpanded] = useState(false);
    const [detailData, setDetailData] = useState([]);

    const { sendRequest } = useToggleRequest();

    const { toggleLoader } = ActionCreators;
    const { ApiUrl, BetListPageUrl } = constants;

    const { matchData, index } = props;

    useEffect(() => {
        resetRowState();
    }, [matchData]);

    const resetRowState = () => {
        setDetailData([]);
        setExpanded(false);
    };

    const onClickExpandHandler = (e) => {
        e.preventDefault();

        if (detailData.length && expanded) {
            setExpanded(false);
            return;
        }

        const params = getDetailParams();
        if (!params) {
            // Invalid params => Fake loading to improve User Experience
            dispatch(toggleLoader(true));
            setTimeout(() => dispatch(toggleLoader(false)), 50);
            return;
        }

        sendRequest(() => DataService.postReportData(ApiUrl.DETAIL_DATA_URL, params), updateDetailData);
    };

    const updateDetailData = (result) => {
        if (!result || !result.data) {
            return;
        }

        setExpanded(true);
        setDetailData(result.data);
    };

    const getDetailParams = () => {
        if (!matchData.leagueId) {
            return null;
        }

        return {
            currencyId: requestParam.currencyId,
            baseCurrency: requestParam.baseCurrency,
            currencyName: requestParam.currencyName,
            date: requestParam.date,
            leagueId: matchData.leagueId,
            matchId: matchData.matchId,
            productCode: matchData.productName,
            productCodeList: Service.getMatchProductCodeList(
                matchData.productName,
                requestParam.productOptions.filter((item) => item.status)
            ),
        };
    };

    const onClickMatchHandler = (e, match) => {
        e.preventDefault();

        const params = {
            currencyId: requestParam.currencyId,
            baseCurrency: requestParam.baseCurrency,
            currencyName: requestParam.currencyName,
            fromDate: requestParam.date,
            toDate: requestParam.date,
            matchId: match.matchId,
            leagueId: match.leagueId,
            raceno: match.raceNo,
            bettype: isNaN(match.bettype) ? 0 : match.bettype,
            liveIndicator: match.bettype === 85 || match.bettype === 86 ? match.isLive : '',
            homeId: match.homeId,
            awayId: match.awayId,
            productCode: match.productName,
            productCodeList: Service.getMatchProductCodeList(match.productName, requestParam.productOptions),
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

        navigate(BetListPageUrl.MATCH_BETTYPE, params);
    };

    const getIndexRowSpan = () => (detailData.length && expanded ? detailData.length + 1 : null);
    const isLiveData = (match) => match.productName === 'SB';

    const rows = [
        <Row key={matchData.matchId} className="title-row bet-list-row">
            <Cell className={'center-align index-cell'} key={`col-index`} rowSpan={getIndexRowSpan()}>
                {index}
            </Cell>
            <Cell key={`col-matchName`}>
                <div className="match-container">
                    <a
                        className={`text-bold cell ${isLiveData(matchData) ? 'bet-list-link' : ''}`}
                        href={isLiveData(matchData) ? '#' : null}
                        onClick={(e) => isLiveData(matchData) && onClickMatchHandler(e, matchData)}>
                        {matchData.homeName}
                        <br />
                        {matchData.awayName}
                    </a>
                    <a className={`icon-wrapper cell ${expanded ? 'expanded' : ''}`} href="#" onClick={onClickExpandHandler}>
                        <i className={`icon-arrow`}></i>
                    </a>
                </div>
            </Cell>
            <CommonCells data={matchData} />
        </Row>,
    ];

    if (detailData.length && expanded) {
        rows.push(
            detailData.map((match, matchIndex) => (
                <Row key={`x-submatch-${matchIndex}`}>
                    <Cell key={`col-matchName`}>
                        <a href="#" onClick={(e) => onClickMatchHandler(e, matchData)}>
                            <span>{match.bettypeName}</span>
                        </a>
                    </Cell>
                    <CommonCells data={match} />
                </Row>
            ))
        );
    }

    return rows;
}

export default BodyContentRow;
