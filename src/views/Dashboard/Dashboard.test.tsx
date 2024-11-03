import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { Dashboard } from "./Dashboard"

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn().mockReturnValue({
    isSuccess: true,
    data: [
      { name: 'Server c', distance: 200 },
      { name: 'Server b', distance: 100 },
      { name: 'Server a', distance: 300 },
    ]
  })
}))

describe('Dashboard', () => {
  beforeEach(() => {
    render(<Dashboard/>, { wrapper: MemoryRouter })
  })

  describe('Rendering', () => {
    it('Should render server list with 3 children', () => {

      const element = screen.getByTestId('servers-list')
      expect(element.childNodes.length).toBe(3)
    })
    // TODO
    // it('Should render server ordered by name if url query param `order` = name`', () => {
    // })
    // it('Should render server ordered by distance if url query param `order` = distance`', () => {
    // })
  })

  describe('Actions', () => {
    it ('After `sort by name` click it should render servers list sorted by name', async () => {
      const element = screen.getByTestId('sort-by-name')
      await userEvent.click(element)

      const items = screen.getByTestId('servers-list').querySelectorAll('[data-testid^="server-"]')

      expect(items[0]).toHaveTextContent('Server a')
      expect(items[1]).toHaveTextContent('Server b')
      expect(items[2]).toHaveTextContent('Server c')
    })

    it ('After `sort by name` click it should render servers list sorted by name', async () => {
      const element = screen.getByTestId('sort-by-distance')
      await userEvent.click(element)

      const items = screen.getByTestId('servers-list').querySelectorAll('[data-testid^="server-"]')

      expect(items[0]).toHaveTextContent('100')
      expect(items[1]).toHaveTextContent('200')
      expect(items[2]).toHaveTextContent('300')
    })
  })
})
