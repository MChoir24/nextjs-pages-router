import { signInUser, signInWithGoogle } from "@/lib/firebase/service";
import NextAuth, { NextAuthOptions } from "next-auth";
import CreadentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, account, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user?.email;
        token.role = user?.role;
      }
      if (account?.provider === "google") {
        await signInWithGoogle(
          {
            email: token.email,
            name: token.name,
            password: "", // No password for Google sign-in
          },
          (response) => {
            if (response.status) {
              token.id = user?.id;
              token.email = user?.email;
              token.name = user?.name;
              token.image = user?.image;
              token.type = "google";
            }
          },
        );
      }

      return token;
    },

    /**
     * Callback invoked whenever session is checked.
     * The session object is populated by NextAuth with user data from the JWT token,
     * which is created during the signIn callback. The session.user data originates from
     * the user object returned by your authentication provider (e.g., database query, OAuth provider).
     * Use this callback to add or modify session data before it's returned to the client.
     *
     * @param session - The session object containing user information
     * @param token - The JWT token containing encoded user data
     * @returns The modified session object
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      if ("email" in token && session.user) {
        session.user.email = token.email; // already set by NextAuth
      }
      if ("role" in token && session.user) {
        session.user.role = token.role; // add custom role to session user
      }
      console.log("session callback", session);
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
