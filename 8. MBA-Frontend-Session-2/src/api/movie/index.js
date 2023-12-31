import { AxiosInstance } from '../../util/AxiosInstance'

export const getAllMovies = async () => {
  const URL = '/movieBooking/api/v1/movies'

  try {
    const response = await AxiosInstance.get(URL)
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}
