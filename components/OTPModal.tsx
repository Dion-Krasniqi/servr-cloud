"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { sendEmailOTP, verifySecret } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";



const OTPModal = ({accountId, email}:{accountId:string;email:string}) => {
    const [isOpen, setisOpen] = useState(true);
    const [password, setpassword] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const router = useRouter();

    const handleSumbit = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setisLoading(true);

        try {
          const sessionId = await verifySecret({accountId, password});
          if (sessionId) router.push('/');

        } catch (error) {
            console.log('Failed to verify', error);
        }

        setisLoading(false);

    }

    const handleResent = async() => {

      await sendEmailOTP({email});

    }

  return (
    
    <AlertDialog open={isOpen} onOpenChange={setisOpen}>
        <AlertDialogContent>
            <AlertDialogHeader className="relative flex justify-center ">
                <AlertDialogTitle className="flex flex-row justify-between">
                    <p className="font-bold text-lg">Enter your code</p>
                    <p className="cursor-pointer text-black text-xs" onClick={()=>setisOpen(false)}>Close</p>
                </AlertDialogTitle>
                <AlertDialogDescription className="subtitle-2 text-center">
        A code has been sent to <span className="pl-1">{email}</span>
            </AlertDialogDescription>
            </AlertDialogHeader>
        <InputOTP maxLength={6} value={password} onChange={setpassword}>
            <InputOTPGroup >
                <InputOTPSlot index={1} className=" font-smbold text-red rounded-md "/>
                <InputOTPSlot index={2} className=" font-smbold text-red rounded-md "/>
                <InputOTPSlot index={3} className=" font-smbold text-red rounded-md "/>
                <InputOTPSlot index={4} className=" font-smbold text-red rounded-md "/>
                <InputOTPSlot index={5} className=" font-smbold text-red rounded-md "/>
                <InputOTPSlot index={6} className=" font-smbold text-red rounded-md "/>
            </InputOTPGroup>
        </InputOTP>
    <AlertDialogFooter>
      <div className="flex items-center">
        <div>
          <Button type="button" variant="link" onClick={handleResent} className="cursor-pointer text-xs">Resend Code</Button>
        </div>
        <AlertDialogAction onClick={handleSumbit} type="button" className="cursor-pointer">Submit
          {isLoading && (<Image src='/globe.svg' alt="loader" width={24} height={24} className="ml-2 animate-spin"/>)}
        </AlertDialogAction>
        
      </div>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}

export default OTPModal