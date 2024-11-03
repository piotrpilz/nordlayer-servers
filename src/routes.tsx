import { App } from '@/views/App'
import { Dashboard } from '@/views/Dashboard/Dashboard'

export default [
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "dashboard",
        element: <Dashboard/>,
      },
    ]
  },
]
