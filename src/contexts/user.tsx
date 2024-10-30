import storage, { STORAGE_KEYS } from "@/utils/storage"
import { createContext, useState } from "react"
import { getAuthToken } from "@/api/tokens"


interface ILoginParams {
  username: string
  password: string
}

interface IUserContext {
  user: {
    token: string | null
  }
  isLoading: boolean
  login: ({ username, password }:ILoginParams) => Promise<void>
  logout: () => void
}

export const UserContext = createContext<IUserContext | undefined>(undefined)

export const UserContextProvider:React.FC<{ children:React.ReactNode}> = ({ children }) => {
  const [token, setToken] = useState<string | null>(storage.getItem(STORAGE_KEYS.AUTH_TOKEN))
  const context = {
    user: {
      token,
    },

    isLoading: false,

    login: async ({ username, password }:ILoginParams) => {
      const token = await getAuthToken({ username, password })
      setToken(token)
      storage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)
    },

    logout: () => {
      setToken(null)
      storage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
    }
  }

  return (
    <UserContext.Provider value={context}>
      { children }
    </UserContext.Provider>
  )
}
