"use server";

import { Avatars, ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";

const getUserByEmail = async(email:string) => {

    const { tablesDB } = await createAdminClient();
    const result = await tablesDB.listRows(
        appwriteConfig.databaseId,
        appwriteConfig.usersId,
        [Query.equal("email", [email])],

    )

    if (result.total<1) return null;

    return result.rows[0];

}

const handleError = (error:unknown, message:string) => {

    console.log(error, message);
    throw(error);

}

const sendEmailOTP = async(email:string) => {

    const { account } = await createAdminClient();
    try{

        const session = await account.createEmailToken(ID.unique(),email);
        return session.userId;

    } catch(error) {
        handleError(error, "Failed to send OTP")
    }
}

const createAcconut = async({name, email}:{name:string;email:string}) => {

    const existingUser = await getUserByEmail(email);
    const accountId = await sendEmailOTP(email);
    if (!accountId) throw new Error("Failed to send an OTP");
    if (!existingUser) {
        const { tablesDB } = await createAdminClient();
        await tablesDB.createRow(
            appwriteConfig.databaseId,
            appwriteConfig.usersId,
            ID.unique(),
            {   name,
                email,
                profile: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
                accountId,
            }
        )

        return parseStringify({ accountId });
    }

}