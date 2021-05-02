import { get, PostWithToken} from './backendClient'

export const fetchCategories = (params) => get('categories', params)

export const createCategory = ( _idOfTheUser, data, token ) => PostWithToken(`admin/create-category/${_idOfTheUser}`, data, token)



