import { get, post } from './backendClient'

export const fetchSearchFilter = (data) => get(`products/search?${data}`)

export const fetchProductFilted = (data) => post('products/by/search',data)




