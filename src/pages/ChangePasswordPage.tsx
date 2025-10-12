import {ChangePassword} from "@/components/signup-form.tsx";


function ChangePasswordPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <ChangePassword/>
      </div>
    </div>
  );
}

export default ChangePasswordPage;