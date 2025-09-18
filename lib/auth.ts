import { getServerSession } from "next-auth";
import authOptions from "./options";

export async function requireAuth(){
    const session = await getServerSession(authOptions)
    if(!session){
        throw new Error("unauthorized")
    }
    return session;
}