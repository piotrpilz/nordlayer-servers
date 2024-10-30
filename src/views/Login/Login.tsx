import { getAuthToken } from "@/api/tokens"
import ApiError from "@/utils/error"
import storage, { STORAGE_KEYS } from "@/utils/storage"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

export const Login:React.FC = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { mutate, isLoading } = useMutation(getAuthToken)

  const handleLogin = () => {
    // { username: 'tesonet', password: 'partyanimal' }
    mutate({ username, password }, {
      onSuccess: (data) => {
        if (data.token) {
          storage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token)
        }
      },
      onError(err) {
        // TODO: check how to better use types and refactor
        if (err instanceof ApiError) {
          console.log('xxx', err.statusCode)
        }
      },
    })
  }
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
      </div>
      <div>
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
