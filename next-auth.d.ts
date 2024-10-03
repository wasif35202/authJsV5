import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
id: string;
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

























// types/next-auth.d.ts

// import { DefaultSession } from "next-auth";
// import { UserRole } from "@prisma/client";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       role: UserRole; // Comment: Add role to the session's user object
//     } & DefaultSession["user"]; // Comment: Inherit other default user properties
//   }

//   interface JWT {
//     role: UserRole; // Comment: Add role to the JWT payload
//   }
// }
