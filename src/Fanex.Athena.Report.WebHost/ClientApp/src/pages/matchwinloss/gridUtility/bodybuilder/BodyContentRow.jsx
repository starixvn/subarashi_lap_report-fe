import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Cell } from '@legion-lib/react-grid';

import useNavigateParams from '@srcRoot/hooks/useNavigateParams';
import useToggleRequest from '@srcRoot/hooks/useToggleRequest';
import DataService from '@srcRoot/lib/dataService';

import Service, { constants } from '../../common';
import { ActionCreators } from '../../actions';
import CommonCells from '../CommonCells';

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
            CurrencyId: requestParam.CurrencyId,
            BaseCurrency: requestParam.BaseCurrency,
            CurrencyName: requestParam.CurrencyName,
            Date: requestParam.Date,
            LeagueId: matchData.leagueId,
            MatchId: matchData.matchId,
            EventType: matchData.eventType,
            ProductCode: matchData.productName,
            ProductCodeList: Service.getMatchProductCodeList(
                matchData.productName,
                requestParam.ProductOptions.filter((item) => item.status)
            ),
        };
    };

    const onClickMatchHandler = (e, match) => {
        e.preventDefault();

        const params = {
            CurrencyId: requestParam.CurrencyId,
            BaseCurrency: requestParam.BaseCurrency,
            CurrencyName: requestParam.CurrencyName,
            FromDate: requestParam.Date,
            ToDate: requestParam.Date,
            MatchId: match.matchId,
            LeagueId: match.leagueId,
            RaceNo: match.raceNo,
            BetType: isNaN(match.betType) ? 0 : match.betType,
            LiveIndicator: match.betType === 85 || match.betType === 86 ? match.isLive : '',
            HomeId: match.homeId,
            AwayId: match.awayId,
            ProductCodeList: Service.getMatchProductCodeList(matchData.productName, requestParam.ProductOptions),
            VendorMatchId: match.vendorMatchId,
            Distance: match.distance,
            IsNeutral: match.isNeutral,
            KickOffTime: match.kickOffTime,
            SportType: match.sportType,
            MatchCode: match.productName === "NG" ? match.matchCode : "" ,
            EventType: match.eventType,
            Rows: 50,
            Page: 1,
            SortOrder: 'asc',
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
    const isLinkData = (match) => Service.includeDrilldownProduct(match.productName);
    const matchName = Service.getMatchName(matchData);

    const rows = [
        <Row key={matchData.matchId} className="title-row bet-list-row">
            <Cell className={'center-align index-cell'} key={`col-index`} rowSpan={getIndexRowSpan()}>
                {index}
            </Cell>
            <Cell key={`col-matchName`}>
                <div className="match-container">
                    <a
                        className={`text-bold cell ${isLinkData(matchData) ? 'bet-list-link' : ''}`}
                        href={isLinkData(matchData) ? '#' : null}
                        onClick={(e) => isLinkData(matchData) && onClickMatchHandler(e, matchData)}
                        dangerouslySetInnerHTML={{ __html: matchName }}>
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
                        <a href="#" onClick={(e) => onClickMatchHandler(e, match)}>
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
