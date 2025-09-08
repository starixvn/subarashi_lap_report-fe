import React from 'react'
import { render, screen } from '@testing-library/react'
import HeaderRow from '@/pages/customerbalance/customGrid/HeaderRow'

const HeaderCell = ({ label, onSort, sortOrder }) => (
  <th data-testid={`cell-${label}`} data-sortorder={sortOrder} onClick={onSort}>{label}</th>
)

test('sets sortOrder for default selected header when no sortBy', () => {
  const onSort = jest.fn()
  render(
    <table>
      <tbody>
        <HeaderRow defaultSelectedHeaderKey="name" onSort={onSort}>
          <HeaderCell key="name" label="name" sortBy="name" lockArrow="asc" />
          <HeaderCell key="age" label="age" sortBy="age" lockArrow="desc" />
        </HeaderRow>
      </tbody>
    </table>
  )
  expect(screen.getByTestId('cell-name')).toHaveAttribute('data-sortorder', 'asc')
  expect(screen.getByTestId('cell-age')).not.toHaveAttribute('data-sortorder')
})

test('sets sortOrder based on sortBy and sortOrder', () => {
  const onSort = jest.fn()
  render(
    <table>
      <tbody>
        <HeaderRow sortBy="age" sortOrder="desc" onSort={onSort}>
          <HeaderCell key="name" label="name" sortBy="name" />
          <HeaderCell key="age" label="age" sortBy="age" />
        </HeaderRow>
      </tbody>
    </table>
  )
  expect(screen.getByTestId('cell-age')).toHaveAttribute('data-sortorder', 'desc')
  expect(screen.getByTestId('cell-name')).not.toHaveAttribute('data-sortorder')
})



