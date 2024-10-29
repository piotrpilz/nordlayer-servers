import apiClient from "@/api/client"

interface IGetAuthToken {
  username: string
  password: string
}

export const getAuthToken = ({ username = 'tesonet2', password='partyanimal' }:IGetAuthToken) => {
  return apiClient.post('https://playground.tesonet.lt/v1/servers', {
    username,
    password,
  })
}
