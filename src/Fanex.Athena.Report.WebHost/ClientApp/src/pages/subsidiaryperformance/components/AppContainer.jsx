import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '@/components/Loader';
import useToggleRequest from '@/hooks/useToggleRequest';
import { SubsidiaryViewType } from '@/constants/report';
import DataService from '@/lib/dataService';

import actions from '../actions';
import { constants } from '../common';
import DataGrid from './DataGrid';
import FormFilter from './FormFilter';

export const AppContainer = (props) => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.formData);
    const isLoading = useSelector((state) => state.isLoading);

    const { sendRequest } = useToggleRequest();

    const { setFormData, setSelectedProducts, setSelectedBaseCurrency, setSelectedSubsidiary, setSelectedWhiteLabel } = actions;

    const setInitFormData = (result) => {
        if (!result || !result.data) {
            dispatch(setFormData(null));
            return;
        }

        const data = result.data;
        data.baseCurrencies = data.baseCurrencies.map((item) => ({ value: item.key, label: item.value }));

        data.baseCurrency = data.baseCurrencies.find((x) => x.label == data.baseCurrency);
        data.baseCurrency = data.baseCurrency ? data.baseCurrency : data.baseCurrencies[0];
        dispatch(setSelectedBaseCurrency(data.baseCurrency));

        let selectedSubsidiary;
        let selectedWhiteLabel;

        if (data.viewType === SubsidiaryViewType.MASTER_MANAGEMENT) {
            selectedSubsidiary = Array.from(new Set(data.subsidiaryList.flatMap((x) => x.children?.map((y) => y.value)))).join(',');
            selectedWhiteLabel = data.subsidiaryList.map((x) => x.value).join(',');
        } else {
            selectedSubsidiary = data.subsidiaryList.map((x) => x.value).join(',');
            selectedWhiteLabel = '';
        }

        dispatch(setSelectedSubsidiary(selectedSubsidiary));
        dispatch(setSelectedWhiteLabel(selectedWhiteLabel));

        dispatch(setSelectedProducts(data.products.map((item) => item.code).join(',')));
        dispatch(setFormData(data));
    };

    useEffect(() => {
        sendRequest(() => DataService.getReportData(constants.ApiUrl.INIT_FORM_URL), setInitFormData);
    }, []);

    return (
        <React.Fragment>
            <Loader isLoading={isLoading} />
            {formData && <FormFilter />}
            <DataGrid />
        </React.Fragment>
    );
};

export default React.memo(AppContainer);
