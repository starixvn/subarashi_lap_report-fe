import React from 'react'
import { render } from '@testing-library/react'
import BetList from '@/pages/betlist'

jest.mock('@/styles/pages/betlist.scss', () => ({}))
jest.mock('@/pages/betlist/components/AppContainer', () => ({ __esModule: true, default: () => <div data-testid="app">betlist</div> }))
jest.mock('@/lib/store', () => ({ __esModule: true, default: { createStore: jest.fn(() => ({ dispatch: jest.fn(), getState: jest.fn(() => ({})), subscribe: jest.fn() })) } }))
jest.mock('@/helpers/settingHelper', () => ({ __esModule: true, BetTicketEventBuilderUrl: 'https://bet.js', TokenScriptLink: 'https://token.js' }))

const appended = []
jest.mock('@/hooks/useScriptLink', () => ({ __esModule: true, default: () => ({ append: (src, id) => { const s = { src, id }; appended.push(s); return s }, remove: (s) => { appended.splice(appended.indexOf(s), 1) } }) }))

describe('pages/betlist', () => {
    test('renders provider and mounts scripts and cleans up', () => {
        appended.splice(0, appended.length)
        const { unmount } = render(<BetList />)
        expect(document.querySelector('[data-testid="app"]').textContent).toBe('betlist')
        expect(appended.map(x => x.src)).toEqual(['https://bet.js', 'https://token.js'])
        unmount()
        expect(appended).toEqual([])
    })
})


