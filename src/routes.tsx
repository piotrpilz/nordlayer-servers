import { App } from '@/views/App'
import { Servers } from '@/views/Servers/Servers'
import { NotFound } from '@/views/NotFound/NotFound'

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
  { path: "*", element: <NotFound/> },
]
