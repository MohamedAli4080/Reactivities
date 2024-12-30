import axios, { AxiosResponse } from "axios";
import { Activity } from "../../models/activity";

const sleep =(delay:number)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve,delay)
    })
}

axios.defaults.baseURL='http://localhost:5000/api'

axios.interceptors.response.use(async response=>{
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responsBody=<T>(response:AxiosResponse<T>)=>response.data;

const request={
    get:    <T>(url:string)=>axios.get<T>(url).then(responsBody),
    post:   <T>(url:string,body:{})=>axios.post<T>(url,body).then(responsBody),
    put:    <T>(url:string,body:{})=>axios.put<T>(url,body).then(responsBody),
    delele:    <T>(url:string)=>axios.delete<T>(url).then(responsBody),
}

const Activities={
    list:()=>request.get<Activity[]>('/Activity'),
    details:(id:string)=>request.get<Activity>(`Activity/${id}`),
    create:(activity:Activity)=>request.post<void>(`Activity`,activity),
    update:(activity:Activity)=>request.put<void>(`Activity/${activity.id}`,activity),
    delele:(id:string)=>request.delele<void>(`activity/${id}`)
}

const agent={
    Activities
} 

export default agent