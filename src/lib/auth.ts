// NextAuth type extensions
declare module "next-auth" {
  interface User {
    authenticated?: boolean
    mfaVerified?: boolean
  }

  interface Session {
    user: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
      authenticated?: boolean
      mfaVerified?: boolean
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    authenticated?: boolean
    mfaVerified?: boolean
  }
}
