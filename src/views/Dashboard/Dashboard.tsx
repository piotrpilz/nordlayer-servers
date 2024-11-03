import { getServers } from "@/api/servers"
import { formatDistance } from "@/utils/formatDIstance"
import { useQuery } from "@tanstack/react-query"

import ServerIcon from '@/assets/icons/server.svg?react'
import ChevronRightIcon from '@/assets/icons/chevron-right.svg?react'
import ChevronDownIcon from '@/assets/icons/chevron-down.svg?react'
import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"

interface IServer {
  name: string
  distance: number
  id: string
}

export const Dashboard:React.FC = () => {
  const {
    data: fetchedServers,
    isSuccess,
    isError,
    isLoading,
  } = useQuery({ queryKey: ['servers'], queryFn: getServers })

  const [servers, setServers] = useState<IServer[]>([])

  const [searchParams, setSearchParams] = useSearchParams()

  const tableCellClasses='text-sm p-2 align-top '
  const tableHeaderClasses='xs:p-2 align-top '

  const handleDistanceSortClick = () => {
    setSearchParams(() => ({ order: 'distance' }))
  }

  const handleNameSortClick = () => {
    setSearchParams(() => ({ order: 'name' }))
  }


  useEffect(() => {
    const sortedServers = [...fetchedServers || []]
    if (searchParams.get('order') === 'distance') {
      sortedServers.sort((a:IServer, b:IServer) => a.distance - b.distance)
    } else if (searchParams.get('order') === 'name') {
      sortedServers.sort((a:IServer, b:IServer) => a.name.localeCompare(b.name))
    }

    setServers(() => sortedServers)
  }, [fetchedServers, searchParams])


  return (
    <>
    { isLoading ? <div>Loading...</div> : null }

    { isError ? <div>Something went wrong</div> : null }

    { isSuccess ? (
      <div className="bg-gray-800 p-4 rounded-md flex justify-center">
        <table className="text-sm w-full">
          <thead>
            <tr>
              <th className={tableHeaderClasses +' hidden xs:table-cell text-right'} scope="col"></th>
              <th
                data-testid="sort-by-name"
                className={tableHeaderClasses +' text-left cursor-pointer'}
                onClick={handleNameSortClick}
                scope="col"
              >
                Server name&nbsp;{searchParams.get('order') === 'name'
                  ? <ChevronDownIcon className="inline-block w-3"/>
                  : <ChevronRightIcon className="inline-block w-3"/>
                }
              </th>
              <th
                data-testid="sort-by-distance"
                className={tableHeaderClasses +' text-right cursor-pointer'}
                onClick={handleDistanceSortClick}
                scope="col"
              >
                Distance&nbsp;{searchParams.get('order') === 'distance'
                  ? <ChevronDownIcon className="inline-block w-3"/>
                  : <ChevronRightIcon className="inline-block w-3"/>
                }
              </th>
            </tr>
          </thead>
          <tbody data-testid="servers-list">
            {servers?.map((server:IServer) => (
              <tr
                key={`server-${server.name}-${server.distance}`}
                data-testid={`server-${server.name}-${server.distance}`}
              >
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
    ) : null}
    </>
  )
}
