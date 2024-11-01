import { getServers } from "@/api/servers"
import { formatDistance } from "@/utils/formatDIstance"
import { useQuery } from "@tanstack/react-query"

import ServerIcon from '@/assets/icons/server.svg?react'
import ChevronRightIcon from '@/assets/icons/chevron-right.svg?react'

interface IServer {
  name: string
  distance: number
  id: string
}

export const Dashboard:React.FC = () => {
  const {
    data: servers,
    isSuccess,
  } = useQuery({ queryKey: ['servers'], queryFn: getServers })

  const tableCellClasses='text-sm p-2 align-top '
  const tableHeaderClasses='xs:p-2 align-top '

  return (
    <>
    { isSuccess ? (
      <div className="bg-gray-800 p-4 rounded-md flex justify-center">
        <table className="text-sm w-full">
          <thead>
            <tr>
              <th className={tableHeaderClasses +' hidden xs:table-cell text-right'} scope="col"></th>
              <th className={tableHeaderClasses +' text-left'} scope="col">
                Server name&nbsp;<ChevronRightIcon className="inline-block w-3"/>
              </th>
              <th className={tableHeaderClasses +' text-right'} scope="col">
                Distance&nbsp;<ChevronRightIcon className="inline-block w-3"/>
              </th>
            </tr>
          </thead>
          <tbody data-testid="servers-list">
            {servers?.map((server:IServer, index:number) => (
              <tr key={index}>
                <td className={tableCellClasses + 'w-4 hidden xs:table-cell text-right'}>
                  <ServerIcon className="hidden xs:inline-block xs:mr-2 xs:visible"/>
                </td>
                <td className={tableCellClasses + ''}>
                  {server.name}
                </td>
                <td className={tableCellClasses + 'text-right whitespace-nowrap'}>
                  {formatDistance(server.distance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div>Failed to fetch server list</div>
    )}
    </>
  )
}
