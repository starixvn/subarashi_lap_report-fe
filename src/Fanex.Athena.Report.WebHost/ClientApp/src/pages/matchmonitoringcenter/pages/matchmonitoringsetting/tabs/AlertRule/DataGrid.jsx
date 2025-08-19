import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from '@legion-lib/react-grid';

import useToggleRequest from '@/hooks/useToggleRequest';
import DataService from '@/lib/dataService';
import LangHelper from '@/helpers/langHelper';

import { ApiUrl } from '../../lib/constants';
import { BuildBody, BuildHeaders } from './gridBuilder/GridBuilder';
import ActionCreators from '../../actions';
import SubmitButton from '@/components/SubmitButton';

const fetchReportData = async (params, apiUrl) => {
    const response = await DataService.getReportData(apiUrl, params);
    return response.data;
};

function DataGrid() {
    const dispatch = useDispatch();
    const gridData = useSelector(state => state.gridData);
    const addNewRule = useSelector(state => state.addNewRule);
    const monitoringID = useSelector(state => state.monitoringID);
    const [baseCurrencyList, setBaseCurrencyList] = useState(null);
    const [defaultBaseCurrency, setDefaultBaseCurrency] = useState(null);
    const [, setIsLoading] = useState(true);

    const { sendRequest } = useToggleRequest();
    const { setGridData, setAddNewRule } = ActionCreators;

    useEffect(() => {
        if (monitoringID) {
            const params = { monitoringID };
            setIsLoading(true);
            sendRequest(() => fetchReportData(params, ApiUrl.ALERT_RULE_DATA_URL), updateData);
        }
    }, [monitoringID]);

    const updateData = result => {
        setIsLoading(false);
        if (result) {
            dispatch(setGridData(result.dataList || []));
            setBaseCurrencyList(result.baseCurrencyList);
            setDefaultBaseCurrency(result.defaultBaseCurrency);
            return;
        }

        dispatch(setGridData([]));
    };

    const onDataChanged = () => {
        if (monitoringID) {
            const params = { monitoringID };
            setIsLoading(true);
            sendRequest(() => fetchReportData(params, ApiUrl.ALERT_RULE_DATA_URL), updateData);
        }
    };

    const onAddNewRule = event => {
        event.preventDefault();

        const newValue = !addNewRule;
        dispatch(setAddNewRule(newValue));
    };

    const renderAddNewRuleButton = () => (
        <div className="form-group">
            <div className="button-group">
                <SubmitButton onClick={onAddNewRule} disabled={addNewRule}>
                    + {LangHelper.getSingleResource('AddAlertRule').toUpperCase()}
                </SubmitButton>
            </div>
        </div>
    );

    return (
        <>
            <Table
                autoWidth={true}
                autoHeight={true}
                isIncludeScrollWidth={true}
                header={BuildHeaders()}
                body={BuildBody(gridData, baseCurrencyList, addNewRule, onDataChanged, setAddNewRule, defaultBaseCurrency, monitoringID)}
                shouldResetScrollPosition={false}
            />
            {renderAddNewRuleButton()}
        </>
    );
}

export default DataGrid;
