import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

jest.mock('react-redux', () => ({ useDispatch: jest.fn(() => jest.fn()), useSelector: jest.fn(() => 'MID') }))
jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/AlertRule/customGrid/InputCell', () => p => <input data-testid={`input-${p.fieldKey || 'value'}`} onChange={e => p.onChange(p.fieldKey || 'value', e.target.value)} />)
jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/AlertRule/customGrid/DropdownCell', () => p => <select data-testid={`select-${p.fieldKey}`} onChange={e => p.onChange(p.fieldKey, e.target.value)}><option value="opt">opt</option></select>)
jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/AlertRule/customGrid/ActionCell', () => p => (<div><button data-testid="save" onClick={p.onSaveClick} /><button data-testid="close" onClick={p.onCloseClick} /></div>))
jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/actions', () => ({ __esModule: true, default: { setSweetAlertOption: v => ({ type: 'SET_ALERT', v }) } }))
jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/lib/textHelper', () => ({ buildConfirmMessage: () => 'msg' }))
jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/lib/service', () => ({
  handleCellChangeValue: (setFn, key, value) => setFn(prev => ({ ...prev, [key]: value, alertRule: { ...prev.alertRule, [key]: value } })),
  closeAlert: jest.fn(),
  buildAlertOptionForMissingFields: jest.fn(() => ({ kind: 'missing' })),
  validateAlertRuleItem: jest.fn(() => false),
  buildConfirmAlertOption: jest.fn(() => ({ kind: 'confirm' })),
  createAlertRule: jest.fn(() => Promise.resolve())
}))
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))

import * as service from '@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/lib/service'
import NewRuleRow from '@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/AlertRule/gridBuilder/NewRuleRow'

describe('NewRuleRow', () => {
  test('shows alert when invalid and confirm when valid, close cancels add', async () => {
    const onDataChanged = jest.fn()
    const setAddNewRule = jest.fn()
    render(<table><tbody><NewRuleRow baseCurrencyList={[{ value: 'USD', label: 'USD' }]} defaultBaseCurrency={'USD'} setAddNewRule={setAddNewRule} onDataChanged={onDataChanged} monitoringID={'M'} /></tbody></table>)
    fireEvent.click(screen.getByTestId('save'))
    expect(service.validateAlertRuleItem).toHaveBeenCalled()
    expect(setAddNewRule).not.toHaveBeenCalledWith(false)
    service.validateAlertRuleItem.mockReturnValueOnce(true)
    fireEvent.click(screen.getByTestId('save'))
    expect(service.buildConfirmAlertOption).toHaveBeenCalled()
    fireEvent.click(screen.getByTestId('close'))
    expect(setAddNewRule).toHaveBeenCalledWith(false)
  })
})


