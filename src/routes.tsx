import { App } from '@/views/App'
import { Servers } from '@/views/Servers/Servers'

export default [
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "servers",
        element: <Servers/>,
      },
    ]
  },
]
