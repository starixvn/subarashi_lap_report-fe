import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useToggleRequest from '@/hooks/useToggleRequest';
import Loader from '@/components/Loader';
import DataService from '@/lib/dataService';

import DataGrid from './DataGrid';
import FormFilter from './FormFilter';
import { constants } from '../common';
import { ActionCreators } from '../actions';

export const AppContainer = (props) => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.isLoading);

    const [searchParams, setSearchParams] = useSearchParams();
    const { sendRequest } = useToggleRequest();
    const { setGridData, setFormData, setRequestParam } = ActionCreators;

    useEffect(() => {
        sendRequest(fetchReportData, setInitData);
    }, []);

    const fetchReportData = async () => {
        const params = Object.fromEntries(searchParams.entries());
        const response = await DataService.getReportData(constants.ApiUrl.INIT_FORM_URL, params);

        dispatch(setRequestParam(params));

        return response.data;
    };

    const setInitData = (result) => {
        if (!result) {
            dispatch(setFormData(null));
            return;
        }
        const { data, ...rest } = result;

        dispatch(setGridData(result.data));
        dispatch(setFormData(rest));
    };

    return (
        <div className="livereport-matchlist">
            <Loader isLoading={isLoading} />
            <FormFilter />
            <DataGrid />
        </div>
    );
};

export default React.memo(AppContainer);
