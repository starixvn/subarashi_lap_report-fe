import * as types from '@/actions/types'
import { setSelectedBaseCurrency, setBaseCurrencyList } from '@/actions/baseCurrencyAction'
import { setSelectedBettype, setBettypeList, setOrginalBetTypeList } from '@/actions/bettypeAction'
import { changeIsConvertAll } from '@/actions/convertAllAction'
import { setSelectedCurrency } from '@/actions/currencyAction'
import { setSelectedCustomerClass, setSelectedRiskLevel } from '@/actions/customerClassAction'
import { setSelectedDate } from '@/actions/dateAction'
import { setDateRange } from '@/actions/dateRangeAction'
import { changeIsExcludeTest } from '@/actions/excludeTestAction'
import { setFormData } from '@/actions/formDataAction'
import { setGridData, setSweetAlertOption } from '@/actions/gridDataAction'
import { setSelectedLiveStatus } from '@/actions/liveStatusAction'
import { setSelectedPlatform } from '@/actions/platformAction'
import { setSelectedProducts } from '@/actions/productAction'
import { setReportTitle } from '@/actions/reportTitleAction'
import { setRequestParam } from '@/actions/requestParamAction'
import { setSelectedStatus } from '@/actions/statusAction'
import { setSubsidiaryList, setSubsidiarySearch, setWhiteLabelTreeList } from '@/actions/subsidiaryAction'
import { setSelectedTab, setTabKeys } from '@/actions/tabHandlerAction'
import { setUsername } from '@/actions/usernameAction'

describe('basic action creators', () => {
    test('baseCurrency', () => {
        expect(setSelectedBaseCurrency(1)).toEqual({ type: types.SET_SELECTED_BASECURRENCY, data: 1 })
        expect(setBaseCurrencyList([1,2])).toEqual({ type: types.SET_BASECURRENCY_LIST, data: [1,2] })
    })

    test('bettype', () => {
        expect(setSelectedBettype([1])).toEqual({ type: types.SET_SELECTED_BETTYPE, data: [1] })
        expect(setBettypeList(['a'])).toEqual({ type: types.SET_BETTYPE_LIST, data: ['a'] })
        expect(setOrginalBetTypeList(['x'])).toEqual({ type: types.SET_ORIGINAL_BETTYPE_LIST, data: ['x'] })
    })

    test('convertAll', () => {
        expect(changeIsConvertAll(true)).toEqual({ type: types.CHANGE_IS_CONVERT_ALL, data: true })
    })

    test('currency', () => {
        expect(setSelectedCurrency('USD')).toEqual({ type: types.SET_SELECTED_CURRENCY, data: 'USD' })
    })

    test('customerClass', () => {
        expect(setSelectedCustomerClass('VIP')).toEqual({ type: types.SET_SELECTED_CUSTOMERCLASS, data: 'VIP' })
        expect(setSelectedRiskLevel('H')).toEqual({ type: types.SET_SELECTED_RISKLEVEL, data: 'H' })
    })

    test('date and dateRange', () => {
        expect(setSelectedDate('2023-01-01')).toEqual({ type: types.SET_DATE, data: '2023-01-01' })
        const range = setDateRange({ startDate: 'a', endDate: 'b' })
        expect(range).toEqual({ type: types.SET_DATE_RANGE, data: { fromDate: 'a', toDate: 'b' } })
    })

    test('excludeTest and formData', () => {
        expect(changeIsExcludeTest(true)).toEqual({ type: types.CHANGE_IS_EXCLUDE_TEST, data: true })
        expect(setFormData({ a: 1 })).toEqual({ type: types.SET_FORM_DATA, data: { a: 1 } })
    })

    test('gridData', () => {
        expect(setGridData({ rows: [] })).toEqual({ type: types.SET_GRID_DATA, data: { rows: [] } })
        expect(setSweetAlertOption({ show: true })).toEqual({ type: types.SET_SWEET_ALERT_OPTION, data: { show: true } })
    })

    test('liveStatus/platform/product', () => {
        expect(setSelectedLiveStatus('L')).toEqual({ type: types.SET_SELECTED_LIVESTATUS, data: 'L' })
        expect(setSelectedPlatform('web')).toEqual({ type: types.SET_SELECTED_PLATFORM, data: 'web' })
        expect(setSelectedProducts([1,2])).toEqual({ type: types.SET_SELECTED_PRODUCT, data: [1,2] })
    })

    test('reportTitle/requestParam/status', () => {
        expect(setReportTitle('T')).toEqual({ type: types.SET_REPORT_TITLE, data: 'T' })
        expect(setRequestParam({ k: 'v' })).toEqual({ type: types.SET_REQUEST_PARAM, data: { k: 'v' } })
        expect(setSelectedStatus('S')).toEqual({ type: types.SET_SELECTED_STATUS, data: 'S' })
    })

    test('subsidiary and tab', () => {
        expect(setSubsidiaryList([1])).toEqual({ type: types.SET_SUBSIDIARY_LIST, data: [1] })
        expect(setSubsidiarySearch('key')).toEqual({ type: types.SET_SUBSIDIARY_SEARCH, data: 'key' })
        expect(setWhiteLabelTreeList(['w'])).toEqual({ type: types.SET_WHITELABEL_TREE_LIST, data: ['w'] })
        expect(setSelectedTab('tab1')).toEqual({ type: types.SET_SELECTED_TAB, data: 'tab1' })
        expect(setTabKeys(['a','b'])).toEqual({ type: types.SET_TAB_KEYS, data: ['a','b'] })
    })

    test('username', () => {
        expect(setUsername('john')).toEqual({ type: types.SET_USERNAME, data: 'john' })
    })
})

