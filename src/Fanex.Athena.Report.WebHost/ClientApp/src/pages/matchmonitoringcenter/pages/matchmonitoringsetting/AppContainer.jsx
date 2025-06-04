import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TabMenu from '@/components/TabMenu';
import { tabKeys, tabMenuList, preLoadComponents } from './lib/constants';
import DataService from '@/lib/dataService';
import { ApiUrl } from './lib/constants';
import { setSelectedTab, setTabKeys } from '@/actions/tabHandlerAction';

const AppContainer = () => {
    const dispatch = useDispatch();
    const selectedTabKey = useSelector(state => state.selectedTabKey);
    const availableTabKeys = useSelector(state => state.tabKeys || []);

    const fetchTabData = async () => {
        try {
            const response = await DataService.getReportData(ApiUrl.SETTING_INDEX_URL);
            if (response && response.data && response.data.tabKeys && response.data.tabKeys.length > 0) {
                const filteredTabKeys = response.data.tabKeys.filter(key =>
                    Object.values(tabKeys).includes(key)
                );

                dispatch(setTabKeys(filteredTabKeys));
                if (!selectedTabKey && filteredTabKeys.length > 0) {
                    dispatch(setSelectedTab(filteredTabKeys[0]));
                }
            }
        } catch (error) {
            console.error('Error fetching tab data:', error);
        }
    };

    useEffect(() => {
        fetchTabData();
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
            <TabMenu selectedTabMenu={selectedTabKey} onClickTabMenu={onClickTabMenu} tabMenuList={filteredTabMenuList} />
            {Component && (
                <Suspense fallback={<div>Loading tab component...</div>}>
                    <Component selectedTabKey={selectedTabKey} />
                </Suspense>
            )}
            {!Component && <div>No component found for tab: {selectedTabKey}</div>}
        </div>
    );
};

export default AppContainer;
