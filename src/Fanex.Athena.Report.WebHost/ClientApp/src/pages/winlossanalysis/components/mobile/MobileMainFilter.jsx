import React, { useEffect, memo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import CollapsiblePanel from '@srcRoot/components/CollapsiblePanel';
import useBaseCurrencyForMultiSelectCurrency from '@srcRoot/hooks/useBaseCurrencyForMultiSelectCurrency';
import { useFilterHandler } from '../hooks/useFilterHandler.jsx';
import useDisabledGroupInOriginalCurrency from '../hooks/useIsDisabledGroupInOriginalCurrency.jsx';
import SubsidiaryDropDownFilter from '../filters/SubsidiaryDropDownFilter.jsx';
import useSubsidiarySearch from '@srcRoot/hooks/useSubsidiarySearch';
import DateRangeFilter from '../filters/DateRangeFilter.jsx';
import Service from '../../common/Service.js';
import ProductFilter from '../filters/ProductFilter.jsx';
import SportFilter from '../filters/SportFilter.jsx';
import BetTypeFilter from '../filters/BetTypeFilter.jsx';
import PlatformFilter from '../filters/PlatformFilter.jsx';
import StatusFilter from '../filters/StatusFilter.jsx';
import LiveStatusFilter from '../filters/LiveStatusFilter.jsx';
import BaseCurrencyFilter from '../filters/BaseCurrencyFilter.jsx';
import VipOnlyFilter from '../filters/VipOnlyFilter.jsx';
import RiskLevelFilter from '../filters/RiskLevelFilter.jsx';
import OddsGroupFilter from '../filters/OddsGroupFilter.jsx';
import UserNameFilter from '../filters/UserNameFilter.jsx';
import GroupInOriginalCurrencyCheckBoxFilter from '../filters/GroupInOriginalCurrencyCheckBoxFilter.jsx';
import ExcludeTestDataCheckBoxFilter from '../filters/ExcludeTestDataCheckBoxFilter.jsx';
import CashOutModeFilter from '../filters/CashOutModeFilter.jsx';
import SubsidiaryCheckBoxFilter from '../filters/SubsidiaryCheckBoxFilter.jsx';
import CurrencyFilter from '../filters/CurrencyFilter.jsx';
import PropTypes from 'prop-types';
import { DefaultDateRange } from '../../common/dateSetting.js';

export const MobileMainFilter = (props) => {
    const { isCollapsed } = props;
    const {
        appUuid,
        selectedProduct,
        selectedSport,
        sportList,
        selectedBettype,
        bettypeList,
        selectedPlatform,
        selectedStatus,
        selectedLiveStatus,
        selectedBaseCurrency,
        selectedVipOnly,
        selectedCustomerClass,
        selectedOddsGroup,
        searchMode,
        isGroupInOriginalCurrency,
        isExcludeTestData,
        selectedCashOutMode,
        selectedCurrency,
        formData,
    } = useSelector((state) => state, shallowEqual);
    const { isShowSubsidiaryDropdown, isSubsidiarySearch, isShowSubsidiarySearchCheckBox } = useSubsidiarySearch();
    const { baseCurrencyList, selectedBaseCurrency: newBaseCurrency } = useBaseCurrencyForMultiSelectCurrency(selectedBaseCurrency, formData);
    const {
        onSubsidiaryDropDownChangeHandler,
        onDateRangeChangeHandler,
        onProductChangeHandler,
        onSportChangeHandler,
        onBetTypeChangeHandler,
        onPlatformChangeHandler,
        onStatusChangeHandler,
        onLiveStatusChangeHandler,
        onBaseCurrencyChangeHandler,
        onVipOnlyChangeHandler,
        onRiskLevelChangeHandler,
        onOddsGroupChangeHandler,
        onSearchModeChangeHandler,
        onUserNameInputHandler,
        onGroupInOriginalCurrencyChangeHandler,
        onExcludeTextDataChangeHandler,
        onCashOutModeChangeHandler,
        onSubsidiaryCheckBoxChangeHandler,
        onCurrencyChangeHandler,
    } = useFilterHandler();
    const { isOfferCashOutProduct, isHasPermissionViewVip } = formData;
    const isEnableCashOutFilter = Service.isContainProductSportBookOrBa(selectedProduct);
    const isDisabledGroupInOriginalCurrency = useDisabledGroupInOriginalCurrency();

    useEffect(() => {
        onProductChangeHandler(null, selectedProduct);
    }, [appUuid]);
    useEffect(() => {
        onBaseCurrencyChangeHandler(newBaseCurrency);
    }, [newBaseCurrency]);
    useEffect(() => {
        onSubsidiaryCheckBoxChangeHandler(!isShowSubsidiarySearchCheckBox && isShowSubsidiaryDropdown);
    }, []);
    const collapsedStyle = isCollapsed ? { display: 'none' } : {};
    return (
        <CollapsiblePanel isCollapseMode={false}>
            <div className="row">
                {isShowSubsidiaryDropdown && isSubsidiarySearch && (
                    <div className="col-12 col-xs-6 col-md-3" style={collapsedStyle}>
                        <SubsidiaryDropDownFilter key={`subsidiary-${appUuid}`} onChange={onSubsidiaryDropDownChangeHandler} />
                    </div>
                )}

                <div className="col-12 col-xs-6 col-md-3">
                    <DateRangeFilter key={`date-${appUuid}`} onChange={onDateRangeChangeHandler} dateRange={DefaultDateRange} isMobile={true} />
                </div>

                <div className="col-12 col-xs-6 col-md-3">
                    <ProductFilter key={`product-${appUuid}`} onChange={onProductChangeHandler} isValid={!!selectedProduct} value={selectedProduct} />
                </div>

                <div className="col-12 col-xs-6 col-md-3" style={collapsedStyle}>
                    <SportFilter key={`sport-${appUuid}`} onChange={onSportChangeHandler} isValid={!!selectedSport} dataSource={sportList} />
                </div>

                <div className="col-12 col-xs-6 col-md-3" style={collapsedStyle}>
                    <BetTypeFilter key={`bettype-${appUuid}`} onChange={onBetTypeChangeHandler} isValid={!!selectedBettype} dataSource={bettypeList} />
                </div>

                <div className="col-12 col-xs-6 col-md-3" style={collapsedStyle}>
                    <PlatformFilter key={`platform-${appUuid}`} onChange={onPlatformChangeHandler} isValid={!!selectedPlatform} />
                </div>

                <div className="col-12 col-xs-6 col-md-3" style={collapsedStyle}>
                    <StatusFilter key={`status-${appUuid}`} onChange={onStatusChangeHandler} isValid={!!selectedStatus} />
                </div>

                <div className="col-12 col-xs-6 col-md-3" style={collapsedStyle}>
                    <LiveStatusFilter key={`live-status-${appUuid}`} onChange={onLiveStatusChangeHandler} isValid={!!selectedLiveStatus} />
                </div>

                <div className="col-12 col-xs-6 col-md-3">
                    <CurrencyFilter key={`currency-${appUuid}`} isValid={!!selectedCurrency} onChange={onCurrencyChangeHandler} />
                </div>

                <div className="col-12 col-xs-6 col-md-3" style={collapsedStyle}>
                    <BaseCurrencyFilter
                        key={`base-currency-${appUuid}`}
                        onChange={onBaseCurrencyChangeHandler}
                        options={baseCurrencyList}
                        value={selectedBaseCurrency}
                    />
                </div>

                {isHasPermissionViewVip && (
                    <div className="col-12 col-xs-6 col-md-3" style={collapsedStyle}>
                        <VipOnlyFilter key={`vip-only-${appUuid}`} onChange={onVipOnlyChangeHandler} value={selectedVipOnly} />
                    </div>
                )}

                <div className="col-12 col-xs-6 col-md-3">
                    <RiskLevelFilter key={`risk-level-${appUuid}`} onChange={onRiskLevelChangeHandler} isValid={!!selectedCustomerClass} />
                </div>

                <div className="col-12 col-xs-6 col-md-3" style={collapsedStyle}>
                    <OddsGroupFilter key={`odds-group-${appUuid}`} onChange={onOddsGroupChangeHandler} isValid={!!selectedOddsGroup} />
                </div>

                <div className="col-12 col-xs-6 col-md-3">
                    <UserNameFilter
                        key={`username-${appUuid}`}
                        onChangeSearchMode={onSearchModeChangeHandler}
                        onChangeUserName={onUserNameInputHandler}
                        searchMode={searchMode}
                    />
                </div>

                {isOfferCashOutProduct && (
                    <div className="col-12 col-xs-6 col-md-3" style={collapsedStyle}>
                        <CashOutModeFilter onChange={onCashOutModeChangeHandler} disabled={!isEnableCashOutFilter} value={selectedCashOutMode} />
                    </div>
                )}

                <div className="col-12 col-xs-12 col-md-3" style={collapsedStyle}>
                    <GroupInOriginalCurrencyCheckBoxFilter
                        disabled={isDisabledGroupInOriginalCurrency}
                        checked={isGroupInOriginalCurrency}
                        onChange={onGroupInOriginalCurrencyChangeHandler}
                    />
                </div>

                <div className="col-12 col-xs-6 col-md-3" style={collapsedStyle}>
                    <ExcludeTestDataCheckBoxFilter checked={isExcludeTestData} onChange={onExcludeTextDataChangeHandler} />
                </div>

                {isShowSubsidiarySearchCheckBox && (
                    <div className="col-12 col-xs-6 col-md-3" style={collapsedStyle}>
                        <SubsidiaryCheckBoxFilter value={isSubsidiarySearch} onChange={onSubsidiaryCheckBoxChangeHandler} />
                    </div>
                )}
            </div>
        </CollapsiblePanel>
    );
};

const propTypes = {
    isCollapsed: PropTypes.bool,
};
const defaultProps = {
    isCollapsed: true,
};

MobileMainFilter.propTypes = propTypes;
MobileMainFilter.defaultProps = defaultProps;

export default memo(MobileMainFilter);
