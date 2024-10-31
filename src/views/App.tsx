import { Outlet } from "react-router-dom"
import { useUserContext } from "@/hooks/useUserContext"
import { Login } from "./Login/Login"

export const App:React.FC = () => {
  const { user, logout } = useUserContext()

  const handleLogout = () => {
    logout()
  }

  return (
    <div>
      { user.token
        ? <Outlet/>
        : <Login/>
      }

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}
