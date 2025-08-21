import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@/components/CollapsiblePanel', () => (p) => <div data-testid="panel">{p.children}</div>)
jest.mock('@/hooks/useBaseCurrencyForMultiSelectCurrency', () => () => ({ baseCurrencyList: [], selectedBaseCurrency: null }))
jest.mock('@/pages/winlossanalysis/components/hooks/useFilterHandler.jsx', () => ({ useFilterHandler: () => ({
  onSubsidiaryDropDownChangeHandler: jest.fn(),
  onDateRangeChangeHandler: jest.fn(),
  onProductChangeHandler: jest.fn(),
  onSportChangeHandler: jest.fn(),
  onBetTypeChangeHandler: jest.fn(),
  onPlatformChangeHandler: jest.fn(),
  onStatusChangeHandler: jest.fn(),
  onLiveStatusChangeHandler: jest.fn(),
  onBaseCurrencyChangeHandler: jest.fn(),
  onVipOnlyChangeHandler: jest.fn(),
  onRiskLevelChangeHandler: jest.fn(),
  onOddsGroupChangeHandler: jest.fn(),
  onSearchModeChangeHandler: jest.fn(),
  onUserNameInputHandler: jest.fn(),
  onGroupInOriginalCurrencyChangeHandler: jest.fn(),
  onExcludeTextDataChangeHandler: jest.fn(),
  onCashOutModeChangeHandler: jest.fn(),
  onSubsidiaryCheckBoxChangeHandler: jest.fn(),
  onCurrencyChangeHandler: jest.fn(),
}) }))
jest.mock('@/pages/winlossanalysis/components/hooks/useIsDisabledGroupInOriginalCurrency.jsx', () => () => false)
jest.mock('@/hooks/useSubsidiarySearch', () => () => ({ isShowSubsidiaryDropdown: false, isSubsidiarySearch: false, isShowSubsidiarySearchCheckBox: false }))
jest.mock('@/pages/winlossanalysis/components/filters/DateRangeFilter.jsx', () => () => <div data-testid="date-range" />)
jest.mock('@/pages/winlossanalysis/components/filters/ProductFilter.jsx', () => () => <div data-testid="product" />)
jest.mock('@/pages/winlossanalysis/components/filters/SportFilter.jsx', () => () => <div data-testid="sport" />)
jest.mock('@/pages/winlossanalysis/components/filters/BetTypeFilter.jsx', () => () => <div data-testid="bettype" />)
jest.mock('@/pages/winlossanalysis/components/filters/PlatformFilter.jsx', () => () => <div data-testid="platform" />)
jest.mock('@/pages/winlossanalysis/components/filters/StatusFilter.jsx', () => () => <div data-testid="status" />)
jest.mock('@/pages/winlossanalysis/components/filters/LiveStatusFilter.jsx', () => () => <div data-testid="livestatus" />)
jest.mock('@/pages/winlossanalysis/components/filters/BaseCurrencyFilter.jsx', () => () => <div data-testid="basecurrency" />)
jest.mock('@/pages/winlossanalysis/components/filters/VipOnlyFilter.jsx', () => () => <div data-testid="viponly" />)
jest.mock('@/pages/winlossanalysis/components/filters/RiskLevelFilter.jsx', () => () => <div data-testid="risk" />)
jest.mock('@/pages/winlossanalysis/components/filters/OddsGroupFilter.jsx', () => () => <div data-testid="odds" />)
jest.mock('@/pages/winlossanalysis/components/filters/UserNameFilter.jsx', () => () => <div data-testid="user" />)
jest.mock('@/pages/winlossanalysis/components/filters/GroupInOriginalCurrencyCheckBoxFilter.jsx', () => () => <div data-testid="grouporiginal" />)
jest.mock('@/pages/winlossanalysis/components/filters/ExcludeTestDataCheckBoxFilter.jsx', () => () => <div data-testid="exclude" />)
jest.mock('@/pages/winlossanalysis/components/filters/SubsidiaryCheckBoxFilter.jsx', () => () => <div data-testid="subsidiary-check" />)
jest.mock('@/pages/winlossanalysis/components/filters/CurrencyFilter.jsx', () => () => <div data-testid="currency" />)
jest.mock('@/pages/winlossanalysis/components/filters/SubsidiaryDropDownFilter.jsx', () => () => <div data-testid="subsidiary-drop" />)
jest.mock('@/pages/winlossanalysis/common/Service.js', () => ({ __esModule: true, default: { isContainProductSportBook: () => false } }))

import Comp from '@/pages/winlossanalysis/components/mobile/MobileMainFilter'

const initState = {
  appUuid: 'u',
  selectedProduct: null,
  selectedSport: null,
  sportList: [],
  selectedBettype: null,
  bettypeList: [],
  selectedPlatform: null,
  selectedStatus: null,
  selectedLiveStatus: null,
  selectedBaseCurrency: null,
  selectedVipOnly: null,
  selectedCustomerClass: null,
  selectedOddsGroup: null,
  searchMode: 0,
  isGroupInOriginalCurrency: false,
  isExcludeTestData: false,
  selectedCashOutMode: null,
  selectedCurrency: null,
  formData: { isOfferCashOutProduct: false, isHasPermissionViewVip: false },
}

test('MobileMainFilter renders core filters', () => {
  const store = createStore(s => s, initState)
  render(<Provider store={store}><Comp /></Provider>)
  expect(screen.getByTestId('date-range')).toBeInTheDocument()
  expect(screen.getByTestId('product')).toBeInTheDocument()
  expect(screen.getByTestId('currency')).toBeInTheDocument()
  expect(screen.getByTestId('risk')).toBeInTheDocument()
})


