import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import axios from "axios"
import type {Voices,Videos} from "@/app_types/userhistorytypes.ts"

export interface audioVideoHistory {
  allVoices:Voices[],
  allBgVideos:Videos[],
  getAllVoices:()=>Promise<string>,
  getAllVideos:()=>Promise<string>,
}

export const audioVideoStore = create<audioVideoHistory>()(
  devtools(
    (set) => {
      return {
        allVoices:[],
        allBgVideos:[],
        getAllVideos: async ():Promise<string> =>{
          
          const url=import.meta.env.VITE_BACKEND_HOST+`api/makevideo/get-bg-videos/`
          const config={
            url:url,
            method:'get',
            headers:{
              'Content-Type':'application/json',
            },
          }
          try {
            const response=await axios(config)
            const data=response.data.data
            set({allBgVideos:data})
            return "success"
          }
          catch(err){
            console.log(err)
            return "Failure"
          }
        },
        getAllVoices: async ():Promise<string> =>{
          const url=import.meta.env.VITE_BACKEND_HOST+`api/makevideo/get-voices/`
          const config={
            url:url,
            method:'get',
            headers:{
              'Content-Type':'application/json',
            },
          }
          try {
            const response=await axios(config)
            const data=response.data.data
            set({allVoices:data})
            return "success"
          }
          catch(err){
            console.log(err)
            return "Failure"
          }
        },
      }
    }
  )
)
