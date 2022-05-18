import { makeApiCall } from './utils'

export async function getTweets (opts = {}) {
 const {page = 1, perPage = 10, order = 'desc', sortBy = 'createdAt', search = ''} = opts

 const queryStr = `page=${page}&perPage=${perPage}&order=${order}&sortBy=${sortBy}&search=${search}`
 return makeApiCall('GET', `tweets?${queryStr}`)
}
