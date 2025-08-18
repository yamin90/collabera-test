import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        authenticated: { label: "Authenticated", type: "text" },
        mfaVerified: { label: "MFA Verified", type: "text" },
      },
      async authorize(credentials) {
        // This is called after successful login and MFA
        // We'll handle the actual validation in our custom APIs
        if (!credentials?.username || !credentials?.authenticated) {
          return null
        }

        const { username, authenticated, mfaVerified } = credentials

        if (authenticated === "true") {
          return {
            id: username,
            name: username,
            email: `${username}@example.com`,
            authenticated: authenticated === "true",
            mfaVerified: mfaVerified === "true",
          }
        }
        return null
      },
    }),
  ],
  callbacks: {
    // biome-ignore lint/suspicious/noExplicitAny: NextAuth v4 compatibility
    async jwt({ token, user }: { token: any; user?: any }) {
      // Persist user data to token
      if (user) {
        token.authenticated = user.authenticated
        token.mfaVerified = user.mfaVerified
      }
      return token
    },
    // biome-ignore lint/suspicious/noExplicitAny: NextAuth v4 compatibility
    async session({ session, token }: { session: any; token: any }) {
      // Send properties to client
      if (session.user) {
        session.user.authenticated = token.authenticated as boolean
        session.user.mfaVerified = token.mfaVerified as boolean
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, // 2 hours
  },
  secret: process.env.NEXTAUTH_SECRET || "default-nextauth-secret-for-development",
}

// @ts-ignore - NextAuth v4 compatibility
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
