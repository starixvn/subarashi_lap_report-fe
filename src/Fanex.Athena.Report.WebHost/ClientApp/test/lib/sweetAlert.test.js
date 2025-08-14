import React from 'react'
import { generateDefaultConfirmOption, generateDefaultAlertOption, predefinedIcons } from '@/lib/sweetAlert'

jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: jest.fn((k) => k) } }))

describe('sweetAlert helpers', () => {
    test('generateDefaultConfirmOption returns proper structure', () => {
        const onClose = jest.fn()
        const opt = generateDefaultConfirmOption('content', onClose, { text: 'Submit' }, { className: 'c' })
        expect(opt.isShow).toBe(true)
        expect(opt.icon).toBe(predefinedIcons.warning)
        expect(opt.title).toBe('Confirmation')
        expect(opt.buttons[0].text).toBe('Submit')
        expect(opt.buttons[1].className).toBe('c')
        expect(typeof opt.onClose).toBe('function')
    })

    test('generateDefaultAlertOption returns proper structure', () => {
        const onClose = jest.fn()
        const onClick = jest.fn()
        const opt = generateDefaultAlertOption('content', onClose, onClick)
        expect(opt.isShow).toBe(true)
        expect(opt.icon).toBe(predefinedIcons.success)
        expect(opt.buttons[0].text).toBe('OK')
        expect(opt.buttons[0].onClick).toBe(onClick)
        expect(typeof opt.onClose).toBe('function')
    })
})

