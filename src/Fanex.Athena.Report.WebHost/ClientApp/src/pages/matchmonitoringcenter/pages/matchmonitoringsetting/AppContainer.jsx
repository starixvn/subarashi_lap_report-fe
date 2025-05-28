import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from './actions';
import TabMenu from '@/components/TabMenu';
import { tabMenuList, preLoadComponents } from './lib/constants';

const AppContainer = ({ selectedTabKey, setSelectedTab }) => {
    useEffect(() => {
        preLoadComponents(tabMenuList);
    }, []);

    const onClickTabMenu = (tabKey) => {
        setSelectedTab && setSelectedTab(tabKey);
    };

    const selectedTab = tabMenuList.find((_) => _.key === selectedTabKey);
    const Component = selectedTab?.component;

    return (
        <div id="monitor-detail">
            <TabMenu selectedTabMenu={selectedTabKey} onClickTabMenu={onClickTabMenu} tabMenuList={tabMenuList} />
            {Component && (
                <Suspense fallback={<div>Loading tab component...</div>}>
                    <Component selectedTabKey={selectedTabKey} />
                </Suspense>
            )}
            {!Component && <div>No component found for tab: {selectedTabKey}</div>}
        </div>
    );
};

function mapStateToProps(state) {
    const { selectedTabKey, monitoringID } = state;
    return Object.assign({}, { selectedTabKey, monitoringID });
}

function mapDispatchToProps(dispatch) {
    const { setSelectedTab } = ActionCreators;
    return bindActionCreators({ setSelectedTab }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
