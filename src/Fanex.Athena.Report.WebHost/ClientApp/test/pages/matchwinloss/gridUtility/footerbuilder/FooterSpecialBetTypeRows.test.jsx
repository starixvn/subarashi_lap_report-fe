import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

jest.mock('@/hooks/useNavigateParams', () => jest.fn(() => jest.fn()))
jest.mock('react-redux', () => ({
  useSelector: jest.fn(fn => fn({
    requestParam: {
      CurrencyId: 1,
      BaseCurrency: 'USD',
      CurrencyName: 'USD',
      Date: '2024-01-01',
      ProductOptions: [{ code: 'S' }],
      SubsidiaryList: 'A,B',
      SubsidiarySearch: 'q'
    }
  })),
  useDispatch: jest.fn()
}))
jest.mock('@/pages/matchwinloss/gridUtility/CommonCells', () => () => null)
jest.mock('@/pages/matchwinloss/common', () => ({
  constants: {
    BetListPageUrl: {
      BETTYPE_WINLOSS: '/wl',
      OUTRIGHT: '/outright',
      MIXPARLAY: '/mix'
    }
  }
}))

import useNavigateParams from '@/hooks/useNavigateParams'
import FooterSpecialBetTypeRows from '@/pages/matchwinloss/gridUtility/footerbuilder/FooterSpecialBetTypeRows'

describe('FooterSpecialBetTypeRows', () => {
  test('navigates to correct pages based on betType', () => {
    const navigate = jest.fn()
    useNavigateParams.mockReturnValue(navigate)

    const data = [
      { bettypeName: 'WL', betType: 3605 },
      { bettypeName: 'Outright', betType: 10 },
      { bettypeName: 'MixParlay', betType: 99 }
    ]

    render(
      <table><tbody>
        <FooterSpecialBetTypeRows data={data} totalSpan={5} />
      </tbody></table>
    )

    fireEvent.click(screen.getByText('WL'))
    fireEvent.click(screen.getByText('Outright'))
    fireEvent.click(screen.getByText('MixParlay'))

    expect(navigate).toHaveBeenNthCalledWith(1, '/wl', expect.objectContaining({ BetType: 3605 }))
    expect(navigate).toHaveBeenNthCalledWith(2, '/outright', expect.objectContaining({ BetType: 10 }))
    expect(navigate).toHaveBeenNthCalledWith(3, '/mix', expect.objectContaining({ BetType: 99 }))
  })
})


