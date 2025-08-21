import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'

jest.mock('@legion-lib/react-grid', () => ({
  Row: ({ children }) => <div data-testid="row">{children}</div>,
  Cell: ({ children, className }) => <div data-testid="cell" className={className}>{children}</div>
}))

jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))

jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/AlertRule/customGrid/ActionCell', () => (p) => (
  <div>
    {p.onEditClick && <button data-testid="edit" onClick={p.onEditClick}>edit</button>}
    {p.onSaveClick && <button data-testid="save" onClick={p.onSaveClick}>save</button>}
    {p.onCloseClick && <button data-testid="close" onClick={p.onCloseClick}>close</button>}
  </div>
))

jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/AlertRule/customGrid/InputCell', () => (p) => (
  <input data-testid={`input-${p.fieldKey}`} defaultValue={p.value} onChange={e => p.onChange(p.fieldKey, e.target.value)} />
))

jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/AlertRule/customGrid/DropdownCell', () => (p) => (
  <select data-testid={`select-${p.fieldKey}`} value={p.value} onChange={e => p.onChange(p.fieldKey, e.target.value)}>
    {(p.dataSource || []).map(o => <option key={o.key} value={o.value}>{o.displayValue || o.value}</option>)}
  </select>
))

jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/lib/service', () => ({
  handleCellChangeValue: (setItem, key, value) => setItem(prev => ({ ...prev, [key]: value })),
  closeAlert: jest.fn(),
  buildAlertOptionForMissingFields: jest.fn(() => ({})),
  validateAlertRuleItem: jest.fn(() => true),
  buildConfirmAlertOption: jest.fn(() => ({})),
  updateAlertRule: jest.fn(() => Promise.resolve()),
  deleteAlertRule: jest.fn(() => Promise.resolve())
}))

jest.mock('@/lib/numberFormat', () => ({ __esModule: true, default: { formatDecimal: (n) => `${n}` } }))

jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/actions', () => ({ __esModule: true, default: { setSweetAlertOption: v => ({ type: 'x', v }) } }))

import DataRow from '@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/AlertRule/gridBuilder/DataRow'

const dummyStore = { getState: () => ({}), subscribe: () => () => {}, dispatch: () => {} }
const baseCurrencyList = [{ key: 'USD', value: 'USD' }]
const notifyEverys = [{ key: 5, value: 5, displayValue: '5m' }]

describe('AlertRule DataRow', () => {
  const item = {
    settingName: 'Rule A',
    baseCurrency: 'USD',
    conditionTypeName: 'Cond',
    notificationInterval: 5,
    alertRule: { negativeProfit: 10, betRatio: 20 }
  }

  test('renders read-only cells initially', () => {
    render(<Provider store={dummyStore}><DataRow item={item} baseCurrencyList={baseCurrencyList} defaultBaseCurrency={'USD'} onDataChanged={jest.fn()} /></Provider>)
    expect(screen.getAllByTestId('cell').length).toBeGreaterThan(0)
    expect(screen.getByText('Rule A')).toBeInTheDocument()
  })

  test('switches to edit mode on edit click', () => {
    render(<Provider store={dummyStore}><DataRow item={item} baseCurrencyList={baseCurrencyList} defaultBaseCurrency={'USD'} onDataChanged={jest.fn()} /></Provider>)
    fireEvent.click(screen.getByTestId('edit'))
    expect(screen.getByTestId('input-settingName')).toBeInTheDocument()
    expect(screen.getByTestId('select-baseCurrency')).toBeInTheDocument()
  })
})


