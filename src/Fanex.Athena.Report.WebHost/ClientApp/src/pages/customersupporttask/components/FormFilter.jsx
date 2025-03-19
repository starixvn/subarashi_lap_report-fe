import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useRouteLoaderData } from 'react-router-dom';
import MultipleSelect from '@legion-lib/react-multiselect';

import ReportSelect from '@srcRoot/components/ReportSelect';
import DataService from '@srcRoot/lib/dataService';
import Site from '@srcRoot/lib/site';
import LangHelper from '@srcRoot/helpers/langHelper';
import * as pages from '@srcRoot/constants/pages';
import { ActionCreators } from '../actions';

import { SupportTaskOptions, ExportUrl, ExportFileName } from '../lib/constants';
import CollapsiblePanel from '../../../components/CollapsiblePanel';
import SubmitButton from '@srcRoot/components/SubmitButton';

const FormFilter = ({ formData, selectedCurrency, selectedSupportTask, setSelectedSupportTask, setSelectedCurrency, toggleLoader }) => {
    const currencies = formData.currencies;
    const loadedData = useRouteLoaderData(pages.CUSTOMER_SUPPORT_TASK);

    const exportExcel = (event) => {
        event.preventDefault();
        toggleLoader(true);

        const params = {
            currencyIdList: selectedCurrency,
            supportTask: selectedSupportTask.value,
            ...Site.getLrfSubsidiary(loadedData.IsSelfMode),
        };

        DataService.getReportFile(ExportUrl, params)
            .then((response) => {
                toggleLoader(false);
                const NoContentStatusCode = 204;
                if (response.status === NoContentStatusCode) {
                    alert(LangHelper.getSingleResource('NoInfo'));
                } else {
                    Site.downloadFile(response.data, ExportFileName);
                }
            })
            .catch((error) => {
                alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
                toggleLoader(false);
            });
    };

    return (
        <CollapsiblePanel className="light-shadow" isCollapseMode={false}>
            <div className="row">
                <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('Currency')}</label>
                        <MultipleSelect
                            id="ddlCurrency"
                            language={LangHelper.currentLanguage}
                            dataSource={currencies}
                            keyField={'key'}
                            valueField={'value'}
                            statusField={'status'}
                            onChange={(_, selectedItemsKey) => setSelectedCurrency(selectedItemsKey)}
                        />
                    </div>
                </div>
                <div className="col-12 col-md-5 col-sm-3 col-lg-4 col-xl-3">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('SupportTask')}</label>
                        <ReportSelect
                            instanceId="Support-Task"
                            isSearchable={false}
                            value={selectedSupportTask}
                            options={SupportTaskOptions}
                            onChange={(item) => setSelectedSupportTask(item)}
                        />
                    </div>
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <div className="button-group">
                            <SubmitButton disabled={!selectedCurrency} onClick={exportExcel} label={pages.CUSTOMER_SUPPORT_TASK}>
                                {LangHelper.getSingleResource('ExportToExcel')}
                            </SubmitButton>
                        </div>
                    </div>
                </div>
            </div>
        </CollapsiblePanel>
    );
};

function mapStateToProps(state) {
    const { formData, selectedCurrency, selectedSupportTask } = state;
    return Object.assign({}, { formData, selectedCurrency, selectedSupportTask });
}

function mapDispatchToProps(dispatch) {
    const { setSelectedCurrency, setSelectedSupportTask, toggleLoader } = ActionCreators;

    return bindActionCreators(Object.assign({}, { setSelectedCurrency, setSelectedSupportTask, toggleLoader }), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);
