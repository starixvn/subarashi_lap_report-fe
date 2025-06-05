import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TabMenu from '@/components/TabMenu';
import { tabKeys, tabMenuList, preLoadComponents } from './lib/constants';
import DataService from '@/lib/dataService';
import { ApiUrl } from './lib/constants';
import { setSelectedTab, setTabKeys } from '@/actions/tabHandlerAction';
import { INVALID_REQUEST_URL } from '@/constants/config';
import Site from '@/lib/site';
import Loader from '@/components/Loader';
import useToggleRequest from '@/hooks/useToggleRequest';

const AppContainer = () => {
    const dispatch = useDispatch();
    const selectedTabKey = useSelector(state => state.selectedTabKey);
    const availableTabKeys = useSelector(state => state.tabKeys || []);
    const isLoading = useSelector(state => state.isLoading);
    const { sendRequest } = useToggleRequest();

    useEffect(() => {
        sendRequest(() => DataService.getReportData(ApiUrl.SETTING_INDEX_URL), (response) => {
            if (response && response.data && response.data.tabKeys && response.data.tabKeys.length > 0) {
                const filteredTabKeys = response.data.tabKeys.filter(key =>
                    Object.values(tabKeys).includes(key)
                );

                if (filteredTabKeys.length === 0) {
                    Site.assignToUrl(INVALID_REQUEST_URL);
                    return;
                }

                dispatch(setTabKeys(filteredTabKeys));
                if (!selectedTabKey && filteredTabKeys.length > 0) {
                    dispatch(setSelectedTab(filteredTabKeys[0]));
                }
            } else {
                Site.assignToUrl(INVALID_REQUEST_URL);
            }
        });
    }, [dispatch, selectedTabKey]);

    useEffect(() => {
        preLoadComponents(tabMenuList);
    }, []);

    const onClickTabMenu = (tabKey) => {
        dispatch(setSelectedTab(tabKey));
    };

    const filteredTabMenuList = tabMenuList.filter(tab =>
        availableTabKeys.includes(tab.key)
    );

    const selectedTab = filteredTabMenuList.find((_) => _.key === selectedTabKey);
    const Component = selectedTab?.component;

    return (
        <div id="monitor-detail">
            <Loader isLoading={isLoading} />
            <TabMenu selectedTabMenu={selectedTabKey} onClickTabMenu={onClickTabMenu} tabMenuList={filteredTabMenuList} />
            {Component && (
                <Suspense fallback={<div>Loading tab component...</div>}>
                    <Component selectedTabKey={selectedTabKey} />
                </Suspense>
            )}
        </div>
    );
};

export default AppContainer;
