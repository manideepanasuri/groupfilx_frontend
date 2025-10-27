import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/app_types/formtypes.ts";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { userAuthStore } from "@/store/userAuthStore.tsx";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2Icon } from "lucide-react";


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { login, tokens, is_loading, get_google_url, phrase, name, phrase_check } = userAuthStore();
  const navigate = useNavigate();
  const [phraseAnswer, setPhraseAnswer] = useState("");

  useEffect(() => {
    if (tokens.access !== "") {
      navigate("/groups");
    }
  }, [navigate, tokens]);

  function onSubmit(values: z.infer<typeof loginSchema>) {
    const toast_id = toast.loading("Logging in... Please wait");
    login(values)
      .then((res) => {
        toast.success("Password matched", { id: toast_id });
      })
      .catch((err) => {
        toast.error(err.message, { id: toast_id });
      });
  }

  function handleGoogle() {
    const toast_id = toast.loading("Redirecting to Google");
    get_google_url()
      .then((res) => {
        window.location.href = res;
      })
      .catch((err) => {
        toast.error(err.message, { id: toast_id });
      });
  }

  function onPhraseSubmit(){
    const toast_id = toast.loading("Checking Phrase... Please wait");
    phrase_check(phraseAnswer)
      .then((res) => {
        toast.success("Phrase Answer matched", { id: toast_id });
      })
      .catch((err) => {
        toast.error(err.message, { id: toast_id });
      });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-6 md:p-8"
              noValidate
            >
              <div>
                {!phrase ? <div>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-2xl font-bold">Welcome to GroupFlix</h1>
                      <p className="text-muted-foreground text-balance">
                        Please login to your account and start enjoying shared movie recommendations with your groups.
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
                    <div className="text-sm">
                      Forgot password?{" "}
                      <Link to="/change-password" className="underline underline-offset-4">
                        Change it here
                      </Link>
                    </div>
                    {is_loading ? (
                      <Button className="w-full" type="button" disabled>
                        <Loader2Icon className="animate-spin" /> Logging in...
                      </Button>
                    ) : (
                      <Button type="submit" className="w-full">
                        Login
                      </Button>
                    )}
                    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                      <span className="bg-card text-muted-foreground relative z-10 px-2">
                        Or continue with
                      </span>
                    </div>
                    <div className="grid grid-cols-1">
                      {is_loading ? (
                        <Button variant="outline" type="button" disabled className="w-full">
                          <Loader2Icon className="animate-spin" />
                          <span className="sr-only">Login with Google</span>
                        </Button>
                      ) : (
                        <Button variant="outline" type="button" className="w-full" onClick={handleGoogle}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                              fill="currentColor"
                            />
                          </svg>
                          <span className="sr-only">Login with Google</span>
                        </Button>
                      )}
                    </div>
                    <div className="text-center text-sm">
                      New to GroupFlix?{" "}
                      <Link to="/signup" className="underline underline-offset-4">
                        Sign up
                      </Link>
                    </div>
                  </div>
                </div> :
                  <div className="flex flex-col gap-2 min-h-100 justify-center items-center">
                    <div>
                      <h1 className="text-xl font-bold">Hello {name}</h1>
                    </div>
                    <div>
                      <h3 className="text-lg">{phrase}</h3>
                    </div>
                    <div className="">
                      <Input
                        type="text"
                        value={phraseAnswer}
                        onChange={(e) => setPhraseAnswer(e.target.value)}
                        placeholder="Enter your phrase answer"
                        className="w-full pl-12 pr-4 py-3 bg-muted border border-input rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition"
                      />
                    </div>
                    <Button onClick={onPhraseSubmit}>
                      Verify
                    </Button>
                    </div>
              }
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
  );
}
