import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../actions';
import { Table } from '@legion-lib/react-grid';
import { Breadcrumb } from '@legion-lib/react-breadcrumb';

import NoDataTitle from '@/components/NoDataTitle';
import ReportTitle from '@/components/ReportTitle';
import Popup from '@/components/Popup';
import LangHelper from '@/helpers/langHelper';
import DataService from '@/lib/dataService';

import { renderHeader, renderDataSection, renderFooter } from '../common/gridUtils';
import { ApiUrl, ReportLevel, BreadcrumbText, DefaultPagingOption } from '../common/constants';
import Service from '../common/service';
import Detail from './Detail';

export const DataGrid = (props) => {
    const [showBetList, setShowBetList] = useState(false);
    const [betListData, setBetListData] = useState(null);
    const [betlistTitle, setBetlistTitle] = useState('');
    const [pagingOption, setPagingOption] = useState(DefaultPagingOption);

    const breadcrumbItems = [
        {
            label: BreadcrumbText.main,
            value: ReportLevel.MAIN,
        },
        {
            label: BreadcrumbText.customer,
            value: ReportLevel.CUSTOMER,
        },
    ];

    const { data, totalRows } = props.reportData;
    if (!data) {
        return null;
    }

    if (!data.length) {
        return <NoDataTitle />;
    }

    const { requestParam, detailParams } = props;

    const _handleDrilldown = (e, currency, currencyName, drilldownDate) => {
        e.preventDefault();

        const selectedDate = new Date(drilldownDate);
        const dateValue = Service.getFormattedDate(selectedDate);

        const drilldownFromDate = requestParam.ReportBy == 1 ? drilldownDate : getDrilldownFromDate(selectedDate, requestParam.FromDate);
        const drilldownFromDateValue = requestParam.ReportBy == 1 ? dateValue : Service.getFormattedDate(drilldownFromDate);

        const drilldownToDate = requestParam.ReportBy == 1 ? drilldownDate : getDrilldownToDate(selectedDate, requestParam.ToDate);
        const drilldownToDateValue = requestParam.ReportBy == 1 ? dateValue : Service.getFormattedDate(drilldownToDate);

        const newRequestParam = {
            ...requestParam,
            CurrencyIdList: currency,
            DrillDownFromDate: drilldownFromDateValue,
            DrillDownToDate: drilldownToDateValue,
            DrillDownLevel: ReportLevel.CUSTOMER,
        };

        const title = Service.getTitle(
            drilldownFromDateValue,
            drilldownToDateValue,
            currencyName,
            newRequestParam.BaseCurrencyName,
            newRequestParam.ProductCodeList,
            newRequestParam.Username,
            props.isConvertAllToBaseCurrency
        );

        props.setReportTitle(title);
        props.setRequestParam(newRequestParam);
        props.toggleLoader(true);
        props.getReportData(ApiUrl.REPORT_DATA_URL, newRequestParam);
    };

    const _handleDrilldownBetlist = (e, custId, nickname, username) => {
        e.preventDefault();

        const detailParams = {
            ...requestParam,
            PageSize: 50,
            PageIndex: 1,
            IsExportExcel: false,
            CustId: custId,
            SystemId: username,
            ExternalId: nickname,
        };

        const viewIn = LangHelper.getSingleResource('Viewin').replace(
            '{0}',
            requestParam.currencyName ? requestParam.currencyName : requestParam.BaseCurrencyName
        );

        const fromDate = new Date(requestParam.DrillDownFromDate);
        const fromDateValue = Service.getFormattedDate(fromDate);

        const toDate = new Date(requestParam.DrillDownToDate);
        const toDateValue = Service.getFormattedDate(toDate);

        const betlistTitle = (
            <>
                {LangHelper.getSingleResource('PromotionDetails')}
                {', '}
                {fromDateValue} → {toDateValue} - {nickname}({username}) - <span className="base-currency-title">{viewIn}</span>
            </>
        );

        setBetlistTitle(betlistTitle);
        props.setDetailParams(detailParams);
        props.toggleLoader(true);

        DataService.postReportData(ApiUrl.REPORT_DETAIL_DATA_URL, detailParams)
            .then((response) => {
                setShowBetList(true);
                setBetListData(response.data);

                props.toggleLoader(false);
            })
            .catch((error) => {
                Service.showErrorMsg();
                props.toggleLoader(false);
            });
    };

    const getDrilldownToDate = (selectedDate, toDate) => {
        var paramTodate = new Date(toDate);
        if (selectedDate.getFullYear() === paramTodate.getFullYear() && selectedDate.getMonth() === paramTodate.getMonth()) {
            return new Date(toDate);
        } else {
            return new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
        }
    };

    const getDrilldownFromDate = (selectedDate, fromDate) => {
        var paramFromdate = new Date(fromDate);
        if (selectedDate.getFullYear() === paramFromdate.getFullYear() && selectedDate.getMonth() === paramFromdate.getMonth()) {
            return paramFromdate;
        } else {
            return selectedDate;
        }
    };

    const closeBetListPopup = () => {
        setShowBetList(false);
        setBetListData(null);
        props.setDetailParams(null);
    };

    const drillDownData = (level) => {
        const currentLevel = requestParam.DrillDownLevel;

        if (currentLevel === level || level !== ReportLevel.MAIN) {
            return;
        }

        props.toggleLoader(true);
        const newRequestParam = {
            ...requestParam,
            PageSize: 50,
            PageIndex: 1,
            CurrencyIdList: props.selectedCurrency,
            DrillDownLevel: level,
        };

        const title = Service.getTitle(
            newRequestParam.FromDate,
            newRequestParam.ToDate,
            newRequestParam.CurrencyName,
            newRequestParam.BaseCurrencyName,
            newRequestParam.ProductCodeList,
            newRequestParam.Username,
            props.isConvertAllToBaseCurrency
        );
        props.setReportTitle(title);
        props.setRequestParam(newRequestParam);
        props.getReportData(ApiUrl.REPORT_DATA_URL, newRequestParam);
    };

    const _handePaging = (pageSize, pageIndex, lastIndex) => {
        props.toggleLoader(true);

        const newRequestParam = {
            ...requestParam,
            PageIndex: pageIndex,
            PageSize: pageSize,
        };
        setPagingOption({
            ...pagingOption,
            PageIndex: pageIndex,
            PageSize: pageSize,
            LastIndex: lastIndex,
        });

        props.setRequestParam(newRequestParam);
        props.getReportData(ApiUrl.REPORT_DATA_URL, newRequestParam);
    };

    var lastIndex = requestParam.DrillDownLevel === ReportLevel.CUSTOMER && pagingOption.PageIndex > 1 ? pagingOption.LastIndex : 0;
    var { bodyData, index } = renderDataSection(data, requestParam.DrillDownLevel, _handleDrilldown, _handleDrilldownBetlist, lastIndex);
    var currenPagingOption = {
        PageIndex: requestParam.PageIndex,
        PageSize: requestParam.PageSize,
        TotalItem: totalRows,
        PageList: pagingOption.PageList,
    };

    return (
        <div className="result-content">
            <Breadcrumb items={breadcrumbItems} value={requestParam.DrillDownLevel} onChange={(item) => drillDownData(item.value)} />
            <ReportTitle content={props.reportTitle} />
            <Table
                key={`table-${requestParam.DrillDownLevel}-${props.reloadReport}`}
                minWidth={650}
                autoWidth={true}
                autoHeight={true}
                header={renderHeader(requestParam.DrillDownLevel)}
                body={bodyData}
                footer={renderFooter(props.reportData, requestParam.DrillDownLevel)}
                containerPadding={30}
                onSort={(sortBy, sortOrder) => props.setRequestParam({ ...requestParam, sortBy, sortOrder })}
                isPaging={requestParam.DrillDownLevel === ReportLevel.CUSTOMER}
                pageOption={currenPagingOption}
                shouldResetScrollPosition={true}
                onPaging={(pageIndex, pageSize) => _handePaging(pageSize, pageIndex, index)}
            />
            {requestParam.DrillDownLevel === ReportLevel.CUSTOMER && showBetList && (
                <Popup isShow={showBetList} title={LangHelper.getSingleResource('PromotionDetails')} className="betlist-container" onClose={closeBetListPopup}>
                    <Detail data={betListData} title={betlistTitle} param={detailParams} />
                </Popup>
            )}
        </div>
    );
};

function mapDispatchToProps(dispatch) {
    const { setRequestParam, toggleLoader, getReportData, setReportTitle, setDetailParams } = ActionCreators;
    return bindActionCreators({ setRequestParam, toggleLoader, getReportData, setReportTitle, setDetailParams }, dispatch);
}

function mapStateToProps(state) {
    const { requestParam, reportData, reportTitle, reloadReport, detailParams, selectedCurrency, isConvertAllToBaseCurrency } = state;
    return Object.assign({}, { requestParam, reportData, reportTitle, reloadReport, detailParams, selectedCurrency, isConvertAllToBaseCurrency });
}

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);
