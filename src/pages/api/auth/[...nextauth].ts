import NextAuth, { NextAuthOptions } from "next-auth";
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
        const hardCodedUser = {
          id: "1",
          name: "Admin User",
          email: "admin@example.com",
          password: "admin",
        };
        console.log(email);
        if (email === hardCodedUser.email && password === "admin") {
          return hardCodedUser;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, account, profile, user }) {
      if (account?.provider === "credentials") {
        token.email = user?.email;
      }
      console.log(token);
      return token;
    },

    async session({ session, token }) {
      if ("email" in token && session.user) {
        session.user.email = token.email;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
