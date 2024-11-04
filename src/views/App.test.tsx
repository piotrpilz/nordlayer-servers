import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';

import {
  describe,
  it,
  expect,
  vi,
} from 'vitest'

import { UserContextProvider } from '@/contexts/user'
import { App } from "./App"
import userEvent from '@testing-library/user-event';

const user = vi.hoisted(():({ token: string | null }) => ({
  token: null,
}))

const logoutFn = vi.fn()

vi.mock('@/views/Login/Login', () => {
  return {
    Login: () => <div data-testid="stubbed-login-form"></div>,
  }
})

vi.mock('@/hooks/useUserContext', () => ({
  useUserContext: () => ({
    user,
    logout: logoutFn,
  })
}))

const renderApp = () => render(
  <UserContextProvider>
    <MemoryRouter>
      <App/>
    </MemoryRouter>
  </UserContextProvider>
)

describe('App component', () => {
  describe('Rendering:', () => {
    it('should rendered without an error', () => {
      expect(renderApp).toBeTruthy()
      screen.debug()
    })

    it('should render a login form if no user is logged in', () => {
      renderApp()
      expect(screen.getByTestId('stubbed-login-form')).toBeVisible()
    })

    it('should render an outlet view if user is logged in', () => {
      user.token = 'faketoken'
      renderApp()
      expect(screen.getByTestId('outlet')).toBeVisible()
    })
  })

  describe('Actions:', () => {
    it('should call `logout` on logout button click', async () => {
      user.token = 'faketoken'
      renderApp()

      const element = screen.getByTestId('logout-button')
      await userEvent.click(element)

      expect(logoutFn).toHaveBeenCalled()
    })
  })
})
