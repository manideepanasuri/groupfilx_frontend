import type {Task} from "@/app_types/userhistorytypes.ts";
import {Card, CardContent} from "@/components/ui/card.tsx";
import ReactPlayer from "react-player";
import {DownloadIcon, FileMusic, Loader2Icon, Trash2Icon, TriangleAlertIcon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {toast} from "sonner";
import {TopAnimation} from "@/components/top-animaiton.tsx";
import {userHistoryStore} from "@/store/historyStory.tsx";
import {userAuthStore} from "@/store/userAuthStore.tsx";

type Props={
  task:Task
}
const handleDownload = async (urll:string,title:string) => {
  const response = await fetch(urll);
  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download =title; // optional filename
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};


export function SuccessTaskComponent({task}:Props) {
  const {deleteTask,getSuccessTasks,getFailTasks,getPendingTasks}= userHistoryStore()
  const {tokens}=userAuthStore()
  function refreshAllTaks(){
    getSuccessTasks(tokens.access,1).then().catch(err=>console.log(err))
    getFailTasks(tokens.access,1).then().catch(err=>console.log(err))
    getPendingTasks(tokens.access,1).then().catch(err=>console.log(err))
  }
  return (
    <div className="min-w-0">
      <TopAnimation>
    <Card className=" mx-auto p-0 rounded-md col-span-1 min-w-0 cursor-pointer">
      <CardContent className="p-0">
      <div className="aspect-[9/16]">
        <ReactPlayer
          url={task.video_url}
          light={<img alt={task.title} src={task.thumbnail_url} className="h-[100%] w-[100%] rounded-md"/>}
          controls={true}
          width="100%"
          height="100%"
        />
      </div>
        <div className="parent overflow-x-hidden p-2">
          <h4 className="scroll-m-20 text-xl font-extrabold tracking-tight mb-2 truncate child">
            {task.title}
          </h4>
          <div className=" flex items-center justify-between mt-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline"
                        onClick={()=>{
                          const tost_id=toast.loading("Please wait")
                          handleDownload(task.video_url,task.title+".mp4").then(()=>{toast.success("Download Complete",{id:tost_id})})
                        }}
                ><DownloadIcon/></Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download Video</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline"
                        onClick={()=>{
                          const tost_id=toast.loading("Please wait")
                          handleDownload(task.video_url,task.title+".wav").then(()=>{toast.success("Download Complete",{id:tost_id})})
                        }}
                ><FileMusic/></Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download Audio</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={()=>{
                  const tost_id=toast.loading("Please wait")
                  deleteTask(tokens.access,task.useduuid).then(res=>{refreshAllTaks(); toast.success(res,{id:tost_id})}).catch(err=>{toast.error(err.message,{id:tost_id})})
                }}><Trash2Icon/></Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </CardContent>
    </Card>
      </TopAnimation>
      </div>
  );
}

export function PendingTaskComponent({task}:Props) {
  return (
    <div className="min-w-0">
      <TopAnimation>
      <Card className=" mx-auto p-3 rounded-md col-span-1 min-w-0 bg-warning/20 text-warning-foreground">
        <CardContent className="p-0">
          <div className="aspect-square flex items-center justify-center">
            <span className="flex items-center justify-center flex-col">
              <Loader2Icon size={40} className="animate-spin py-2"/>
            </span>
          </div>
          <hr className="text-xl"/>
          <div className="parent overflow-x-hidden rounded-b-md p-2">
            <h4 className="scroll-m-20 text-xl font-extrabold tracking-tight truncate child mb-2">
              {task.title}
            </h4>
            <p className="text-sm">Please wait...</p>
          </div>
        </CardContent>
      </Card>
      </TopAnimation>
      </div>
  );
}

export function FailureTaskComponent({task}:Props) {
  const {deleteTask,getSuccessTasks,getFailTasks,getPendingTasks}= userHistoryStore()
  const {tokens}=userAuthStore()
  function refreshAllTaks(){
    getSuccessTasks(tokens.access,1).then().catch(err=>console.log(err))
    getFailTasks(tokens.access,1).then().catch(err=>console.log(err))
    getPendingTasks(tokens.access,1).then().catch(err=>console.log(err))
  }
  return (
    <div className="min-w-0 w-full">
      <TopAnimation>
      <Card className=" mx-auto p-3 rounded-md col-span-1 min-w-0 bg-destructive/20  text-destructive-foreground">
        <CardContent className="p-0">
          <div className="aspect-square flex justify-center items-center w-full">
            <span className="flex flex-col items-center justify-center">

              <TriangleAlertIcon size={40} className=" py-2"/>
              <p className="">Failed to Create</p>
            </span>
          </div>
          <hr className="text-xl"/>
          <div className="parent overflow-x-hidden  rounded-b-md p-2">
            <h4 className="scroll-m-20 text-xl font-extrabold tracking-tight truncate child mb-2">
              {task.title}
            </h4>
            <div className="flex items-center justify-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" onClick={()=>{
                    const tost_id=toast.loading("Please wait")
                    deleteTask(tokens.access,task.useduuid).then(res=>{refreshAllTaks(); toast.success(res,{id:tost_id})}).catch(err=>{toast.error(err.message,{id:tost_id})})

                  }} variant="outline" className="bg-destructive text-destructive-foreground">
                    <Trash2Icon/>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>

            </div>
          </div>
        </CardContent>
      </Card>
      </TopAnimation>
      </div>
  );
}




