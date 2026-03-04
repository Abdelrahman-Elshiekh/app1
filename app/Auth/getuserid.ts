// app/utils/getUserId.ts
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserId() {
  const authtoken = (await cookies()).get("next-auth.session-token")?.value;

  if (!authtoken) {
    throw new Error("No session token found");
  }
  const userid = await decode({
    token: authtoken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  if (!userid?.id) {
    throw new Error("User ID not found in token");
  }
  return userid.id;
}
