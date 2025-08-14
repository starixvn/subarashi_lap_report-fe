import { encode, decode } from '@/lib/htmlHelper'

describe('htmlHelper', () => {
    test('encode escapes html', () => {
        expect(encode('<div>"&"</div>')).toBe('&lt;div&gt;"&amp;"&lt;/div&gt;')
    })

    test('decode unescapes html', () => {
        expect(decode('&lt;div&gt;A&amp;B&lt;/div&gt;')).toBe('<div>A&B</div>')
    })
})

