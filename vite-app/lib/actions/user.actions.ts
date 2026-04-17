'use server';

import {  createSessionClient } from "../config";
import { baseLink, parseStringify } from "../utils";
import { cookies } from "next/headers";
import { profilePlaceholder } from "@/constants";
import { redirect } from "next/navigation";
import { User } from "@/types";



const handleError = (error:unknown, message:string) => {

    console.log(error, message);
    throw(error);

}



export const createAccount = async({email, password}:{email:string, password:string}) => {

    const response = await fetch(`${baseLink}/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!response.ok) throw new Error("Failed create account");
    try {
        await signInUser({email,password});
    } catch {
        handleError('', 'Failed to log in')
    } finally {
        redirect('/sing-in')
    }
    

}



export const getCurrentUser = async()=> {

    const token = await createSessionClient();
    const response = await fetch('http://localhost:8001/users-me', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    })
    if (response.status == 401 || response.status == 403 || !response.ok){
        redirect('/sign-in')
    }

    const user: User = await response.json()

    return user;


}

export const signOutUser = async() => {

    try {
        (await cookies()).delete('session');
    } catch (error) {
        handleError(error,'Failed to sign out');
    } finally {
        redirect('/sign-in');
    }
}
export const signInUser = async({email, password}:{email:string, password:string}) => {
    try {
        const token = await sendLoginRequest({email, password});
        if (token) {
            return 1
        }
        return parseStringify({accountId: null, error:'User not found!'});

    } catch (error) {
        handleError(error,'Failed to sign in');
    } 
}

const sendLoginRequest = async({email, password}:{email:string, password:string}) =>{
    
    const response = await fetch(`${baseLink}/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await response.json();
    const cookieStore = await cookies();
        cookieStore.set('session', data.access_token,{
            path:'/',
            httpOnly: true,
            secure:true,
            sameSite:"strict",
        });
    return parseStringify({token:data.access_token});
}
