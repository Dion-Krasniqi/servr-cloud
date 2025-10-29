import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React, { useState } from "react";



const OTPModal = ({accountId, email}:{accountId:string;email:string}) => {
    const [isOpen, setisOpen] = useState(true);
    const [password, setpassword] = useState('');
    const [isLoading, setisLoading] = useState(false);

    const handleSumbit = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setisLoading(true);

        try {

        } catch (error) {
            console.log('Failed to verify', error);
        }

        setisLoading(false);

    }

    const handleResent = async() => {

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
                <InputOTPSlot index={0} className=" font-smbold text-red rounded-md "/>
                <InputOTPSlot index={3} className=" font-smbold text-red rounded-md "/>
                <InputOTPSlot index={4} className=" font-smbold text-red rounded-md "/>
                <InputOTPSlot index={5} className=" font-smbold text-red rounded-md "/>
            </InputOTPGroup>
        </InputOTP>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}

export default OTPModal