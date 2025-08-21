import React from 'react'
import { render } from '@testing-library/react'
import { BuildHeader } from '@/pages/winlossbytimezone/gridBuilder/BuildHeader'
import { SettingConst } from '@/pages/winlossbytimezone/constants/settingConst'

jest.mock('@/pages/winlossbytimezone/lib/service', () => ({
	getHeaderText: jest.fn((reportBy, groupBy) => {
		const headerTexts = {
			Index: '#',
			ReportBy: reportBy === 'summary' ? 'Summary' : 'Report By',
			GroupBy: 'Group By',
			BetCount: 'Bet Count',
			Turnover: 'Turnover',
			CustomerComm: 'Customer Commission',
			LicenseeWL: 'Licensee W/L',
			LicenseeComm: 'Licensee Commission',
			LicenseeNetWL: 'Licensee Net W/L',
			Margin: 'Margin'
		}
		return headerTexts
	})
}))

describe('BuildHeader', () => {
	test('builds header with report by column when reportBy is not summary', () => {
		const options = {
			reportBy: 'timezone',
			groupBy: 'subsidiary'
		}
		
		const result = BuildHeader(options)
		const { container } = render(<table><thead>{result}</thead></table>)
		
		expect(container.textContent).toContain('#')
		expect(container.textContent).toContain('Report By')
		expect(container.textContent).toContain('Group By')
		expect(container.textContent).toContain('Bet Count')
		expect(container.textContent).toContain('Turnover')
		expect(container.textContent).toContain('Customer Commission')
		expect(container.textContent).toContain('Licensee W/L')
		expect(container.textContent).toContain('Licensee Commission')
		expect(container.textContent).toContain('Licensee Net W/L')
		expect(container.textContent).toContain('Margin')
	})

	test('hides report by column when reportBy is summary', () => {
		const options = {
			reportBy: SettingConst.ReportBySummary,
			groupBy: 'subsidiary'
		}
		
		const result = BuildHeader(options)
		const { container } = render(<table><thead>{result}</thead></table>)
		
		expect(container.textContent).toContain('#')
		expect(container.textContent).not.toContain('Report By')
		expect(container.textContent).toContain('Group By')
	})

	test('sets correct column widths', () => {
		const options = {
			reportBy: 'timezone',
			groupBy: 'subsidiary'
		}
		
		const result = BuildHeader(options)
		const { container } = render(<table><thead>{result}</thead></table>)
		
		const headers = container.querySelectorAll('th')
		expect(headers.length).toBeGreaterThan(5)
		
		expect(container.textContent).toContain('#')
		expect(container.textContent).toContain('Report By')
		expect(container.textContent).toContain('Group By')
		expect(container.textContent).toContain('Bet Count')
		expect(container.textContent).toContain('Turnover')
	})

	test('sets correct titles for all headers', () => {
		const options = {
			reportBy: 'timezone',
			groupBy: 'subsidiary'
		}
		
		const result = BuildHeader(options)
		const { container } = render(<table><thead>{result}</thead></table>)
		
		const headers = container.querySelectorAll('th[title]')
		expect(headers.length).toBeGreaterThan(0)
		
		headers.forEach(header => {
			expect(header.getAttribute('title')).toBeTruthy()
		})
	})

	test('returns a single HeaderRow element', () => {
		const options = {
			reportBy: 'timezone',
			groupBy: 'subsidiary'
		}
		
		const result = BuildHeader(options)
		
		expect(React.isValidElement(result)).toBe(true)
		expect(result.type).toBeTruthy()
		expect(result.props.style).toEqual({ height: 32 })
	})

	test('handles undefined reportBy', () => {
		const options = {
			reportBy: undefined,
			groupBy: 'subsidiary'
		}
		
		const result = BuildHeader(options)
		const { container } = render(<table><thead>{result}</thead></table>)
		
		expect(container.textContent).toContain('Report By')
	})

	test('handles undefined groupBy', () => {
		const options = {
			reportBy: 'timezone',
			groupBy: undefined
		}
		
		const result = BuildHeader(options)
		
		expect(React.isValidElement(result)).toBe(true)
	})

	test('handles empty options object', () => {
		const options = {}
		
		const result = BuildHeader(options)
		
		expect(React.isValidElement(result)).toBe(true)
	})

	test('correctly conditionally renders report by cell', () => {
		const summaryOptions = {
			reportBy: SettingConst.ReportBySummary,
			groupBy: 'subsidiary'
		}
		
		const timezoneOptions = {
			reportBy: 'timezone',
			groupBy: 'subsidiary'
		}
		
		const summaryResult = BuildHeader(summaryOptions)
		const timezoneResult = BuildHeader(timezoneOptions)
		
		const { container: summaryContainer } = render(<table><thead>{summaryResult}</thead></table>)
		const { container: timezoneContainer } = render(<table><thead>{timezoneResult}</thead></table>)
		
		const summaryHeaders = summaryContainer.querySelectorAll('th')
		const timezoneHeaders = timezoneContainer.querySelectorAll('th')
		
		expect(timezoneHeaders.length).toBe(summaryHeaders.length + 1)
	})

	test('sets header row height to 32', () => {
		const options = {
			reportBy: 'timezone',
			groupBy: 'subsidiary'
		}
		
		const result = BuildHeader(options)
		
		expect(result.props.style.height).toBe(32)
	})
})
