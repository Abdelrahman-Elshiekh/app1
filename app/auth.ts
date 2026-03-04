import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { failedlogin, successlogin } from "./types/authinterface";

export const AuthOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            "Content-type": "application/json",
          },
        });

        const payload: failedlogin | successlogin = await response.json();
        console.log(payload);

        if ("token" in payload) {
          return {
            id: payload.token,
            user: payload.user,
            token: payload.token,
          };
        } else {
          throw new Error("error");
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.token = user.token; // نخزن التوكن
        token.user = user.user;

        try {
          const decoded: any = jwt.decode(user.token);
          token.user.id = decoded?.id || decoded?.sub; 
        } catch (err) {
          console.error("Error decoding JWT:", err);
        }
      }
      return token;
    },
    session: ({ token, session }) => {
      session.user = token.user;
      return session;
    },
  },
};