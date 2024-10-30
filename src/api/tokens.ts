import apiClient from "@/api/client"

interface IGetAuthToken {
  username: string
  password: string
}

export const getAuthToken = async ({ username = 'tesonet2', password='partyanimal' }:IGetAuthToken) => {
  const data = await apiClient.post('https://playground.tesonet.lt/v1/tokens', {
    username,
    password,
  })
  return data.token
}
