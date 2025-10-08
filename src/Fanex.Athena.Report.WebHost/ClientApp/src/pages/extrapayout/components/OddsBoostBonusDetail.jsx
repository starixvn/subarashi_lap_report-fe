import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Table } from '@legion-lib/react-grid';
import { Row, Cell, HeaderRow, HeaderCell } from '@legion-lib/react-grid';

import { toggleLoader } from '@/actions/loaderAction';
import NoDataTitle from '@/components/NoDataTitle';
import LangHelper from '@/helpers/langHelper';
import DataService from '@/lib/dataService';
import Site from '@/lib/site';
import NumberFormat from '@/lib/numberFormat';

import ExportExcel from '@/components/ExportExcel';
import { ApiUrl } from '../common/constants';
import Service from '../common/service';
import BetListPopupLayout from '@/components/BetListPopupLayout';

export const OddsBoostBonusDetail = (props) => {
    const { param, toggleLoader } = props;
    const [data, setData] = useState(null);
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (param) {
            fetchData();
            generateTitle();
        }
    }, [param]);

    const fetchData = () => {
        if (!param) return;

        toggleLoader(true);
        DataService.postReportData(ApiUrl.ODDS_BOOST_BONUS_DETAIL_DATA_URL, param)
            .then((response) => {
                setData(response.data);
                toggleLoader(false);
            })
            .catch((error) => {
                Service.showErrorMsg();
                toggleLoader(false);
            });
    };

    const generateTitle = () => {
        if (!param) return;

        const viewIn = LangHelper.getSingleResource('Viewin').replace('{0}', param.CurrencyName);

        const fromDate = new Date(param.DrillDownFromDate);
        const fromDateValue = Service.getFormattedDate(fromDate);

        const toDate = new Date(param.DrillDownToDate);
        const toDateValue = Service.getFormattedDate(toDate);

        const generatedTitle = (
            <>
                {LangHelper.getSingleResource('PromotionDetails')}
                {', '}
                {fromDateValue} → {toDateValue} - {LangHelper.getSingleResource('OddsBoostBonus')} - <span className="base-currency-title">{viewIn}</span>
            </>
        );

        setTitle(generatedTitle);
    };

    const exportDetailExcel = () => {
        if (!param) {
            return;
        }

        const exportRequestParam = {
            ...param,
        };

        toggleLoader(true);
        DataService.getReportFile(ApiUrl.EXPORT_ODDS_BOOST_BONUS_DETAIL_DATA_URL, exportRequestParam)
            .then((response) => {
                const NoContentStatusCode = 204;
                if (response.status === NoContentStatusCode) {
                    alert(LangHelper.getSingleResource('NoInfo'));
                } else {
                    const fileName = 'OddsBoostBonusDetails.xls';
                    Site.downloadFile(response.data, fileName);
                }
                toggleLoader(false);
            })
            .catch((error) => {
                alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
                toggleLoader(false);
            });
    };

    const renderOddsBoostHeader = () => {
        return (
            <HeaderRow style={{ height: 32 }}>
                <HeaderCell colWidth={50}>#</HeaderCell>
                <HeaderCell colWidth={100}>{LangHelper.getSingleResource('Date')}</HeaderCell>
                <HeaderCell colWidth={120}>{LangHelper.getSingleResource('ExternalId')}</HeaderCell>
                <HeaderCell colWidth={120}>{LangHelper.getSingleResource('SystemId')}</HeaderCell>
                <HeaderCell colWidth={200}>{LangHelper.getSingleResource('RefNo')}</HeaderCell>
                <HeaderCell colWidth={120}>{LangHelper.getSingleResource('Product')}</HeaderCell>
                <HeaderCell colWidth={200}>{LangHelper.getSingleResource('PromotionType')}</HeaderCell>
                <HeaderCell colWidth={120}>{LangHelper.getSingleResource('CustomerAmount')}</HeaderCell>
            </HeaderRow>
        );
    };

    const renderOddsBoostDataSection = (dataList) => {
        const dataRows = [];
        for (let i = 0; i < dataList.length; i++) {
            dataRows.push(buildOddsBoostDataRow(dataList[i], i));
        }
        return dataRows;
    };

    const buildOddsBoostDataRow = (dataItem, index) => {
        const {
            dateString,
            externalId,
            systemId,
            refNo,
            productName,
            promotionType,
            customerAmount
        } = dataItem;

        return (
            <Row key={`odds-boost-row-${index}`}>
                <Cell className="center-align">{++index}</Cell>
                <Cell className="center-align">{dateString}</Cell>
                <Cell className="center-align">{externalId}</Cell>
                <Cell className="center-align">{systemId}</Cell>
                <Cell className="center-align">{refNo}</Cell>
                <Cell className="left-align">{productName}</Cell>
                <Cell className="left-align">{promotionType}</Cell>
                <Cell className={`right-align ${customerAmount < 0 ? 'negative' : ''}`}>
                    {NumberFormat.formatDecimal(customerAmount)}
                </Cell>
            </Row>
        );
    };

    const renderOddsBoostFooter = (data, baseCurrency) => {
        if (!data || !data.totalSummary) {
            return null;
        }

        const dataSummary = data.totalSummary;
        const summaryColSpan = 7;

        return (
            <Row key="odds-boost-total" className="light-footer">
                <Cell className="center-align" colSpan={summaryColSpan}>
                    {`${LangHelper.getSingleResource('TotalIn')} ${baseCurrency}`}
                </Cell>
                <Cell className={`right-align ${dataSummary.customerAmount < 0 ? 'negative' : ''}`}>
                    {NumberFormat.formatDecimal(dataSummary.customerAmount)}
                </Cell>
            </Row>
        );
    };

    const oddsBoostTitle = (
        <p>
            {title}
            <ExportExcel onClick={exportDetailExcel} />
        </p>
    );

    return (
        <div>
            <BetListPopupLayout title={oddsBoostTitle}>
                {data && data.data && data.data.length ? (
                    <Table
                        autoWidth={false}
                        autoHeight={false}
                        width={1050}
                        bodyHeight={430}
                        header={renderOddsBoostHeader()}
                        body={renderOddsBoostDataSection(data.data)}
                        footer={renderOddsBoostFooter(data, param?.BaseCurrency)}
                    />
                ) : (
                    <NoDataTitle />
                )}
            </BetListPopupLayout>
        </div>
    );
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ toggleLoader }, dispatch);
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(OddsBoostBonusDetail);
