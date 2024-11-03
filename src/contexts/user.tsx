import storage, { STORAGE_KEYS } from "@/utils/storage"
import { createContext, useState } from "react"
import { getAuthToken } from "@/api/tokens";

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
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const context = {
    user: {
      token,
    },

    isLoading,

    login: async ({ username, password }:ILoginParams) => {
      try {
        setIsLoading(true)
        storage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
        const token = await getAuthToken({ username, password })
        setToken(token)
        storage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)
      } finally {
        setIsLoading(false)
      }
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
