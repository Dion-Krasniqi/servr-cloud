
export const appwriteConfig = {
    endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
    usersId: process.env.NEXT_PUBLIC_APPWRITE_USERS_TABLE!,
    filesId: process.env.NEXT_PUBLIC_APPWRITE_FILESS_TABLE!,
    bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET!,
    secretKey: process.env.NEXT_APPWRITE_KEY!,
    BACKEND_URL: process.env.FASTAPI_URL,
};
