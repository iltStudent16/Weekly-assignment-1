import { act, renderHook } from '@testing-library/react'
import { useLocalStorage } from './useLocalStorage'

describe('useLocalStorage', () => {
  it('persists value to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('demo-key', 'start'))

    act(() => {
      result.current[1]('updated')
    })

    expect(window.localStorage.getItem('demo-key')).toBe('"updated"')
  })
})
