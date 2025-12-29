'use server';
import { Account, Avatars, Client, Storage, TablesDB } from "node-appwrite";
import { backConfig } from "./config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export const createSessionClient = async () => {
    const cookieStore = await cookies();
    let sessionId = cookieStore.get('session')?.value;
    if (!sessionId) {
        redirect('/sign-in');
    }
    return sessionId;
}

