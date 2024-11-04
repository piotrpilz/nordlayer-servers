import { Outlet, useNavigate } from "react-router-dom"
import { useUserContext } from "@/hooks/useUserContext"
import { Login } from "./Login/Login"
import Logo from '@/assets/logos/Logomark-White-Vertical.svg';
import { useEffect } from "react";

export const App:React.FC = () => {
  const { user, logout } = useUserContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  useEffect(() => {
    if (user.token) {
      navigate('/servers')
    }
  }, [user.token, navigate])

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen
    bg-gray-900 py-10 text-gray-400">
      {user.token ? (
        <button data-testid="logout-button" onClick={handleLogout}>
          Logout
        </button>
      ): null}

      <img
        className="max-w-60 md:max-w-48"
        src={Logo}
        alt="logo"
      />

      <div className="w-auto max-w-screen-sm
        sm:w-3/4
        md:w-1/2
        flex
        justify-center
      ">
        { user.token
          ? <div data-testid="outlet"><Outlet/></div>
          : <Login/>
        }
      </div>
    </div>
  )
}
