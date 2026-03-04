import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getAccessToken(){

 const authtoken = (await cookies()).get("next-auth.session-token")?.value;
const token =await decode({
    token:authtoken,
    secret:process.env.NEXTAUTH_SECRET!,
})


return  token?.token
}
// __Secure-next-auth.session-token
// next-auth.session-token