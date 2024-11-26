import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TreeViewSelect } from '@legion-lib/react-multiselect';
import { DateRange } from '@legion-lib/react-daterangepicker';

import { CUSTOMER_TURNOVER, USER_GUIDE } from '@srcRoot/constants/pages';
import CollapsiblePanel from '@srcRoot/components/CollapsiblePanel';
import useToggleRequest from '@srcRoot/hooks/useToggleRequest';
import CheckBox from '@srcRoot/components/CheckBox';
import AutoComplete from '@srcRoot/components/auto-complete';
import SubmitButton from '@srcRoot/components/SubmitButton';
import ReportSelect from '@srcRoot/components/ReportSelect';
import UserGuide from '@srcRoot/components/UserGuide';
import LangHelper from '@srcRoot/helpers/langHelper';
import DataService from '@srcRoot/lib/dataService';
import Site from '@srcRoot/lib/site';

import ActionCreators from '../actions';
import Service, { constants } from '../common';
import { TicketFilterOptions, TicketFilterValue } from '../common/filterSettings';

const FormFilter = (props) => {
    const { DateConstraint, ApiUrl, TreeViewOption, ReportByValue, DefaultPagingOption, MAX_ODDS_DIGITS, CHILD_ID_PREFIX } = constants;
    const {
        setDateRange,
        setUsername,
        setReportBy,
        setSelectedCurrency,
        setSelectedProducts,
        setMiniumOdds,
        setSelectedTicket,
        setGridData,
        setRequestParam,
        setSelectedBettype,
        getUserGuideContent,
    } = ActionCreators;

    const dispatch = useDispatch();

    const formData = useSelector((state) => state.formData);
    const userGuideContent = useSelector((state) => state.userGuideContent);

    const dateRange = useSelector((state) => state.dateRange);
    const username = useSelector((state) => state.username);
    const reportBy = useSelector((state) => state.reportBy);
    const bettypeList = useSelector((state) => state.bettypeList);
    const selectedCurrency = useSelector((state) => state.selectedCurrency);
    const selectedProduct = useSelector((state) => state.selectedProduct);
    const minimumOdds = useSelector((state) => state.minimumOdds);
    const selectedTickets = useSelector((state) => state.selectedTickets);
    const selectedBettype = useSelector((state) => state.selectedBettype);
    const requestParam = useSelector((state) => state.requestParam);

    const [allSelected, setAllSelected] = useState(true);

    const isFormValid = !selectedProduct?.length || !selectedCurrency || !selectedTickets?.length || !bettypeList?.length || !selectedBettype;

    const { sendRequest } = useToggleRequest();

    const onChangeDateRange = (range, isValid = true) => {
        if (isValid) {
            dispatch(setDateRange(range));
        } else {
            const message = LangHelper.getSingleResource('DateRangeExceedMsg').replace('{0}', DateConstraint.limitedMonthRange);
            alert(message);
        }
    };

    useEffect(() => {
        const selectedProductAndSportIds = formData.productOptions.map((item) => (item.parentId !== -1 ? CHILD_ID_PREFIX + item.id : item.id)).join(',');
        dispatch(setSelectedProducts(selectedProductAndSportIds, formData.productOptions, formData.productHasNoSport));
    }, []);

    const onChangeSelectedCurrency = (currency) => {
        dispatch(setSelectedCurrency(currency));
    };

    const onChangeSelectedProducts = (currentItem, selectedproductAndSportIds, selectedItem) => {
        dispatch(setSelectedProducts(selectedproductAndSportIds, formData.productOptions, formData.productHasNoSport));
    };

    const onChangeSelectedBettype = (currentItem, selectedItemsKey, selectedItems) => {
        dispatch(setSelectedBettype(selectedItemsKey));
    };

    const onChangeReportBy = (value) => {
        dispatch(setReportBy(value));
    };

    const onChangeMinimumOdds = (event) => {
        const { value } = event.target;
        if (isNaN(value)) {
            return;
        }

        dispatch(setMiniumOdds(value));
    };

    const onChangeTicketFilter = (option) => {
        if (option.value == TicketFilterValue.All) {
            return onAllSelectedChange();
        }
        let newSelectedList = [...selectedTickets];

        const selected = newSelectedList.find((x) => x.value == option.value);
        if (selected) {
            newSelectedList = newSelectedList.filter((x) => x.value !== option.value);
        } else {
            newSelectedList.push(option);
        }

        if (newSelectedList.length == TicketFilterOptions.length) {
            setAllSelected(true);
        } else {
            setAllSelected(false);
        }

        dispatch(setSelectedTicket(newSelectedList));
    };

    const onAllSelectedChange = () => {
        if (allSelected) {
            setAllSelected(false);
            dispatch(setSelectedTicket([]));
            return;
        }

        setAllSelected(true);
        dispatch(setSelectedTicket(TicketFilterOptions));
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const params = getParams();

        sendRequest(() => DataService.postReportData(ApiUrl.DATA_URL, params), updateData);
        dispatch(setRequestParam(params));
    };

    const updateData = (result) => {
        let gridData = null;
        if (result && result.data !== null) {
            gridData = result.data;
        }

        dispatch(setGridData(gridData));
    };

    const getParams = () => {
        const bettypes = Service.getSelectedBettypeXML(
            selectedBettype.split(','),
            bettypeList.map((item) => item.id)
        );

        const params = {
            FromDate: Site.convertDateToString(dateRange.fromDate),
            ToDate: Site.convertDateToString(dateRange.toDate),
            UserName: username,
            ProductIds: selectedProduct,
            Odds: minimumOdds ? minimumOdds : 0,
            ReportBy: reportBy,
            Bettypes: bettypes,
            ShowDraw: selectedTickets.some((filter) => filter.value == TicketFilterValue.Draw),
            ShowLoss: selectedTickets.some((filter) => filter.value == TicketFilterValue.Lost),
            ShowWin: selectedTickets.some((filter) => filter.value == TicketFilterValue.Won),
            CurrencyName: selectedCurrency.label,
            CurrencyId: selectedCurrency.value,
            PageIndex: DefaultPagingOption.PageIndex,
            PageSize: requestParam?.PageSize || DefaultPagingOption.PageSize,
        };

        return params;
    };

    const fetchUserGuide = () => {
        if (!userGuideContent) {
            sendRequest(() => dispatch(getUserGuideContent(CUSTOMER_TURNOVER)));
        }
    };

    const onExportExcel = () => {
        sendRequest(() => DataService.getReportFile(ApiUrl.EXPORT_EXCEL_URL, getParams()), downLoadExcel);
    };

    const downLoadExcel = (response) => {
        const NoContentStatusCode = 204;

        if (response.status === NoContentStatusCode) {
            alert(LangHelper.getSingleResource('NoInfo'));
        } else {
            const fileNameWithExt = 'CustomerTurnover' + (response.headers['content-type'] === 'application/zip' ? '.zip' : '.xls');

            Site.downloadFile(response.data, fileNameWithExt);
        }
    };

    const SupportButtons = (
        <>
            <i className="icon-excel right" onClick={onExportExcel} title={LangHelper.getSingleResource('ExportToExcel')} />
            <UserGuide
                title={LangHelper.getSingleResource(USER_GUIDE)}
                contentTitle={LangHelper.getSingleResource(CUSTOMER_TURNOVER)}
                onClick={fetchUserGuide}
                content={userGuideContent}
            />
        </>
    );

    return (
        <CollapsiblePanel stickyFooter={SupportButtons} isCollapseMode={false}>
            <div className="row">
                <div className="col-12 col-lg-3 col-md-3 col-sm-12">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('Date')}</label>
                        <DateRange
                            {...DateConstraint}
                            startDate={dateRange.fromDate}
                            endDate={dateRange.toDate}
                            onChange={onChangeDateRange}
                            langHandler={(key) => LangHelper.getSingleResource(key)}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-3 col-md-3 col-sm-12">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('Username')}</label>
                        <AutoComplete
                            url={ApiUrl.SEARCH_CUSTOMER}
                            onSelect={(value) => dispatch(setUsername(value))}
                            onInput={(value) => dispatch(setUsername(value))}
                            htmlAttributes={{ placeholder: LangHelper.getSingleResource('All') }}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-3 col-md-3 col-sm-12">
                    <div className="form-group">
                        <label className="label-text">
                            {LangHelper.getSingleResource('MinimumOdds')}
                            <span className="decimal-odds"> ({LangHelper.getSingleResource('DecimalOdds')})</span>
                        </label>
                        <input
                            className="input-text"
                            id="MinimumOdds"
                            name="MinimumOdds"
                            type="text"
                            value={minimumOdds}
                            maxLength={MAX_ODDS_DIGITS}
                            placeholder={LangHelper.getSingleResource('All')}
                            onChange={onChangeMinimumOdds}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-lg-3 col-md-3 col-sm-12">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('Product')} *</label>
                        <TreeViewSelect
                            language={LangHelper.currentLanguage}
                            id="ProductTreeView"
                            dataSource={formData.productTreeViewOptions}
                            keyField="value"
                            valueField="name"
                            statusField="checked"
                            isAllTextShown={true}
                            hasSearchBox={false}
                            treeViewOption={TreeViewOption}
                            onChange={onChangeSelectedProducts}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-3 col-md-3 col-sm-12">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('BetType')} *</label>
                        <TreeViewSelect
                            language={LangHelper.currentLanguage}
                            id="BettypeTreeView"
                            dataSource={bettypeList}
                            keyField="value"
                            valueField="name"
                            statusField="checked"
                            isAllTextShown={true}
                            hasSearchBox={false}
                            treeViewOption={TreeViewOption}
                            onChange={onChangeSelectedBettype}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-3 col-md-3 col-sm-12">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('Currency')}</label>
                        <ReportSelect onChange={onChangeSelectedCurrency} defaultValue={selectedCurrency} options={formData.currencyList} />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12 col-lg-3 col-md-3 col-sm-12">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('TicketFilter')} *</label>
                        <CheckBox
                            key="checkbox-all"
                            id="checkbox-all"
                            className={!selectedTickets.length ? 'invalid bold' : ''}
                            checked={allSelected}
                            onChange={onAllSelectedChange}
                            label={LangHelper.getSingleResource('All')}
                        />
                        {TicketFilterOptions.map((option) => (
                            <CheckBox
                                id={`checkbox-${option.value}`}
                                key={option.label}
                                className={!selectedTickets.length ? 'invalid bold' : ''}
                                checked={selectedTickets?.includes(option)}
                                onChange={() => onChangeTicketFilter(option)}
                                label={LangHelper.getSingleResource(option.label)}
                            />
                        ))}
                    </div>
                </div>
                <div className="col-12 col-lg-2 col-md-3 col-sm-12">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('ReportBy')}</label>
                        <input
                            type="radio"
                            value={ReportByValue.Daily}
                            checked={reportBy == ReportByValue.Daily}
                            name="ReportBy"
                            id="reportbydaily"
                            onChange={() => onChangeReportBy(ReportByValue.Daily)}
                        />
                        <label htmlFor="reportbydaily">{LangHelper.getSingleResource('Daily')}</label>
                        <input
                            type="radio"
                            value={ReportByValue.Monthly}
                            name="ReportBy"
                            id="reportbymonthly"
                            checked={reportBy == ReportByValue.Monthly}
                            onChange={() => onChangeReportBy(ReportByValue.Monthly)}
                        />
                        <label htmlFor="reportbymonthly">{LangHelper.getSingleResource('Monthly')}</label>
                    </div>
                </div>
                <div className="col-12 col-lg-2 col-md-3 col-sm-12">
                    <div className="form-group">
                        <div className="button-group">
                            <SubmitButton disabled={isFormValid} onClick={onSubmit} label={CUSTOMER_TURNOVER}>
                                {LangHelper.getSingleResource('Submit').toUpperCase()}
                            </SubmitButton>
                        </div>
                    </div>
                </div>
            </div>
            {formData.isAllowSLT && (
                <div className="row">
                    <div className="col-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                            <ul className="list result-note">
                                <li>{LangHelper.getSingleResource('SLTDateRangeNote')}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </CollapsiblePanel>
    );
};

export default React.memo(FormFilter);
