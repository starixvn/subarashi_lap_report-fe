import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

jest.mock('@legion-lib/react-grid', () => ({ Cell: ({ children }) => <div data-testid="cell">{children}</div> }))
jest.mock('react-redux', () => ({ useDispatch: () => jest.fn(), useSelector: jest.fn((sel) => sel({ requestParam: { FromDate: '2020-01-01', ToDate: '2020-01-02' } })) }))
const mockNavigate = jest.fn()
jest.mock('@/hooks/useNavigateParams', () => () => mockNavigate)
jest.mock('@/pages/livereport/matchlist/common', () => ({ constants: { BetListPageUrl: { MATCH: '/betlist/match', VSNEWRACING: '/betlist/vsnr' } } }))
jest.mock('@/pages/livereport/matchlist/actions', () => ({ ActionCreators: { toggleLoader: (v) => ({ type: 'TOGGLE', payload: v }) } }))

import Comp from '@/pages/livereport/matchlist/gridBuilder/customGrid/MatchCell'

test('MatchCell renders link and navigates on click', () => {
  const data = { matchName: 'Match Name', sportId: 1, matchId: 10, homeId: 1, awayId: 2, betType: 0, eventType: 0, distance: 0, vendorMatchId: 'v' }
  render(<Comp data={data} />)
  fireEvent.click(screen.getByText('Match Name'))
  expect(mockNavigate).toHaveBeenCalled()
})


