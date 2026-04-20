import { baseLink, parseStringify } from "../utils";
import { User } from "../../types";



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
    } 
}
export const getCurrentUser = async(): Promise<User | null> => {

    const response = await fetch('http://localhost:8001/users-me', {
      method: 'GET',
      credentials: 'include',
    })
    if (response.status == 401 || response.status == 403 || !response.ok){
        return null
    }
    if (!response.ok) throw new Error("Failed to get user")

    return response.json();
}
export const signOutUser = async() => {
    //does not exist yet
    await fetch(`${baseLink}/sign-out`, {
        method: 'POST',
        credentials: 'include',
    })

}
// export const signInUser = async({email, password}:{email:string, password:string}) => {
//     try {
//         const token = await sendLoginRequest({email, password});
//         if (token) {
//             return 1
//         }
//         return parseStringify({accountId: null, error:'User not found!'});

//     } catch (error) {
//         handleError(error,'Failed to sign in');
//     } 
// }

const signInUser = async({email, password}:{email:string, password:string}) =>{
    try {
        const response = await fetch(`${baseLink}/sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
        })
        if (!response.ok) throw new Error("Failed to sign in")
        return 1
    } catch (error) {
        handleError(error, "Failed to sign in")
    }
}
