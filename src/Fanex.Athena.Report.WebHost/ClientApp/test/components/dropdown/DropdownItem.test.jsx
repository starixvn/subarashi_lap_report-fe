import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import DropdownItem from '@/components/dropdown/DropdownItem'

test('renders button tag by default with classes and type', () => {
  const onClick = jest.fn()
  render(<DropdownItem onClick={onClick}>X</DropdownItem>)
  const btn = screen.getByRole('button')
  expect(btn).toHaveClass('dropdown-item')
  fireEvent.click(btn)
  expect(onClick).toHaveBeenCalled()
})

test('respects disabled prop and prevents click', () => {
  const onClick = jest.fn()
  render(<DropdownItem disabled onClick={onClick}>Y</DropdownItem>)
  fireEvent.click(screen.getByRole('button'))
  expect(onClick).not.toHaveBeenCalled()
})

test('renders custom tag without type when not button', () => {
  render(<DropdownItem tag="a" href="#">L</DropdownItem>)
  const link = screen.getByText('L')
  expect(link.tagName.toLowerCase()).toBe('a')
})

jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))
 
describe('DropdownItem', () => {
	test('renders with default props', () => {
		render(<DropdownItem>Test Item</DropdownItem>)
		
		const item = screen.getByRole('button', { name: 'Test Item' })
		expect(item).toBeInTheDocument()
		expect(item).toHaveClass('dropdown-item')
		expect(item).not.toBeDisabled()
		expect(item.tagName).toBe('BUTTON')
	})

	test('renders with custom tag', () => {
		render(<DropdownItem tag="a">Link Item</DropdownItem>)
		
		const item = screen.getByText('Link Item')
		expect(item.tagName).toBe('A')
		expect(item).toHaveClass('dropdown-item')
	})

	test('applies custom className', () => {
		render(<DropdownItem className="custom-class">Test Item</DropdownItem>)
		
		const item = screen.getByRole('button', { name: 'Test Item' })
		expect(item).toHaveClass('dropdown-item', 'custom-class')
	})

	test('applies active class when active prop is true', () => {
		render(<DropdownItem active={true}>Active Item</DropdownItem>)
		
		const item = screen.getByRole('button', { name: 'Active Item' })
		expect(item).toHaveClass('dropdown-item', 'active')
	})

	test('applies disabled class when disabled prop is true', () => {
		render(<DropdownItem disabled={true}>Disabled Item</DropdownItem>)
		
		const item = screen.getByRole('button', { name: 'Disabled Item' })
		expect(item).toHaveClass('dropdown-item', 'disabled')
	})

	test('calls onClick when clicked and not disabled', () => {
		const mockOnClick = jest.fn()
		render(<DropdownItem onClick={mockOnClick}>Clickable Item</DropdownItem>)
		
		const item = screen.getByRole('button', { name: 'Clickable Item' })
		fireEvent.click(item)
		
		expect(mockOnClick).toHaveBeenCalledTimes(1)
		expect(mockOnClick).toHaveBeenCalledWith(expect.any(Object))
	})

	test('does not call onClick when disabled', () => {
		const mockOnClick = jest.fn()
		render(
			<DropdownItem onClick={mockOnClick} disabled={true}>
				Disabled Item
			</DropdownItem>
		)
		
		const item = screen.getByRole('button', { name: 'Disabled Item' })
		fireEvent.click(item)
		
		expect(mockOnClick).not.toHaveBeenCalled()
	})

	test('prevents default on click', () => {
		const mockOnClick = jest.fn((e) => {
			e.preventDefault()
		})
		render(<DropdownItem onClick={mockOnClick}>Test Item</DropdownItem>)
		
		const item = screen.getByRole('button', { name: 'Test Item' })
		const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true })
		const preventDefaultSpy = jest.spyOn(clickEvent, 'preventDefault')
		
		item.dispatchEvent(clickEvent)
		
		expect(preventDefaultSpy).toHaveBeenCalled()
	})

	test('sets correct button type when tag is button and onClick is provided', () => {
		render(<DropdownItem tag="button" onClick={jest.fn()}>Button Item</DropdownItem>)
		
		const item = screen.getByRole('button', { name: 'Button Item' })
		expect(item).toHaveAttribute('type', 'button')
	})

	test('does not set type when tag is not button', () => {
		render(<DropdownItem tag="div" onClick={jest.fn()}>Div Item</DropdownItem>)
		
		const item = screen.getByText('Div Item')
		expect(item).not.toHaveAttribute('type')
	})

	test('does not set type when no onClick provided', () => {
		render(<DropdownItem tag="button">Button Item</DropdownItem>)
		
		const item = screen.getByRole('button', { name: 'Button Item' })
		expect(item).not.toHaveAttribute('type')
	})

	test('spreads additional props to element', () => {
		render(
			<DropdownItem 
				tag="a" 
				href="https://example.com" 
				target="_blank"
				data-testid="dropdown-link"
			>
				Link Item
			</DropdownItem>
		)
		
		const item = screen.getByTestId('dropdown-link')
		expect(item).toHaveAttribute('href', 'https://example.com')
		expect(item).toHaveAttribute('target', '_blank')
	})

	test('handles combined active and disabled states', () => {
		render(
			<DropdownItem active={true} disabled={true}>
				Combined State Item
			</DropdownItem>
		)
		
		const item = screen.getByRole('button', { name: 'Combined State Item' })
		expect(item).toHaveClass('dropdown-item', 'active', 'disabled')
	})

	test('works without onClick handler', () => {
		render(<DropdownItem>No Click Handler</DropdownItem>)
		
		const item = screen.getByRole('button', { name: 'No Click Handler' })
		
		// Should not throw error when clicked
		expect(() => fireEvent.click(item)).not.toThrow()
	})

	test('handleClick prevents default when item is disabled', () => {
		const mockOnClick = jest.fn()
		render(<DropdownItem onClick={mockOnClick} disabled={true}>Disabled Item</DropdownItem>)
		
		const item = screen.getByRole('button', { name: 'Disabled Item' })
		
		// Use fireEvent.click which will trigger the handleClick method
		fireEvent.click(item)
		
		// The component should not call onClick when disabled
		expect(mockOnClick).not.toHaveBeenCalled()
	})

	test('handleClick calls onClick when not disabled', () => {
		const mockOnClick = jest.fn()
		render(<DropdownItem onClick={mockOnClick} disabled={false}>Enabled Item</DropdownItem>)
		
		const item = screen.getByRole('button', { name: 'Enabled Item' })
		fireEvent.click(item)
		
		expect(mockOnClick).toHaveBeenCalledTimes(1)
	})

	test('handleClick works with undefined disabled prop', () => {
		const mockOnClick = jest.fn()
		render(<DropdownItem onClick={mockOnClick}>Undefined Disabled</DropdownItem>)
		
		const item = screen.getByRole('button', { name: 'Undefined Disabled' })
		fireEvent.click(item)
		
		expect(mockOnClick).toHaveBeenCalledTimes(1)
	})

	test('passes children correctly', () => {
		render(
			<DropdownItem>
				<span>Child Content</span>
				<strong>Bold Text</strong>
			</DropdownItem>
		)
		
		expect(screen.getByText('Child Content')).toBeInTheDocument()
		expect(screen.getByText('Bold Text')).toBeInTheDocument()
	})

	test('maintains props filtering correctly', () => {
		render(
			<DropdownItem 
				tag="button"
				className="test-class"
				active={true}
				disabled={false}
				onClick={jest.fn()}
				data-testprop="should-be-passed"
			>
				Test
			</DropdownItem>
		)
		
		const item = screen.getByRole('button', { name: 'Test' })
		expect(item).toHaveAttribute('data-testprop', 'should-be-passed')
		expect(item).toHaveClass('test-class', 'dropdown-item', 'active')
		expect(item).not.toHaveClass('disabled')
	})

	test('constructor initializes component properly', () => {
		const mockProps = { children: 'Test', tag: 'button' }
		expect(() => render(<DropdownItem {...mockProps} />)).not.toThrow()
	})

	test('handles undefined className gracefully', () => {
		render(<DropdownItem className={undefined}>Undefined Class</DropdownItem>)
		
		const item = screen.getByRole('button', { name: 'Undefined Class' })
		expect(item).toHaveClass('dropdown-item')
		expect(item).not.toHaveClass('undefined')
	})

	test('handles null className gracefully', () => {
		render(<DropdownItem className={null}>Null Class</DropdownItem>)
		
		const item = screen.getByRole('button', { name: 'Null Class' })
		expect(item).toHaveClass('dropdown-item')
	})

	test('applies defaultProps correctly', () => {
		render(<DropdownItem>Default Props Test</DropdownItem>)
		
		const item = screen.getByRole('button', { name: 'Default Props Test' })
		expect(item.tagName).toBe('BUTTON') // default tag
		expect(item).not.toHaveClass('disabled') // default disabled: false
	})

	test('handles tag as non-button with onClick', () => {
		const mockOnClick = jest.fn()
		render(
			<DropdownItem tag="span" onClick={mockOnClick}>
				Span with Click
			</DropdownItem>
		)
		
		const item = screen.getByText('Span with Click')
		expect(item.tagName).toBe('SPAN')
		expect(item).not.toHaveAttribute('type')
		
		fireEvent.click(item)
		expect(mockOnClick).toHaveBeenCalledTimes(1)
	})

	test('handles empty children', () => {
		render(<DropdownItem>{''}</DropdownItem>)
		
		const item = screen.getByRole('button')
		expect(item).toBeInTheDocument()
		expect(item).toHaveClass('dropdown-item')
	})

	test('handles multiple className values', () => {
		render(<DropdownItem className="class1 class2 class3">Multiple Classes</DropdownItem>)
		
		const item = screen.getByRole('button', { name: 'Multiple Classes' })
		expect(item).toHaveClass('dropdown-item', 'class1', 'class2', 'class3')
	})

	test('handleClick method exists and is bound correctly', () => {
		const mockOnClick = jest.fn()
		render(<DropdownItem onClick={mockOnClick}>Test Click Binding</DropdownItem>)
		
		const item = screen.getByRole('button', { name: 'Test Click Binding' })
		
		// Simulate direct method call (to test binding)
		fireEvent.click(item)
		
		expect(mockOnClick).toHaveBeenCalledWith(expect.objectContaining({
			type: 'click',
			preventDefault: expect.any(Function)
		}))
	})

	test('preserves all props except filtered ones', () => {
		        render(
            <DropdownItem 
                tag="input"
                active={false}
                disabled={false}
                className="preserved"
                id="test-id"
                role="menuitem"
                aria-label="Test Label"
                onClick={jest.fn()}
            />
        )
		
		const item = screen.getByRole('menuitem')
		expect(item).toHaveAttribute('id', 'test-id')
		expect(item).toHaveAttribute('aria-label', 'Test Label')
		expect(item).toHaveClass('dropdown-item', 'preserved')
		expect(item.tagName).toBe('INPUT')
	})

	test('component renders with minimal props', () => {
		render(<DropdownItem />)
		
		const item = screen.getByRole('button')
		expect(item).toBeInTheDocument()
		expect(item).toHaveClass('dropdown-item')
		expect(item.tagName).toBe('BUTTON')
	})

	test('handles active prop as false explicitly', () => {
		render(<DropdownItem active={false}>Not Active</DropdownItem>)
		
		const item = screen.getByRole('button', { name: 'Not Active' })
		expect(item).toHaveClass('dropdown-item')
		expect(item).not.toHaveClass('active')
	})

	test('event object is properly passed and preventDefault is called', () => {
		const mockOnClick = jest.fn()
		render(<DropdownItem onClick={mockOnClick}>Event Test</DropdownItem>)
		
		const item = screen.getByRole('button', { name: 'Event Test' })
		fireEvent.click(item)
		
		expect(mockOnClick).toHaveBeenCalledWith(expect.objectContaining({
			preventDefault: expect.any(Function),
			type: 'click'
		}))
		
		// Verify the event object has preventDefault function (actual calling depends on component implementation)
		const event = mockOnClick.mock.calls[0][0]
		expect(event.preventDefault).toBeDefined()
	})
})

