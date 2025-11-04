'use server';
import { Account, Avatars, Client, Storage, TablesDB } from "node-appwrite";
import { appwriteConfig } from "./config";
import { cookies } from "next/headers";


export const createSessionClient = async () => {
    const client = new Client().setEndpoint(appwriteConfig.endpointUrl).setProject(appwriteConfig.projectId);
    const cookieStore = await cookies();
    let sessionId = cookieStore.get('appwrite-session')?.value;
    if (!sessionId) throw new Error("No session!");

    client.setSession(sessionId);

    return {
        get account(){
            return new Account(client);
        },
        get tablesDB(){
            return new TablesDB(client);
        },
    }
}

export const createAdminClient = async() => {
    const client = new Client().setEndpoint(appwriteConfig.endpointUrl)
                               .setProject(appwriteConfig.projectId)
                               .setKey(appwriteConfig.secretKey);

   

    return {
        get account(){
            return new Account(client);
        },
        get tablesDB(){
            return new TablesDB(client);
        },
        get storage(){
            return new Storage(client);
        },
        get profiles(){
            return new Avatars(client);
        }
    }
}