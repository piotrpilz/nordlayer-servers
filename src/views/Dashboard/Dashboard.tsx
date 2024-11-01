import { getServers } from "@/api/servers"
import { formatDistance } from "@/utils/formatDIstance"
import { useQuery } from "@tanstack/react-query"

interface IServer {
  name: string
  distance: number
  id: string
}

export const Dashboard:React.FC = () => {
  const serversQuery = useQuery({ queryKey: ['servers'], queryFn: getServers })

  const tableCellClasses='text-sm p-2 align-top '
  const tableHeaderClasses='p-2 align-top '

  return (
    <div className=" bg-gray-800 p-4 rounded-md">
      <table className="text-sm w-full">
        <thead>
          <tr>
            <th className={tableHeaderClasses +' text-right'} scope="col"></th>
            <th className={tableHeaderClasses +' text-left'}>Server name</th>
            <th className={tableHeaderClasses +' text-right'}>Distance</th>
          </tr>
        </thead>
        <tbody data-testid="servers-list">
          {serversQuery.data?.map((server:IServer, index:number) => (
            <tr key={index}>
              <td className={tableCellClasses + ' w-4 text-right pr-2'}>{index+1}</td>
              <td className={tableCellClasses + ''}>{server.name}</td>
              <td className={tableCellClasses + 'text-right whitespace-nowrap'}>{formatDistance(server.distance)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
