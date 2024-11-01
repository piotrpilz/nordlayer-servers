import { useUserContext } from "@/hooks/useUserContext"
import ApiError from "@/utils/error"
import { useState } from "react"

export const Login:React.FC = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loginError, setLoginError] = useState<string | null>(null)
  const { login, isLoading } = useUserContext()

  const isFormValid = username.trim() !== '' && password.trim() !== '';

  const handleLogin = async () => {
    try {
      await login({ username, password })
    } catch (err) {
      if (err instanceof ApiError && err.statusCode === 401) {
        setLoginError('Wrong username or password')
      }
    }
  }

  const inputClasses = `block rounded-sm w-full mb-5 px-4 py-2
    text-gray-500 text-md bg-white border border-gray-300 placeholder-sm placeholder-gray-300
    focus:placeholder-gray-500 focus:bg-white focus:border-gray-500 focus:outline-none`

    const labelClasses = `text-sm block mb-2`
  return (
    <div className="max-w-sm rounded-md overflow-hidden shadow-lg bg-white p-9">
      {loginError
        ? <div
            data-testid="login-error"
            className="text-sm flex items-center justify-between mb-5 p-3 leading-normal text-red-600 bg-red-100 rounded-md"
            role="alert"
          >
          {loginError}
        </div>
        : null
      }
      <div>
        {/* tesonet */}
        <label className={labelClasses}>
          Username
        </label>
        <input
          className={inputClasses}
          data-testid="username-field"
          type="text"
          placeholder="(default: tesonet)"
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
      </div>
      <div>
        {/* partyanimal */}
        <label className={labelClasses}>
          Password
        </label>
        <input
          className={inputClasses}
          data-testid="password-field"
          type="password"
          placeholder="(default: partyanimal)"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </div>
      <div>
        <button
          data-testid="login-button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleLogin}
          disabled={!isFormValid}
        >
          {isLoading ? 'logging in...' : 'Login'}
        </button>
      </div>
    </div>
  )
}
