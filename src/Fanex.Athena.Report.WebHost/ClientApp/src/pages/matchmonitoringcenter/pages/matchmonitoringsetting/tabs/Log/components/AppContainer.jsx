import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormFilter from './FormFilter';
import DataGrid from './DataGrid';
import Loader from '@/components/Loader';
import useToggleRequest from '@/hooks/useToggleRequest';
import { ActionCreators } from '../actions';

const AppContainer = () => {
    const dispatch = useDispatch();
    const { sendRequest } = useToggleRequest();

    const loading = useSelector(state => state.loading);

    useEffect(() => {
        sendRequest(() => dispatch(ActionCreators.getInitFormData()));
    }, [dispatch, sendRequest]);

    return (
        <div className="log-container">
            <Loader isLoading={loading} />
            <FormFilter />
            <DataGrid />
        </div>
    );
};

export default AppContainer;