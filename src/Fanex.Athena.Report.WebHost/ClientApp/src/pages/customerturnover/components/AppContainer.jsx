import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '@/components/Loader';
import useToggleRequest from '@/hooks/useToggleRequest';
import DataService from '@/lib/dataService';

import ActionCreators from '../actions/index';
import FormFilter from './FormFilter';
import Service, { constants } from '../common';
import DataGrid from './DataGrid';

export const AppContainer = () => {
    const dispatch = useDispatch();
    const formData = useSelector(state => state.formData);
    const isLoading = useSelector(state => state.isLoading);

    const { sendRequest } = useToggleRequest();

    const { setFormData, setSelectedCurrency } = ActionCreators;

    const setInitFormData = async result => {
        if (!result || !result.data) {
            dispatch(setFormData(null));
            return;
        }
        const data = result.data;

        data.currencyList = data.currencyList.map(item => ({ value: item.key, label: item.value }));
        data.productTreeViewOptions = Service.convertToCheckedItems(data.productOptions);
        data.productHasNoSport = data.productTreeViewOptions.filter(product => !product.children?.length).map(product => product.id);
        if (!data.productHasNoSport) {
            data.productHasNoSport = [];
        }

        dispatch(setSelectedCurrency(data.currencyList[0]));
        dispatch(setFormData(data));
    };

    useEffect(() => {
        sendRequest(() => DataService.postReportData(constants.ApiUrl.INIT_FORM_URL), setInitFormData);
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
