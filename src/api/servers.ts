import apiClient from "@/api/client"

export const getServers = () => {
  return apiClient.get('https://playground.tesonet.lt/v1/servers', { auth: true })
}
