import { APIBASEURL } from "../config"
import axios from 'axios'

export const get = ( path ) => axios.get(APIBASEURL + path).then(response => response).catch(error => error.response)
export const getWithToken = ( path, token ) => axios.get(APIBASEURL + path,{
    headers: {
         Accept: "application/json",
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}` ,
    
}}).then(response => response).catch(error => console.log(error))
export const post = ( path, data ) => axios.post(APIBASEURL + path, data).then(response => response).catch(error => error.response)
export const PostWithToken = ( path, body, token ) => axios.post(APIBASEURL + path,body,{
    headers: {
         Accept: "application/json",
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}` ,
    
}}).then(response => response).catch(error => error.response)
export const adminPostWithFormData = ( path, body, token ) => axios.post(APIBASEURL + path,body,{
    headers: {
         Accept: "application/json",
         Authorization: `Bearer ${token}` ,
    
}}).then(response => response).catch(error => error.response)

export const putReq = ( path, body, token ) => axios.put(APIBASEURL + path,body,{
    headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}` ,
    
}}).then(response => response).catch(error => console.log(error))


export const deleteWithToken = ( path, token ) => axios.delete(APIBASEURL + path,{
    headers: {
         Accept: "application/json",
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}` ,
    
}}).then(response => response).catch(error => console.log(error))