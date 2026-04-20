import { backConfig } from "./config";

export const createSessionClient = () => {
    const match = document.cookie.match(/(?:^|; )session=([^;]*)/);
    const sessionId = match ? decodeURIComponent(match[1]) : null;
    
    return sessionId;
}

