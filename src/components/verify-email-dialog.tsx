import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {userAuthStore} from "@/store/userAuthStore.tsx";
import {toast} from "sonner";



export function VerifyEmailDialog() {
  const {is_authenticated,is_loading,is_verified,get_verification_email}=userAuthStore()
  return (
    <Dialog open={(is_authenticated&&!is_verified&&!is_loading)}  >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify your Email id</DialogTitle>
          <DialogDescription>
            Please verify your email id to access our services
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          {is_loading ? <Button disabled className="">
              <Loader2 className="animate-spin"/>
              Please wait
            </Button> :
            <Button type="submit" className="" onClick={
              ()=>{
                const tost_id=toast.loading("Please Wait")
                get_verification_email().then(res=>{toast.success(res,{id:tost_id})}).catch(err=>{toast.error(err.message,{id:tost_id})})
              }
            }>Continue</Button>
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}