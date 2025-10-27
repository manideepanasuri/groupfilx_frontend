import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { changePasswordSchema, signupSchema } from "@/app_types/formtypes.ts"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { userAuthStore } from "@/store/userAuthStore.tsx";
import { toast } from "sonner"
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Loader2Icon } from "lucide-react";

interface SignUpProps {
  values: z.infer<typeof signupSchema>,
  phrase: string,
  phrase_answer: string,
}

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [phrase, setPhrase] = useState("");
  const [phrase_answer, setPhraseAnswer] = useState("");

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })
  const { signup, tokens, is_loading } = userAuthStore()
  const navigate = useNavigate()
  useEffect(() => {
    if (tokens.access != "") {
      navigate("/groups");
    }
  })
  function onSubmit(values: z.infer<typeof signupSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const tost_id = toast.loading("Please wait...")
    console.log(values)
    const data : SignUpProps = {values, phrase, phrase_answer};
    signup(data).then(res => { toast.success(res, { id: tost_id }) }).catch(err => { toast.error(err.message, { id: tost_id }) })

  }
  const { get_google_url } = userAuthStore()
  function handleGoogle() {
    const tost_id = toast.loading("Redirecting to Google")
    get_google_url().then((res) => {
      window.location.href = res
    }
    ).catch(err => {
      toast.error(err.message, { id: tost_id })
    })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">

              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome to GroupFlix</h1>
                  <p className="text-muted-foreground text-balance">Discover movies together.</p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Full Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Confirm Password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormItem>
                    <FormLabel>Phrase</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the Phrase" value={phrase}
                        onChange={(e) => setPhrase(e.target.value)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
                <div className="grid gap-3">
                  <FormItem>
                    <FormLabel>Phrase Answer</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the Phrase" value={phrase_answer}
                        onChange={(e) => setPhraseAnswer(e.target.value)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
                {
                  is_loading ? <Button className="w-full" type="button" disabled> <Loader2Icon className="animate-spin" /> Please wait </Button> : <Button type="submit" className="w-full">
                    Sign up
                  </Button>
                }

                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-1">
                  {
                    is_loading ?
                      <Button variant="outline" type="button" disabled className="w-full">
                        <Loader2Icon className="animate-spin" />
                        <span className="sr-only">Continue with Google</span>
                      </Button>
                      :
                      <Button variant="outline" type="button" className="w-full" onClick={handleGoogle}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path
                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="sr-only">Login with Google</span>
                      </Button>
                  }


                </div>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="underline underline-offset-4">
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </Form>

          <div className="bg-muted relative hidden md:block">
            <img
              src="/auth.png"
              alt="Authentication decorative image"
              className="absolute inset-0 w-[100%] object-cover object-center dark:brightness-[0.5] dark:grayscale m-auto"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <Link to="/terms-of-service">Terms of Service</Link>{" "}
        and <Link to="/privacy-policy">Privacy Policy</Link>.
      </div>
    </div>
  )
}

export function ChangePassword({
  className,
  ...props
}: React.ComponentProps<"div">) {


  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })
  const { is_loading, get_change_password_url, verify_change_password } = userAuthStore()

  const navigate = useNavigate()
  function onSubmit(values: z.infer<typeof changePasswordSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const tost_id = toast.loading("Please wait...")
    get_change_password_url(values).then(res => { toast.success(res, { id: tost_id }) }).catch(err => { toast.error(err.message, { id: tost_id }) })

  }
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  useEffect(() => {
    if (token != null) {
      const tost_id = toast.loading("Please wait")
      verify_change_password(token).then(res => {
        toast.success(res, { id: tost_id })
        navigate("/home")
      }).catch(err => {
        toast.error(err.message, { id: tost_id })
        navigate("/login")
      });
    }
  }, [navigate, searchParams, token, verify_change_password]);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">

              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Change Password</h1>
                  <p className="text-muted-foreground text-balance">
                    Change Password
                  </p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Confirm Password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {
                  is_loading ? <Button className="w-full" type="button" disabled> <Loader2Icon className="animate-spin" /> Please wait </Button> : <Button type="submit" className="w-full">
                    Change Password
                  </Button>
                }

                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">

                </div>

                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to="/signup" className="underline underline-offset-4">
                    Signup
                  </Link>
                </div>
              </div>
            </form>
          </Form>

          <div className="bg-muted relative hidden md:block">
            <img
              src="/auth.png"
              alt="Authentication decorative image"
              className="absolute inset-0 w-[100%] object-cover object-center dark:brightness-[0.5] dark:grayscale m-auto"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <Link to="/terms-of-service">Terms of Service</Link>{" "}
        and <Link to="/privacy-policy">Privacy Policy</Link>.
      </div>
    </div>
  )
}
