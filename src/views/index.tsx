import { Link } from "react-router-dom"

function IndexView() {
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

export default IndexView
