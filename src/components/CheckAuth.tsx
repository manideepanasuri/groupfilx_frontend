import { userAuthStore } from "@/store/userAuthStore.tsx";
import { type ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { VerifyEmailDialog } from "@/components/verify-email-dialog.tsx";
type Props = {
  children: ReactNode;
};
export function AllowAuthenticated({ children }: Props) {
  const { is_authenticated } = userAuthStore()
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(is_authenticated)
    if (!is_authenticated) { navigate("/login") }

  }, [is_authenticated, navigate]);
  return (
    <>
      <VerifyEmailDialog />
      {children}
    </>
  );
}
export function AllowUnAuthenticated({ children }: Props) {
  const { is_authenticated } = userAuthStore()
  const navigate = useNavigate();
  useEffect(() => {
    if (is_authenticated) { navigate("/groups") }
  }, [is_authenticated, navigate]);
  return (
    <>
      {children}
    </>
  );
}
