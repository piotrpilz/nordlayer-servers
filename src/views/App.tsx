import { Link } from "react-router-dom"

export const App:React.FC = () => {
  return (
    <div>
      enter your code here :)
      <div>
        <Link to={`dashboard`}>Dashboard</Link>
      </div>
      <div>
        <Link to={`login`}>Login</Link>
      </div>
    </div>
  )
}
