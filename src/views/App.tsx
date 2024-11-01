import { Outlet } from "react-router-dom"
import { useUserContext } from "@/hooks/useUserContext"
import { Login } from "./Login/Login"
import Logo from '@/assets/logos/Logomark-White-Vertical.svg';

export const App:React.FC = () => {
  const { user, logout } = useUserContext()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen
    bg-gray-900 py-10 text-gray-400">

      <img
        className="w-1/2"
        src={Logo}
        alt="logo"
      />

      <div className="w-3/4">
        { user.token
          ? <Outlet/>
          : <Login/>
        }
      </div>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}
