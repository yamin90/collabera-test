import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      authenticated?: boolean
      mfaVerified?: boolean
    } & DefaultSession["user"]
  }

  interface User {
    authenticated?: boolean
    mfaVerified?: boolean
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    authenticated?: boolean
    mfaVerified?: boolean
  }
}
