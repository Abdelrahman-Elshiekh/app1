import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedpages=['/cart','/wishlist','/profile']

const authpages = ["/login", "/register", ];


export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (protectedpages.includes(req.nextUrl.pathname)) {
    if (token) {
      return NextResponse.next();
    } else {
      let redirecturl = new URL("/login", process.env.NEXTAUTH_URL);
       redirecturl.searchParams.set("callback-url", req.nextUrl.pathname);  
      return NextResponse.redirect(redirecturl);
    }
  }
  if (authpages.includes(req.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.next();
    } else {
      const redirecturl = new URL("/", process.env.NEXTAUTH_URL);
     
      return NextResponse.redirect(redirecturl);
    }
  }

  return NextResponse.next();
}