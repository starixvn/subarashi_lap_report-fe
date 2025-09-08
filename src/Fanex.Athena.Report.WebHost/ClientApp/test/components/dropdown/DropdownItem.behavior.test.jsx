import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import DropdownItem from '@/components/dropdown/DropdownItem'

test('invokes onClick when enabled', () => {
  const onClick = jest.fn()
  const { getByRole } = render(<DropdownItem onClick={onClick}>x</DropdownItem>)
  fireEvent.click(getByRole('button'))
  expect(onClick).toHaveBeenCalled()
})

test('does not invoke onClick when disabled', () => {
  const onClick = jest.fn()
  const { getByRole } = render(<DropdownItem disabled onClick={onClick}>x</DropdownItem>)
  fireEvent.click(getByRole('button'))
  expect(onClick).not.toHaveBeenCalled()
})



