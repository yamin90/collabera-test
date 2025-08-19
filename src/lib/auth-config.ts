import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        authenticated: { label: "Authenticated", type: "text" },
        mfaVerified: { label: "MFA Verified", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.authenticated) {
          return null
        }

        const { username, authenticated, mfaVerified } = credentials

        const normalizedUsername = username.trim().toLowerCase()

        if (authenticated === "true") {
          return {
            id: normalizedUsername,
            name: username,
            email: `${normalizedUsername}@example.com`,
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
    strategy: "jwt" as const,
    maxAge: 2 * 60 * 60, // 2 hours
  },
  secret: process.env.NEXTAUTH_SECRET || "default-nextauth-secret-for-development",
}
