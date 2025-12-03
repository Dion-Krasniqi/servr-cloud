'use server';

import { Avatars, ID, Query, TablesDB } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig} from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";
import { profilePlaceholder } from "@/constants";
import { redirect } from "next/navigation";
import { User } from "@/types";



const handleError = (error:unknown, message:string) => {

    console.log(error, message);
    throw(error);

}



export const createAccount = async({username, email, password}:{username:string;email:string, password:string}) => {

    const response = await fetch(`http://127.0.0.1:8000/create_user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
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
    const response = await fetch(`http://127.0.0.1:8000/users/me`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    })

    const user: User = await response.json()
    return user;


}

export const signOutUser = async() => {

    const token = await createSessionClient();

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
    const user = [{'user':'user'}];
    // move from the appwrite config eventually
    const response = await fetch(`http://127.0.0.1:8000/token`, {
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
    return parseStringify({token:data.access_token, type:data.token_type});
}
