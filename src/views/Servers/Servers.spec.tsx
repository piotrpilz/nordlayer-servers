import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { Servers } from "./Servers"
import ApiError from "@/utils/error"

const reactQueryMock = vi.hoisted(() => ({
  isSuccess: true,
  isError: false,
  error: {},
  data: [
    { name: 'Server c', distance: 200 },
    { name: 'Server b', distance: 100 },
    { name: 'Server a', distance: 300 },
  ]
}))

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn().mockReturnValue(reactQueryMock)
}))

const user = vi.hoisted(():({ token: string | null }) => ({
  token: null,
}))

const logoutFn = vi.fn()

vi.mock('@/hooks/useUserContext', () => ({
  useUserContext: () => ({
    user,
    logout: logoutFn,
  })
}))

describe('Servers', () => {
  beforeEach(() => {
    render(<Servers/>, { wrapper: MemoryRouter })
  })

  describe('Rendering', () => {
    it('Should render server list with 3 children', () => {

      const element = screen.getByTestId('servers-list')
      expect(element.childNodes.length).toBe(3)
    })
  })

  describe('Actions', () => {
    it ('After `sort by name` click it should render servers list sorted by name', async () => {
      const element = screen.getByTestId('sort-by-name')
      await userEvent.click(element)

      const items = screen.getByTestId('servers-list').querySelectorAll('[data-testid^="server-item"]')

      expect(items[0]).toHaveTextContent('Server a')
      expect(items[1]).toHaveTextContent('Server b')
      expect(items[2]).toHaveTextContent('Server c')
    })

    it ('After `sort by name` click it should render servers list sorted by name', async () => {
      const element = screen.getByTestId('sort-by-distance')
      await userEvent.click(element)

      const items = screen.getByTestId('servers-list').querySelectorAll('[data-testid^="server-item"]')

      expect(items[0]).toHaveTextContent('100')
      expect(items[1]).toHaveTextContent('200')
      expect(items[2]).toHaveTextContent('300')
    })

    it('Should call `logout` on api 401 error', () => {
      reactQueryMock.isSuccess = false
      reactQueryMock.isError = true
      reactQueryMock.error = new ApiError('API error',401)

      render(<Servers/>, { wrapper: MemoryRouter })

      expect(logoutFn).toHaveBeenCalled()
    })
  })
})
