import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import {z} from "zod"
import {changePasswordSchema, loginSchema, signupSchema} from "@/app_types/formtypes"
import axios from "axios"

// interface UserData {
//   name: string;
//   email: string;
//   phrase: string;
// }

interface SignUpProps {
  values: z.infer<typeof signupSchema>,
  phrase: string,
  phrase_answer: string,
}

export type usertype = {
  tokens: {
    refresh: string,
    access: string,
  }
  name: string,
  email: string,
  phrase: string,
  is_authenticated: boolean,
  is_verified: boolean,
  is_loading: boolean,
  signup: (form_data: SignUpProps) => Promise<string>,
  login: (form_data:z.infer<typeof loginSchema>) => Promise<string>,
  logout: () => Promise<string>,
  refresh:() => Promise<null>,
  get_google_url: () => Promise<string>,
  verify_google:(token: string) => Promise<string>,
  get_verification_email: () => Promise<string>,
  get_change_password_url: (form_data:z.infer<typeof changePasswordSchema>) => Promise<string>,
  verify_change_password: (token: string) => Promise<string>,
  phrase_check: (phraseAnswer: string) => Promise<string>,
}
const initialstate={
  tokens: {
    refresh: "",
    access: "",
  },
  name: "",
  email: "",
  phrase: "",
  is_authenticated: false,
  is_verified: false,
  is_loading: false,
}

