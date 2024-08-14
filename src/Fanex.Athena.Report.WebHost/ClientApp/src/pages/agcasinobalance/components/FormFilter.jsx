import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AG_CASINO_BALANCE } from '@srcRoot/constants/pages';
import CollapsiblePanel from '@srcRoot/components/CollapsiblePanel';
import useToggleRequest from '@srcRoot/hooks/useToggleRequest';
import ReportSelect from '@srcRoot/components/ReportSelect';
import LangHelper from '@srcRoot/helpers/langHelper';
import DataService from '@srcRoot/lib/dataService';
import Site from '@srcRoot/lib/site';
import SubmitButton from '@srcRoot/components/SubmitButton';

import { ReportLevel } from '@srcRoot/constants/report';
import MonthPicker from '@srcRoot/components/month-picker';
import CheckBox from '@srcRoot/components/CheckBox';

import actions from '../actions';
import { constants } from '../common';

const FormFilter = (props) => {
    const dispatch = useDispatch();

    const formData = useSelector((state) => state.formData);
    const requestParam = useSelector((state) => state.requestParam);

    const dateRange = useSelector((state) => state.dateRange);
    const selectedCurrency = useSelector((state) => state.selectedCurrency);
    const excludeTestData = useSelector((state) => state.excludeTestData);

    const { sendRequest } = useToggleRequest();

    const { ApiUrl, DateConstraint, DrillDownLevel } = constants;
    const { setDateRange, setSelectedCurrency, setExcludeTestData, fetchDrillDownData } = actions;

    const isFormValid = !selectedCurrency;

    const onChangeDateRange = (range) => {
        dispatch(setDateRange({ startDate: range.fromDate, endDate: range.toDate }));
    };

    const onChangeExcludeTestData = (value) => {
        dispatch(setExcludeTestData(value));
    };

    const onChangeSelectedCurrency = (currency) => {
        dispatch(setSelectedCurrency(currency));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        sendRequest(() => dispatch(fetchDrillDownData(getParams())));
    };

    const getParams = () => {
        const params = {
            FromDate: Site.convertDateToString(dateRange.fromDate),
            ToDate: Site.convertDateToString(dateRange.toDate),
            BaseCurrency: selectedCurrency.value >= 0 ? '' : selectedCurrency.label.split(' ')[1],
            CurrencyName: selectedCurrency.label,
            CurrencyId: selectedCurrency.value,
            IsExcludedTestData: excludeTestData,
            DrillDownLevel: DrillDownLevel.Main,
            SubmitTime: new Date().getTime(),
        };

        return params;
    };

    const onExportExcel = () => {
        const params = requestParam?.DrillDownLevel == ReportLevel.MAIN ? getParams() : requestParam;
        sendRequest(
            () => DataService.getReportFile(ApiUrl.EXPORT_EXCEL_URL, params),
            (res) => downLoadExcel(res, params)
        );
    };

    const downLoadExcel = (response) => {
        const NoContentStatusCode = 204;

        if (response.status === NoContentStatusCode) {
            alert(LangHelper.getSingleResource('NoInfo'));
        } else {
            Site.downloadFile(response.data, `${AG_CASINO_BALANCE}.xls`);
        }
    };

    const SupportButtons = <i className="icon-excel right" onClick={onExportExcel} title={LangHelper.getSingleResource('ExportToExcel')} />;

    return (
        <CollapsiblePanel className="light-shadow" stickyFooter={SupportButtons} isCollapseMode={false}>
            <div className="row">
                <div className="col-12 col-lg-3 col-md-4 col-sm-12">
                    <div className="form-group">
                        <MonthPicker
                            minDate={DateConstraint.minDate}
                            maxDate={DateConstraint.maxDate}
                            fromDateOption={DateConstraint.fromDateOption}
                            toDateOption={DateConstraint.toDateOption}
                            monthOption={DateConstraint.monthOption}
                            fromDate={dateRange.fromDate}
                            toDate={dateRange.toDate}
                            onChange={onChangeDateRange}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-3 col-md-2 col-sm-12">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('Currency')}</label>
                        <ReportSelect
                            onChange={onChangeSelectedCurrency}
                            value={selectedCurrency}
                            defaultValue={selectedCurrency}
                            options={formData.currencies}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-2 col-md-2 col-sm-12">
                    <div className="form-group">
                        <CheckBox
                            id="ExcludeTest"
                            checked={excludeTestData}
                            onChange={onChangeExcludeTestData}
                            label={LangHelper.getSingleResource('ExcludeTestData')}
                        />
                    </div>
                </div>

                <div className="col-12 col-lg-2 col-md-2 col-sm-12">
                    <div className="form-group">
                        <div className="button-group">
                            <SubmitButton disabled={isFormValid} onClick={onSubmit} label={AG_CASINO_BALANCE}>
                                {LangHelper.getSingleResource('Submit').toUpperCase()}
                            </SubmitButton>
                        </div>
                    </div>
                </div>
            </div>
        </CollapsiblePanel>
    );
};

export default React.memo(FormFilter);
