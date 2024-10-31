import { getServers } from "@/api/servers"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

interface IServer {
  name: string
  distance: number
  id: string
}

export const Dashboard:React.FC = () => {
  const serversQuery = useQuery({ queryKey: ['servers'], queryFn: getServers })

  useEffect(() => {
    console.log(serversQuery.data)
  }, [serversQuery.data])

  return (
    <div>
      <div data-testid="servers-list">
        {serversQuery.data?.map((server:IServer, index:number) => (
          <div key={index}>
            {server.name} | {server.distance}
          </div>
        ))}
      </div>
    </div>
  )
}
