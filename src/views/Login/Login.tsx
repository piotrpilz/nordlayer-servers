import { useUserContext } from "@/hooks/useUserContext"
import ApiError from "@/utils/error"
import { useState } from "react"

export const Login:React.FC = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loginError, setLoginError] = useState<string | null>(null)
  const { login, isLoading } = useUserContext()

  const isFormValid = username.trim() !== '' && password.trim() !== '';

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault()
    setLoginError(null)
    try {
      await login({ username, password })
    } catch (err) {
      if (err instanceof ApiError && err.statusCode === 401) {
        setLoginError('Wrong username or password')
      }
    }
  }

  const inputClasses = `block rounded-md w-full mb-5 px-4 py-2
    text-gray-700 text-md bg-gray-400 border border-gray-500 placeholder-gray-500
    focus:placeholder-gray-300 focus:bg-white focus:border-gray-500 focus:outline-none`

    const labelClasses = `text-sm block mb-2`
  return (
    <form
      className="max-w-sm rounded-md overflow-hidden shadow-lg bg-gray-800 p-9"
      onSubmit={handleSubmit}
    >
      {loginError
        ? <div
            data-testid="login-error"
            className="text-sm flex items-center justify-between mb-5 p-3 leading-normal text-red-800 bg-red-400 rounded-md"
            role="alert"
          >
          {loginError}
        </div>
        : null
      }
      <div>
        <label className={labelClasses}>
          Username
        </label>
        <input
          className={inputClasses}
          data-testid="username-field"
          type="text"
          autoComplete="username"
          placeholder="(default: tesonet)"
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
      </div>
      <div>
        {/* TODO: handle autocomplete state update */}
        <label className={labelClasses}>
          Password
        </label>
        <input
          className={inputClasses}
          data-testid="password-field"
          type="password"
          placeholder="(default: partyanimal)"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </div>
      <div>
        <button
          data-testid="login-button"
          className="w-full text-gray- bg-gray-900 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2
          hover:bg-gray-950
          focus:ring-4 focus:ring-gray-800 focus:outline-none
          disabled:bg-gray-700 disabled:text-gray-800
          "
          disabled={!isFormValid}
          type="submit"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </form>
  )
}
