"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {toast} from "sonner"
import {z} from "zod"

import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {generateVideoSchema} from "@/app_types/formtypes.ts";
import {Textarea} from "@/components/ui/textarea.tsx";
import axios from "axios";
import {userAuthStore} from "@/store/userAuthStore.tsx";
import {useEffect, useState} from "react";
import {audioVideoStore} from "@/store/audio_video.tsx";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Loader2Icon, PauseIcon, PlayIcon} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Slider} from "@/components/ui/slider.tsx";


export function GenerateVideoForm() {
  const form = useForm<z.infer<typeof generateVideoSchema>>({
    resolver: zodResolver(generateVideoSchema),
    defaultValues: {
      title: "",
      text: "",
      voice: "",
      bg_video_url: "",
      speed: 1,
    },
  })
  const {tokens}=userAuthStore()
  const [loading, setLoading] = useState<boolean>(false);
  async function genVideo(form_data: z.infer<typeof generateVideoSchema>) {
    setLoading(true);
    try {
      const url = import.meta.env.VITE_BACKEND_HOST + "api/makevideo/upload-audio/"
      const config = {
        url: url,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${tokens.access}`,
        },
        data: form_data
      }
      const response = await axios(config)
      console.log(response)
      setLoading(false);
      return response.data?.message ?? "Please wait few Minutes"
    } catch (error) {
      console.log(error)
      setLoading(false);
      throw new Error("Failed to generate video")
    }
  }
  const {getAllVideos,getAllVoices,allVoices,allBgVideos}=audioVideoStore()
  useEffect(() => {
    getAllVoices().then()
    getAllVideos().then()
  }, [getAllVideos,getAllVoices]);

function onSubmit(data: z.infer<typeof generateVideoSchema>) {
  const tost_id=toast.loading("Please wait")
  genVideo(data).then((result) => {toast.success(result,{id:tost_id})}).catch(error =>{toast.error(error.message,{id:tost_id})})
}
const [currentid,setCurrentid] = useState<number>(0)
const [currentlyPlayed, setCurrentlyPlayed] = useState<HTMLAudioElement | null>(null)
  const playAudio = (url:string,id:number) => {
    const audio = new Audio(url);
    audio.play()
    audio.onended = () => {
      setCurrentlyPlayed(null);
      setCurrentid(0);
    };
    setCurrentlyPlayed(audio);
    setCurrentid(id);
  };
  const pauseAudio = () => {
    if(currentlyPlayed!=null){
      currentlyPlayed.pause()
      setCurrentlyPlayed(null)
      setCurrentid(0);
    }
  };
return (
  <section className="flex-1">
  <div className="flex-1 " >
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
            className=" flex-1 px-2 space-y-6 p-6 bg-foreground/10 backdrop-blur-md border border-foreground/10 shadow-lg rounded-md">
        <div className="px-2 grid gap-5 lg:grid-cols-2 lg:gap-10 min-w-0">
          <div className="min-w-0 flex flex-col">
        <FormField
          control={form.control}
          name="title"
          render={({field}) => (
            <FormItem>
              <FormLabel className="text-3xl font-bold">Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormDescription>
                This is not used in Video
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
            <div className="flex-1 flex flex-col my-4">
        <FormField
          control={form.control}
          name="text"
          render={({field}) => (
            <FormItem className="flex-1 flex flex-col">
              <FormLabel className="text-3xl flex-0 font-bold">Text</FormLabel>

                <Textarea className=" flex-1 max-h-[60vh]" placeholder="Text" {...field} />

              <FormDescription className="flex-0">
                This is used in Video
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
            </div>
          </div>
          <div className="min-w-0">
            <FormField
            control={form.control}
            name="voice"
            render={({field}) => (
              <FormItem className="mb-4">
                <FormLabel className="text-3xl font-bold">Voices</FormLabel>
                <FormControl>
                  <RadioGroup className="flex gap-2 flex-wrap space-y-2" onValueChange={field.onChange}
                              defaultValue={field.value} >
                    {allVoices.map((item) => (
                      <div key={`voice-${item.id}`}>
                        <RadioGroupItem value={item.voice} id={`${item.voice}`} className="sr-only peer" />
                      <Label htmlFor={`${item.voice}`} className="flex gap-2 backdrop-blur p-1 items-center justify-center border-4 rounded-md peer-data-[state=checked]:border-primary" >

                          {
                            currentlyPlayed==null||currentid!=item.id?
                              <PlayIcon size={20} onClick={()=>{playAudio(item.voice_url,item.id)}}/>
                              :
                              <PauseIcon size={20} onClick={pauseAudio}/>
                          }
                          <h4>{item.voice}</h4>

                      </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
            />
            <FormField
              control={form.control}
              name="speed"
              render={({field}) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-3xl font-bold">Speed: {field.value}</FormLabel>
                  <FormControl>

                    <Slider value={Array.isArray(field.value) ? field.value : [field.value]}
                            onValueChange={(valueArray) => {
                      const singleNumber = valueArray[0];
                      field.onChange(singleNumber);
                    }} className="w-[60%]" max={2} min={0.5} step={0.1}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bg_video_url"
              render={({field}) => (
                <FormItem>
                  <FormLabel className="text-3xl font-bold">Background Videos</FormLabel>
                  <>
                      <ScrollArea className="w-full overflow-x-hidden" type="always" >
                    <RadioGroup className="flex gap-2 mb-4" onValueChange={field.onChange}
                                defaultValue={field.value} >
                      {allBgVideos.map((item) => (
                        <div key={`video-${item.id}`}>
                          <RadioGroupItem value={item.video_url} id={`${item.image_url}`} className="sr-only peer"/>
                        <Label htmlFor={`${item.image_url}`} className="flex gap-2 items-center peer-data-[state=checked]:border-primary border-4 rounded-md justify-center my-2" >
                            <img
                              src={item.image_url}
                              alt="Background image"
                              className="rounded-sm"
                            />
                        </Label>
                          </div>
                      ))}
                    </RadioGroup>
                        <ScrollBar orientation={"horizontal"} />
                      </ScrollArea>
                  </>
                  <FormMessage/>
                </FormItem>
              )}
            />


          </div>
        </div>
        <div className="flex items-center justify-center">
          {loading?<Button type="button" disabled={true}><Loader2Icon className="animate-spin"/> Please Wait</Button>:

          <Button type="submit" className="mx-auto w-50">Generate</Button>
          }
        </div>
      </form>
    </Form>

  </div>
  </section>
)
}

