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
  return (
    <div>
      {loginError
        ? <div data-testid="login-error">{loginError}</div>
        : null
      }
      <div>
        tesonet
        <input
          data-testid="username-field"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
      </div>
      <div>
        partyanimal
        <input
          data-testid="password-field"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </div>
      <div>
        <button
          data-testid="login-button"
          onClick={handleLogin}
          disabled={!isFormValid}
        >
          {isLoading ? 'logging in...' : 'Login'}
        </button>
      </div>
    </div>
  )
}
