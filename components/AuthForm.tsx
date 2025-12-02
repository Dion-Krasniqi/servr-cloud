"use client"
 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { createAccount, signInUser } from "@/lib/actions/user.actions"
import OTPModal from "./OTPModal"

type FormType = 'sign-in' | 'sign-up';

const AuthFormSchema = (formType:FormType) => {
  return z.object({
    email: z.email(),
    password: z.string().min(1).max(50), 
    username: formType === 'sign-up' ? z.string().min(2).max(50) : z.string().optional(),
    
  })
}

const AuthForm = ({ type }:{ type:FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [accountId, setAccountId] = useState(null);

  const formSchema = AuthFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email:"",
      password:"",
    },
  })
 
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setErrMsg('');
    setIsLoading(true);
    try {
      const user = type==='sign-up' ? await createAccount({username:values.username || values.email, email:values.email, password:values.password}) :
      await signInUser({email:values.email, password:values.password});

    } catch(error) {
      setErrMsg('Failed to create account, please try again!')
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-center justify-center">
        <h1 className="h1">
          {type === 'sign-in' ? "Sign In":"Sign Up"}
        </h1>
        {type==='sign-up' && <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
              <div >
                <FormLabel className="text-ring">Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} className="rounded-sm border-ring mt-2 w-full"/>
                </FormControl>
              </div>
                <FormMessage />
            </FormItem>
          )}
        />}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <div >
                <FormLabel className="text-ring">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} className="rounded-sm border-ring mt-2 w-full"/>
                </FormControl>
              </div>
                <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <div >
                <FormLabel className="text-ring">Passowrd</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your password(min 6 characters)" {...field} className="rounded-sm border-ring mt-2 w-full" type="password"/>
                </FormControl>
              </div>
                <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}
                              className="cursor-pointer 
                                         rounded-3xl 
                                         bg-red 
                                         w-full
                                         transition-all duration-300 ease-in-out hover:scale-105">{type === 'sign-in' ? "Sign In":"Sign Up"}
        {isLoading && (<Image src='/globe.svg' alt="loader" width={24} height={24} className="ml-2 animate-spin"/>)}
        </Button>
        {errMsg && (<p>*{errMsg}</p>)}
        <div className="flex justify-center">
          <p>{type === 'sign-in' ? "Don't have an account?":"Already have an account?"}</p>
          <Link href={type === 'sign-in' ? "/sign-up":"/sign-in"} className="font-medium ml-1 text-red">{type === 'sign-in' ? "Sign Up":"Sign In"}</Link>
        </div>
      </form>
      
    </Form>
    </>

  )
}

export default AuthForm