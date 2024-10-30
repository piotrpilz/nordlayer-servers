import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest'

import { Login } from "./Login"

const mocks = vi.hoisted(() => {
  return {
    isLoading: false,
    login: vi.fn().mockReturnValue('fakeToken')
  }
})

vi.mock('@/hooks/useUserContext', () => ({
  useUserContext: vi.fn().mockReturnValue({
    isLoading: mocks.isLoading,
    login: mocks.login,
  })
}))

import { useUserContext } from "@/hooks/useUserContext"
import ApiError from '@/utils/error'

describe('Login component', () => {
  beforeEach(() => {
    vi.resetModules()
    render(<Login/>)
  })

  describe('Rendering:', () => {
    it('should rendered without an error', () => {
      expect(render(<Login/>)).toBeTruthy()
    })

    it('should render username and password field', () => {
      let element = screen.getByTestId('password-field')
      expect(element).toBeInTheDocument()

      element = screen.getByTestId('username-field')
      expect(element).toBeInTheDocument()
    })

    it('should render disabled button if username or password is empty', () => {
      const element = screen.getByTestId('login-button')
      expect(element).toBeDisabled()
    })

    it('should render not disabled button if username or password not empty', async () => {
      let element = screen.getByTestId('password-field')
      await userEvent.type(element, 'fakePassword')

      element = screen.getByTestId('username-field')
      await userEvent.type(element, 'fakeUsername')

      element = screen.getByTestId('login-button')
      expect(element).not.toBeDisabled()
    })

    it('should render wrong credentials error', async () => {
      mocks.login.mockRejectedValueOnce(new ApiError('Wrong username or password', 401))

      let element = screen.getByTestId('password-field')
      await userEvent.type(element, 'fakePassword')

      element = screen.getByTestId('username-field')
      await userEvent.type(element, 'fakeUsername')

      element = screen.getByTestId('login-button')
      await userEvent.click(element)

      expect(screen.getByTestId('login-error')).toBeInTheDocument()
    })
  })

  describe('Actions:', () => {
    it('should call login function with provided credentials', async () => {
      let element = screen.getByTestId('password-field')
      await userEvent.type(element, 'fakePassword')

      element = screen.getByTestId('username-field')
      await userEvent.type(element, 'fakeUsername')

      element = screen.getByTestId('login-button')
      await userEvent.click(element)

      expect(useUserContext().login).toHaveBeenCalledWith({
        username: 'fakeUsername',
        password: 'fakePassword'
      })
    })
  })
})
