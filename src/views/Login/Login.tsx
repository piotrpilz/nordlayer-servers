import { useUserContext } from "@/hooks/useUserContext"
import { useState } from "react"

export const Login:React.FC = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { login, isLoading } = useUserContext()

  const handleLogin = () => {
    login({ username, password })
  }
  return (
    <div>
      <div>
        tesonet
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
      </div>
      <div>
        partyanimal
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </div>
      <div>
        <button onClick={handleLogin}>{isLoading ? 'logging in...' : 'Login'}</button>
      </div>
    </div>
  )
}
