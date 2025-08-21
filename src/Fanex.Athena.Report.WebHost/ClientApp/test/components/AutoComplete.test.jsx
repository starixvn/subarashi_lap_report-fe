import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import axios from 'axios'
import AutoComplete from '@/components/auto-complete/AutoComplete'

// Mock axios
jest.mock('axios')
const mockedAxios = axios

// Mock Timer helper
jest.mock('@/helpers/timer', () => ({
	debounce: (fn, delay) => {
		// Return a mock debounced function that calls the original immediately for testing
		return function(...args) {
			return fn.apply(this, args)
		}
	}
}))

// Mock other components
jest.mock('@/components/auto-complete/SuggestionList', () => {
	return function MockSuggestionList({ dataList, onSelect, selectedIndex }) {
		return (
			<div data-testid="suggestion-list">
				{dataList?.map((item, index) => (
					<div 
						key={index}
						data-testid={`suggestion-${index}`}
						className={selectedIndex === index ? 'selected' : ''}
						onClick={() => onSelect(item)}
					>
						{typeof item === 'object' ? item.value : item}
					</div>
				))}
			</div>
		)
	}
})

jest.mock('@/components/Overlay', () => {
	return function MockOverlay({ children, onClose }) {
		return (
			<div data-testid="overlay" onClick={onClose}>
				{children}
			</div>
		)
	}
})

