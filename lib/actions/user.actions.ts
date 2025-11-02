"use server";

import { Avatars, ID, Query, TablesDB } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";
import { profilePlaceholder } from "@/constants";
import { redirect } from "next/navigation";

const getUserByEmail = async(email:string) => {

    const { tablesDB } = await createAdminClient();
    const result = await tablesDB.listRows(
        appwriteConfig.databaseId,
        appwriteConfig.usersId,
        [Query.equal("Email", [email])],

    )

    if (result.total<1) return null;

    return result.rows[0];

}

const handleError = (error:unknown, message:string) => {

    console.log(error, message);
    throw(error);

}

export const sendEmailOTP = async({email}:{email:string}) => {

    const { account } = await createAdminClient();
    try{

        const session = await account.createEmailToken(ID.unique(),email);
        return session.userId;

    } catch(error) {
        handleError(error, "Failed to send OTP")
    }
}

export const createAcconut = async({name, email}:{name:string;email:string}) => {

    const existingUser = await getUserByEmail(email);
    const accountId = await sendEmailOTP({email});
    if (!accountId) throw new Error("Failed to send an OTP");
    if (!existingUser) {
        const { tablesDB } = await createAdminClient();
        await tablesDB.createRow(
            appwriteConfig.databaseId,
            appwriteConfig.usersId,
            ID.unique(),
            {   "Name":name,
                "Email":email,
                "Profile":profilePlaceholder,
                "AccountId":accountId,
            }
        )

        return parseStringify({ accountId });
    }

}

export const verifySecret = async({accountId,password}:{accountId:string;password:string})=> {

    try {

        const { account } = await createAdminClient();
        const session = await account.createSession(accountId, password);

        (await cookies()).set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify({sessionId: session.$id});

    } catch (error) {

        handleError(error,'Failed to verify OTP');

    }

}

export const getCurrentUser = async()=> {

    const {tablesDB,account} = await createSessionClient();
    const result = await account.get();

    const user = await tablesDB.listRows(
        appwriteConfig.databaseId,
        appwriteConfig.usersId,
        [Query.equal('AccountId', result.$id)],
    );

    if (user.total <= 0) {
        return null;
    }

    return parseStringify(user.rows[0]);


}

export const signOutUser = async() => {

    const { account } = await createSessionClient();

    try {
        await account.deleteSessions();
        (await cookies()).delete('appwrite-session');
    } catch (error) {
        handleError(error,'Failed to sign out');
    } finally {
        redirect('/sign-in');
    }
}
export const signInUser = async({email}:{email:string}) => {
    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            await sendEmailOTP({email});
            return parseStringify({accountId: existingUser.accountId});
        }
        return parseStringify({accountId: null, error:'User not found!'});

    } catch (error) {
        handleError(error,'Failed to sign in');
    }
}
