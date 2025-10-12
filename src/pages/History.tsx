import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {useEffect,useState} from "react";
import {userAuthStore} from "@/store/userAuthStore.tsx";
import {userHistoryStore} from "@/store/historyStory.tsx";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink, PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination.tsx";
import {FailureTaskComponent, PendingTaskComponent, SuccessTaskComponent} from "@/components/task_componet.tsx";

import {Button} from "@/components/ui/button.tsx";
import {RefreshCcw, WindIcon} from "lucide-react";

function History() {
  const {tokens} = userAuthStore()
  const {getSuccessTasks, successTasks, getPendingTasks, pendingTasks, getFailTasks, failTasks} = userHistoryStore()
  const [loading1,setLoading1] = useState<boolean>(false)
  const [loading2,setLoading2] = useState<boolean>(false)
  const [loading3,setLoading3] = useState<boolean>(false)
  function refreshAllTaks() {
    setLoading1(true)
    setLoading2(true)
    setLoading3(true)
    getSuccessTasks(tokens.access, 1).then(()=>{setLoading1(false)}).catch(err => {setLoading1(false); console.log(err)})
    getFailTasks(tokens.access, 1).then(()=>{setLoading2(false)}).catch(err => {
      setLoading2(false);
      console.log(err)
    })
    getPendingTasks(tokens.access, 1).then(()=>{setLoading3(false)}).catch(err => {
      setLoading3(false);console.log(err);
    })
  }

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: "smooth"});
  };
  useEffect(() => {
    refreshAllTaks()
  }, [])
  return (
    <Tabs defaultValue="success" className=" flex-1">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="success">Success</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="failure">Failure</TabsTrigger>
        </TabsList>
        <Button onClick={refreshAllTaks}  ><RefreshCcw className={(loading1&&loading2&&loading3?"animate-spin":"")+" direction-reverse"}/> Refresh</Button>
      </div>
      <TabsContent value="success" className="h-full flex flex-col items-center justify-between">
        {successTasks.results.length == 0 ? <div className="flex-1 flex items-center justify-center">
          <span className="flex items-center justify-center gap-2">
            <WindIcon size={40}/>
            <h2 className="scroll-m-20 text-center text-2xl font-extrabold tracking-tight text-nowrap inline">
       Nothing Here...
    </h2>
          </span>
          </div>
            :
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 flex-1 w-full ">
              {successTasks.results.map((task) => (<SuccessTaskComponent key={task.id} task={task}/>))}
            </div>
        }

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => {
                getSuccessTasks(tokens.access, -2).then(() => {
                  scrollToTop()
                })
              }} to="/history"/>
            </PaginationItem>
            {Array.from({length: successTasks.total_pages}, (_, i) => (
              <PaginationItem>
                <PaginationLink to="/history" onClick={() => {
                  getSuccessTasks(tokens.access, i + 1).then(() => {
                    scrollToTop()
                  })
                }} isActive={(successTasks.current_page === (i + 1))}>{i + 1}</PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext onClick={() => {
                getSuccessTasks(tokens.access, -1).then(() => {
                  scrollToTop()
                })
              }} to="/history"/>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </TabsContent>
      <TabsContent value="pending" className="h-full flex flex-col items-center justify-between">
        {pendingTasks.results.length == 0 ? <div className="flex-1 flex items-center justify-center">
          <span className="flex items-center justify-center gap-2">
            <WindIcon size={40}/>
            <h2 className="scroll-m-20 text-center text-2xl font-extrabold tracking-tight text-nowrap inline">
       Nothing Here...
    </h2>
          </span>
          </div>
          :
          <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 flex-1 w-full">
            {pendingTasks.results.map((task) => (<PendingTaskComponent key={task.id} task={task}/>))}
          </div>
        }
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => {
                getPendingTasks(tokens.access, -2).then(() => {
                  scrollToTop()
                })
              }} to="/history"/>
            </PaginationItem>
            {Array.from({length: pendingTasks.total_pages}, (_, i) => (
              <PaginationItem>
                <PaginationLink to="/history" onClick={() => {
                  getPendingTasks(tokens.access, i + 1).then(() => {
                    scrollToTop()
                  })
                }} isActive={(pendingTasks.current_page === (i + 1))}>{i + 1}</PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext onClick={() => {
                getPendingTasks(tokens.access, -1).then(() => {
                  scrollToTop()
                })
              }} to="/history"/>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </TabsContent>
      <TabsContent value="failure" className="h-full flex flex-col items-center justify-between">
        {failTasks.results.length == 0 ? <div className="flex-1 flex items-center justify-center w-full">
          <span className="flex items-center justify-center gap-2">
            <WindIcon size={40}/>
            <h2 className="scroll-m-20 text-center text-2xl font-extrabold tracking-tight text-nowrap inline">
       Nothing Here...
    </h2>
          </span>
          </div>
          :
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 flex-1 w-full">
          {failTasks.results.map((task) => (<FailureTaskComponent key={task.id} task={task}/>))}
        </div>}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => {
                getFailTasks(tokens.access, -1).then(() => {
                  scrollToTop()
                })
              }} to="/history"/>
            </PaginationItem>
            {Array.from({length: failTasks.total_pages}, (_, i) => (
              <PaginationItem>
                <PaginationLink to="/history" onClick={() => {
                  getFailTasks(tokens.access, i + 1).then(() => {
                    scrollToTop()
                  })
                }} isActive={(failTasks.current_page === (i + 1))}>{i + 1}</PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext onClick={() => {
                getFailTasks(tokens.access, -1).then(() => {
                  scrollToTop()
                })
              }} to="/history"/>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </TabsContent>

    </Tabs>
  );
}

export default History;