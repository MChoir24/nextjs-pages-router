import { signInUser } from "@/lib/firebase/service";
import { sign } from "crypto";
import NextAuth, { NextAuthOptions, User } from "next-auth";
import { UserData } from "next-auth/providers/42-school";
import CreadentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CreadentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user = await signInUser(email, password);
        return user;
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwt({ token, account, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user?.email;
        token.role = user?.role;
      }
      console.log(token);
      return token;
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      if ("email" in token && session.user) {
        session.user.email = token.email;
      }
      if ("role" in token && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
