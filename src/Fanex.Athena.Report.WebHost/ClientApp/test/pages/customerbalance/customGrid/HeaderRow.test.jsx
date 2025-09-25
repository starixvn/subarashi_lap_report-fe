import React from 'react'
import { render, screen } from '@testing-library/react'
import CustomHeaderRow from '@/pages/customerbalance/customGrid/CustomHeaderRow'

const HeaderCell = ({ label, onSort, sortOrder }) => (
  <th data-testid={`cell-${label}`} data-sortorder={sortOrder} onClick={onSort}>{label}</th>
)

test('sets sortOrder for default selected header when no sortBy', () => {
  const onSort = jest.fn()
  render(
    <table>
      <tbody>
        <CustomHeaderRow defaultSelectedHeaderKey="name" onSort={onSort}>
          <HeaderCell key="name" label="name" sortBy="name" lockArrow="asc" />
          <HeaderCell key="age" label="age" sortBy="age" lockArrow="desc" />
        </CustomHeaderRow>
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
        <CustomHeaderRow sortBy="age" sortOrder="desc" onSort={onSort}>
          <HeaderCell key="name" label="name" sortBy="name" />
          <HeaderCell key="age" label="age" sortBy="age" />
        </CustomHeaderRow>
      </tbody>
    </table>
  )
  expect(screen.getByTestId('cell-age')).toHaveAttribute('data-sortorder', 'desc')
  expect(screen.getByTestId('cell-name')).not.toHaveAttribute('data-sortorder')
})



