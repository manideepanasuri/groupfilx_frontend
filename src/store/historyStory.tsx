import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import axios from "axios"
import type {FullResult} from "@/app_types/userhistorytypes.ts"

export type userHistory = {
  successTasks:FullResult;
  failTasks:FullResult;
  pendingTasks:FullResult;
  allTasks:FullResult;
  getSuccessTasks:(access:string,page:number)=>Promise<string>;
  getFailTasks:(access:string,page:number)=>Promise<string>;
  getPendingTasks:(access:string,page:number)=>Promise<string>;
  getAllTasks:(access:string,page:number)=>Promise<string>;
  deleteTask:(access:string,useduuid:string)=>Promise<string>;
}
const task_initial_state:FullResult = {
  count:0,
  total_pages:1,
  current_page:1,
  next:null,
  previous:null,
  results:[]
}
const initialstate={
  successTasks:task_initial_state,
  failTasks:task_initial_state,
  pendingTasks:task_initial_state,
  allTasks:task_initial_state,
}

export const userHistoryStore = create<userHistory>()(
  devtools(
      (set,get) => {
        return {
          successTasks:initialstate.successTasks,
          failTasks:initialstate.failTasks,
          pendingTasks:initialstate.pendingTasks,
          allTasks:initialstate.allTasks,
          getSuccessTasks: async (access:string,page:number):Promise<string>=>{
            if(page>get().successTasks.total_pages||page<-2){return "page not valid"}

            let url:string|null=import.meta.env.VITE_BACKEND_HOST+`api/makevideo/get-success-tasks/?page=${page}`
            if (page==-1){
              url=get().successTasks.next
              if(!url){ return "page not valid"}
            }
            if(page==-2){
              url=get().successTasks.previous
              if(!url){ return "page not valid"}
            }
            const config={
              url:url,
              method:'get',
              headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${access}`,
              },
            }
            try {
              const response=await axios(config)
              const data=response.data
              console.log(response)
              set({successTasks:data})
              return "success"
            }
            catch(err){
              console.log(err)
              return "Failure"
            }
          },
          getPendingTasks:async (access:string,page:number):Promise<string>=>{
            if(page>get().pendingTasks.total_pages||page<-2){return "page not valid"}

            let url:string|null=import.meta.env.VITE_BACKEND_HOST+`api/makevideo/get-pending-tasks/?page=${page}`
            if (page==-1){
              url=get().pendingTasks.next
              if(!url){ return "page not valid"}
            }
            if(page==-2){
              url=get().pendingTasks.previous
              if(!url){ return "page not valid"}
            }
            const config={
              url:url,
              method:'get',
              headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${access}`,
              },
            }
            try {
              const response=await axios(config)
              const data=response.data
              console.log(response)
              set({pendingTasks:data})
              return "success"
            }
            catch(err){
              console.log(err)
              return "Failure"
            }
          },
          getFailTasks:async (access:string,page:number):Promise<string>=>{
            if(page>get().failTasks.total_pages||page<-2){return "page not valid"}

            let url:string|null=import.meta.env.VITE_BACKEND_HOST+`api/makevideo/get-failure-tasks/?page=${page}`
            if (page==-1){
              url=get().failTasks.next
              if(!url){ return "page not valid"}
            }
            if(page==-2){
              url=get().failTasks.previous
              if(!url){ return "page not valid"}
            }
            const config={
              url:url,
              method:'get',
              headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${access}`,
              },
            }
            try {
              const response=await axios(config)
              const data=response.data
              console.log(response)
              set({failTasks:data})
              return "success"
            }
            catch(err){
              console.log(err)
              return "Failure"
            }
          },
          getAllTasks:async (access:string,page:number):Promise<string>=>{
            if(page>get().allTasks.total_pages||page<-2){return "page not valid"}

            const url=import.meta.env.VITE_BACKEND_HOST+`api/makevideo/get-all-tasks/?page=${page}`
            const config={
              url:url,
              method:'get',
              headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${access}`,
              },
            }
            try {
              const response=await axios(config)
              const data=response.data
              console.log(response)
              set({allTasks:data})
              return "success"
            }
            catch(err){
              console.log(err)
              return "Failure"
            }
          },
          deleteTask:async (access:string,useduuid:string):Promise<string>=>{


            const url=import.meta.env.VITE_BACKEND_HOST+`api/makevideo/delete-task/`
            const config={
              url:url,
              method:'delete',
              headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${access}`,
              },
              data:{useduuid:useduuid},
            }
            try {
              const response=await axios(config)
              const data=response.data
              console.log(response)
              set({allTasks:data})
              return response.data?.message??"success"
            }
            catch(err){
              console.log(err)
              throw  new Error("Failed to delete task")
            }
          },
        }
      }
  )
)
