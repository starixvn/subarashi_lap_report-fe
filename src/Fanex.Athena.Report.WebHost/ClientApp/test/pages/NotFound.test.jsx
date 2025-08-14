import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import NotFound from '@/pages/NotFound'

describe('NotFound page', () => {
    beforeEach(() => {
        jest.spyOn(console, 'warn').mockImplementation(() => {})
    })

    afterEach(() => {
        console.warn.mockRestore()
    })

	test('shows path from location', () => {
		render(
			<MemoryRouter initialEntries={["/missing"]}>
				<Routes>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</MemoryRouter>
		)
		expect(screen.getByText(/Not Found/i)).toHaveTextContent('Not Found /missing')
	})
})


