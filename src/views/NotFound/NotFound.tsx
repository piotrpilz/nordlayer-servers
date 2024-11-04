import { Link } from "react-router-dom"

export const NotFound:React.FC = () => {
  return (
    <div className="text-center text-gray-300">
      Not found. <Link className="cursor-pointer" to="/">Go to homepage</Link>
    </div>
  )
}
