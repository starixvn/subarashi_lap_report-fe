import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/AlertRule/gridBuilder/DataRow', () => p => <div data-testid="data-row" />)
jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/AlertRule/gridBuilder/NewRuleRow', () => p => <div data-testid="new-row" />)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))

import { BuildBody, BuildEmptyBody, BuildHeaders } from '@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/AlertRule/gridBuilder/GridBuilder'

describe('AlertRule GridBuilder', () => {
  test('BuildEmptyBody renders no rules message', () => {
    render(<table><tbody>{BuildEmptyBody()}</tbody></table>)
    expect(screen.getByText('NoAlertRulesMsg')).toBeInTheDocument()
  })

  test('BuildHeaders renders all headers', () => {
    render(<table><thead>{BuildHeaders()}</thead></table>)
    expect(screen.getByText('AlertLevelName')).toBeInTheDocument()
    expect(screen.getByText('Amount')).toBeInTheDocument()
    expect(screen.getByText('BaseCurrency')).toBeInTheDocument()
    expect(screen.getByText('And_Or')).toBeInTheDocument()
    expect(screen.getByText('RatioPercent')).toBeInTheDocument()
    expect(screen.getByText('NotifyEvery')).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  test('BuildBody renders rows and new row when addNewRule is true', () => {
    const data = [{ settingID: 1 }]
    const rows = BuildBody({ data, baseCurrencyList: [], addNewRule: true, onDataChanged: jest.fn(), setAddNewRule: jest.fn(), defaultBaseCurrency: 'USD', monitoringID: 'M' })
    render(<table><tbody>{rows}</tbody></table>)
    expect(screen.getByTestId('data-row')).toBeInTheDocument()
    expect(screen.getByTestId('new-row')).toBeInTheDocument()
  })
})