export const userAuthStore = create<usertype>()(
  devtools(
    persist(
      (set,get) => {
        return {
          tokens: {
            refresh: "",
            access: "",
          },
          name: "",
          email: "",
          is_authenticated: false,
          is_verified: false,
          is_loading: false,
          login: async (form_data:z.infer<typeof loginSchema>):Promise<string> => {
            set({is_loading:true})
            const url = import.meta.env.VITE_BACKEND_HOST + "api/auth/login/"
            const config={
              url:url,
              method:'post',
              headers:{
                'Content-Type':'application/json',
              },
              data:form_data
            }
            try {
              set({is_loading:true})
              const response = await axios(config)
              const data=response.data.data
              // set(
              //   {
              //     tokens: {
              //       refresh: data.tokens.refresh,
              //       access: data.tokens.access,
              //     },
              //     name: data.name,
              //     email: data.email,
              //     is_authenticated: true,
              //     is_verified: data.is_verified,
              //     is_loading: false,
              //   }
              // )
              set({
                name: data.name,
                email: data.email,
                phrase: data.phrase,
              })
              return response.data.message
            } catch (error) {
              console.log(error)
              set({is_loading:false})
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              throw  new Error(error?.response?.data?.message??"Something went wrong")
              
            }
          },
          signup: async (form_data: SignUpProps):Promise<string> => {
            const url = import.meta.env.VITE_BACKEND_HOST + "api/auth/signup/"
            console.log(form_data);
            const config = {
              url: url,         // path only; baseURL is already set
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
              },
              data: {
                name: form_data.values.name,
                email: form_data.values.email,
                password: form_data.values.password,
                phrase: form_data.phrase,
                phrase_answer: form_data.phrase_answer,
              },
            };
            try {
              set({is_loading:true})
              const response = await axios(config)
              const data=response.data.data
              set(
                {
                  tokens: {
                    refresh: data.tokens.refresh,
                    access: data.tokens.access,
                  },
                  name: data.name,
                  email: data.email,
                  is_authenticated: true,
                  is_verified: true,
                  is_loading: false,
                }
              )
              return response.data.message
            } catch (error) {
              console.log(error)
              set({is_loading:false})
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              throw new Error(error?.response?.data?.message??"Something went wrong")
              
            }
          },
          logout: async ():Promise<string> => {
            set(initialstate)
            return "success"
          },
          refresh: async ():Promise<null> => {
            try {
              const url = import.meta.env.VITE_BACKEND_HOST + "api/auth/refresh/"
              const from_data={
                refresh:get().tokens.refresh,
              }
              if(get().tokens.refresh == ""){return null;}
              const config={
                url:url,
                method:'post',
                headers:{
                  'Content-Type':'application/json',
                },
                data:from_data,
              }
              const response = await axios(config)
              const data=response.data
              //console.log(data);
              set({tokens:data.tokens,is_verified:data.is_verified})
              return null;
            }
            catch (e) {
              console.log(e)
              set(initialstate)
              return null;
            }
          },
          get_google_url: async ():Promise<string> => {
            set({is_loading:true})
            try {
              const url = import.meta.env.VITE_BACKEND_HOST + "api/auth/google-redirect-url/"
              const config={
                url:url,
                method:'get',
                headers:{
                  'Content-Type':'application/json',
                },
              }
              const response = await axios(config)
              const data=response.data
              set({is_loading:false})
              return data.url;
            }
            catch (e) {
              console.log(e)
              set({is_loading:false})
              throw new Error("something went wrong")
            }
          },
          verify_google: async (token:string):Promise<string> => {
              set({is_loading:true})

              const url = import.meta.env.VITE_BACKEND_HOST + "api/auth/verify-google-token/"
              const from_data={
                token:token
              }
              const config={
                url:url,
                method:'post',
                headers:{
                  'Content-Type':'application/json',
                },
                data:from_data,
              }
            try {
              const response = await axios(config)
              const data=response.data.data
              set(
                {
                  tokens: {
                    refresh: data.tokens.refresh,
                    access: data.tokens.access,
                  },
                  name: data.name,
                  email: data.email,
                  is_authenticated: true,
                  is_verified: data.is_verified,
                  is_loading: false,
                }
              )
              return response.data.message
            } catch (error) {
              console.log(error)
              set({is_loading:false})
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              throw  new Error(error?.response?.data?.message??"Something went wrong. Try again")

            }

          },
          get_verification_email: async ():Promise<string> => {
            set({is_loading:true})
            try {
              const url = import.meta.env.VITE_BACKEND_HOST + "api/auth/get-verification-email/"
              const config={
                url:url,
                method:'get',
                headers:{
                  'Content-Type':'application/json',
                  'Authorization':`Bearer ${get().tokens.access}`,
                },
              }
              const response = await axios(config)
              const data=response.data
              set({is_loading:false})
              return data.message??"Email sent successfully";
            }
            catch (e) {
              console.log(e)
              set({is_loading:false})
              throw new Error("something went wrong. Try again")
            }
          },
          get_change_password_url: async (form_data:z.infer<typeof changePasswordSchema>):Promise<string> => {
            set({is_loading:true})
            try {
              const url = import.meta.env.VITE_BACKEND_HOST + "api/auth/change-password/"
              const config={
                url:url,
                method:'post',
                headers:{
                  'Content-Type':'application/json',
                },
                data:form_data
              }
              const response = await axios(config)
              const data=response.data
              set({is_loading:false})
              return data.message??"Email sent successfully";
            }
            catch (e) {
              console.log(e)
              set({is_loading:false})
              throw new Error("something went wrong. Try again")
            }
          },
          verify_change_password: async (token:string):Promise<string> => {
            set({is_loading:true})

            const url = import.meta.env.VITE_BACKEND_HOST + "api/auth/verify-change-password/"
            const from_data={
              token:token
            }
            const config={
              url:url,
              method:'post',
              headers:{
                'Content-Type':'application/json',
              },
              data:from_data,
            }
            try {
              const response = await axios(config)
              const data=response.data.data
              set(
                {
                  tokens: {
                    refresh: data.tokens.refresh,
                    access: data.tokens.access,
                  },
                  name: data.name,
                  email: data.email,
                  is_authenticated: true,
                  is_verified: data.is_verified,
                  is_loading: false,
                }
              )
              return response.data.message
            } catch (error) {
              console.log(error)
              set({is_loading:false})
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              throw  new Error(error?.response?.data?.message??"Something went wrong. Try again")

            }

          },
          phrase_check: async (phraseAnswer: string):Promise<string> => {
            set({is_loading:true})
            const url = import.meta.env.VITE_BACKEND_HOST + "api/auth/phrase/"
            const config={
            url:url,
              method:'post',
              headers:{
                'Content-Type':'application/json',
              },
              data:{
                "email": get().email,
                "phrase_answer": phraseAnswer
              }
            }
            try {
              set({is_loading:true})
              const response = await axios(config)
              const data=response.data.data
              set(
                {
                  tokens: {
                    refresh: data.tokens.refresh,
                    access: data.tokens.access,
                  },
                  name: data.name,
                  email: data.email,
                  is_authenticated: true,
                  is_verified: true,
                  is_loading: false,
                }
              )
              return response.data.message
            } catch (error) {
              console.log(error)
              set({is_loading:false})
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              throw  new Error(error?.response?.data?.message??"Something went wrong")
              
            }
          },
        }
      },
      {
        name: "dsa_notes_taker",
      }
    )
  )
)