describe('AutoComplete', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		// Mock successful axios response
		mockedAxios.get.mockResolvedValue({
			data: {
				suggestions: ['suggestion1', 'suggestion2', 'suggestion3']
			}
		})
	})

	test('renders input field', () => {
		render(<AutoComplete />)
		
		const input = screen.getByRole('textbox')
		expect(input).toBeInTheDocument()
		expect(input).toHaveClass('input-text')
	})

	test('applies htmlAttributes to input', () => {
		const htmlAttributes = {
			placeholder: 'Search...',
			'data-testid': 'autocomplete-input'
		}
		
		render(<AutoComplete htmlAttributes={htmlAttributes} />)
		
		const input = screen.getByRole('textbox')
		expect(input).toHaveAttribute('placeholder', 'Search...')
		expect(input).toHaveAttribute('data-testid', 'autocomplete-input')
	})

	test('calls onInput when typing', async () => {
		const mockOnInput = jest.fn()
		render(<AutoComplete onInput={mockOnInput} />)
		
		const input = screen.getByRole('textbox')
		fireEvent.change(input, { target: { value: 'test' } })
		
		await waitFor(() => {
			expect(mockOnInput).toHaveBeenCalledWith('test')
		})
	})

	test('does not fetch suggestions for input less than 3 characters', async () => {
		render(<AutoComplete url="/api/search" />)
		
		const input = screen.getByRole('textbox')
		fireEvent.change(input, { target: { value: 'te' } })
		
		await waitFor(() => {
			expect(mockedAxios.get).not.toHaveBeenCalled()
		})
	})

	test('fetches suggestions for input with 3 or more characters', async () => {
		render(<AutoComplete url="/api/search" />)
		
		const input = screen.getByRole('textbox')
		fireEvent.change(input, { target: { value: 'test' } })
		
		await waitFor(() => {
			expect(mockedAxios.get).toHaveBeenCalledWith(
				'/api/search?query=test',
				{ headers: { 'X-Requested-With': 'XMLHttpRequest' } }
			)
		})
	})

	test('uses custom query parameter name', async () => {
		render(<AutoComplete url="/api/search" queryParamName="search" />)
		
		const input = screen.getByRole('textbox')
		fireEvent.change(input, { target: { value: 'test' } })
		
		await waitFor(() => {
			expect(mockedAxios.get).toHaveBeenCalledWith(
				'/api/search?search=test',
				{ headers: { 'X-Requested-With': 'XMLHttpRequest' } }
			)
		})
	})

	test('displays suggestion list when suggestions are available', async () => {
		render(<AutoComplete url="/api/search" />)
		
		const input = screen.getByRole('textbox')
		fireEvent.change(input, { target: { value: 'test' } })
		
		await waitFor(() => {
			expect(screen.getByTestId('suggestion-list')).toBeInTheDocument()
			expect(screen.getByTestId('suggestion-0')).toHaveTextContent('suggestion1')
			expect(screen.getByTestId('suggestion-1')).toHaveTextContent('suggestion2')
			expect(screen.getByTestId('suggestion-2')).toHaveTextContent('suggestion3')
		})
	})

	test('handles keyboard navigation - down arrow', async () => {
		render(<AutoComplete url="/api/search" />)
		
		const input = screen.getByRole('textbox')
		fireEvent.change(input, { target: { value: 'test' } })
		
		await waitFor(() => {
			expect(screen.getByTestId('suggestion-list')).toBeInTheDocument()
		})
		
		// Press down arrow
		fireEvent.keyDown(input, { keyCode: 40 })
		
		const selectedSuggestion = screen.getByTestId('suggestion-0')
		expect(selectedSuggestion).toHaveClass('selected')
	})

	test('handles keyboard navigation - up arrow', async () => {
		render(<AutoComplete url="/api/search" />)
		
		const input = screen.getByRole('textbox')
		fireEvent.change(input, { target: { value: 'test' } })
		
		await waitFor(() => {
			expect(screen.getByTestId('suggestion-list')).toBeInTheDocument()
		})
		
		// Move down first, then up
		fireEvent.keyDown(input, { keyCode: 40 }) // Down
		fireEvent.keyDown(input, { keyCode: 40 }) // Down again
		fireEvent.keyDown(input, { keyCode: 38 }) // Up
		
		const selectedSuggestion = screen.getByTestId('suggestion-0')
		expect(selectedSuggestion).toHaveClass('selected')
	})

	test('handles keyboard navigation - enter key selection', async () => {
		const mockOnSelect = jest.fn()
		render(<AutoComplete url="/api/search" onSelect={mockOnSelect} />)
		
		const input = screen.getByRole('textbox')
		fireEvent.change(input, { target: { value: 'test' } })
		
		await waitFor(() => {
			expect(screen.getByTestId('suggestion-list')).toBeInTheDocument()
		})
		
		// Select first item with down arrow and enter
		fireEvent.keyDown(input, { keyCode: 40 }) // Down
		fireEvent.keyDown(input, { keyCode: 13 }) // Enter
		
		expect(mockOnSelect).toHaveBeenCalledWith('suggestion1')
		expect(input.value).toBe('suggestion1')
	})

	test('handles mouse click selection', async () => {
		const mockOnSelect = jest.fn()
		render(<AutoComplete url="/api/search" onSelect={mockOnSelect} />)
		
		const input = screen.getByRole('textbox')
		fireEvent.change(input, { target: { value: 'test' } })
		
		await waitFor(() => {
			expect(screen.getByTestId('suggestion-list')).toBeInTheDocument()
		})
		
		fireEvent.click(screen.getByTestId('suggestion-1'))
		
		expect(mockOnSelect).toHaveBeenCalledWith('suggestion2')
		expect(input.value).toBe('suggestion2')
	})

	test('handles object suggestions with value property', async () => {
		const objectSuggestions = [
			{ value: 'Item 1', id: 1 },
			{ value: 'Item 2', id: 2 }
		]
		
		mockedAxios.get.mockResolvedValue({
			data: { suggestions: objectSuggestions }
		})
		
		const mockOnSelect = jest.fn()
		render(<AutoComplete url="/api/search" onSelect={mockOnSelect} />)
		
		const input = screen.getByRole('textbox')
		fireEvent.change(input, { target: { value: 'test' } })
		
		await waitFor(() => {
			expect(screen.getByTestId('suggestion-list')).toBeInTheDocument()
		})
		
		fireEvent.click(screen.getByTestId('suggestion-0'))
		
		expect(mockOnSelect).toHaveBeenCalledWith({ value: 'Item 1', id: 1 })
		expect(input.value).toBe('Item 1')
	})

	test('uses custom response data field', async () => {
		mockedAxios.get.mockResolvedValue({
			data: {
				results: ['custom1', 'custom2']
			}
		})
		
		render(<AutoComplete url="/api/search" responseDataField="results" />)
		
		const input = screen.getByRole('textbox')
		fireEvent.change(input, { target: { value: 'test' } })
		
		await waitFor(() => {
			expect(screen.getByTestId('suggestion-list')).toBeInTheDocument()
			expect(screen.getByTestId('suggestion-0')).toHaveTextContent('custom1')
			expect(screen.getByTestId('suggestion-1')).toHaveTextContent('custom2')
		})
	})

	test('hides suggestions when clicking outside', async () => {
		render(<AutoComplete url="/api/search" />)
		
		const input = screen.getByRole('textbox')
		fireEvent.change(input, { target: { value: 'test' } })
		
		await waitFor(() => {
			expect(screen.getByTestId('suggestion-list')).toBeInTheDocument()
		})
		
		// Click outside
		fireEvent.mouseDown(document.body)
		
		expect(screen.queryByTestId('suggestion-list')).not.toBeInTheDocument()
	})

	test('caches suggestions when cache is enabled', async () => {
		render(<AutoComplete url="/api/search" cache={true} />)
		
		const input = screen.getByRole('textbox')
		
		// First search
		fireEvent.change(input, { target: { value: 'test' } })
		
		await waitFor(() => {
			expect(mockedAxios.get).toHaveBeenCalledTimes(1)
		})
		
		// Clear and search again with same term
		fireEvent.change(input, { target: { value: '' } })
		fireEvent.change(input, { target: { value: 'test' } })
		
		// Should not make another API call due to caching
		await waitFor(() => {
			expect(mockedAxios.get).toHaveBeenCalledTimes(1)
		})
	})

	test('does not cache when cache is disabled', async () => {
		render(<AutoComplete url="/api/search" cache={false} />)
		
		const input = screen.getByRole('textbox')
		
		// First search
		fireEvent.change(input, { target: { value: 'test' } })
		
		await waitFor(() => {
			expect(mockedAxios.get).toHaveBeenCalledTimes(1)
		})
		
		// Clear and search again with same term
		fireEvent.change(input, { target: { value: '' } })
		fireEvent.change(input, { target: { value: 'test' } })
		
		// Should make another API call since caching is disabled
		await waitFor(() => {
			expect(mockedAxios.get).toHaveBeenCalledTimes(2)
		})
	})

	test('does not display suggestions when no data returned', async () => {
		mockedAxios.get.mockResolvedValue({
			data: { suggestions: [] }
		})
		
		render(<AutoComplete url="/api/search" />)
		
		const input = screen.getByRole('textbox')
		fireEvent.change(input, { target: { value: 'test' } })
		
		await waitFor(() => {
			expect(screen.queryByTestId('suggestion-list')).not.toBeInTheDocument()
		})
	})
})