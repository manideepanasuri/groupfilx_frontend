import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {userAuthStore} from "@/store/userAuthStore.tsx";
import {Loader2Icon} from "lucide-react";
import {toast} from "sonner";


export function GoogleSuccessAuth() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const {verify_google}=userAuthStore()
  const navigate = useNavigate();
  useEffect(() => {
    if(token!=null){
        const tost_id=toast.loading("Please wait")
        verify_google(token).then(res=>{
          toast.success(res,{id:tost_id})
          navigate("/groups")
        }).catch(err=>{
          toast.error(err.message,{id:tost_id})
          navigate("/login")
        });
    }
  }, [navigate, searchParams, token, verify_google]);
  return (
    <div className="flex-1 flex items-center justify-center">
          <span className="flex items-center justify-center gap-2">
            <Loader2Icon className="animate-spin" size={40}/>
            <h2 className="scroll-m-20 text-center text-2xl font-extrabold tracking-tight text-nowrap inline">
       Authenticating...
    </h2>
          </span>
    </div>
  );
}


export function GoogleFailureAuth() {
  return (
    <div className="flex-1"></div>
  );
}