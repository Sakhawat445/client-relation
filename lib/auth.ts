// import { AuthOptions } from "next-auth";
// import bcrypt from "bcrypt";
// import CredentialsProvider from "next-auth/providers/credentials";
// import prisma from "./prisma";
// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//       role: string | null;
//     };
//   }

//   interface User {
//     id: string;
//     name?: string | null;
//     email?: string | null;
//     password?: string | null;
//   }
// }

// export const authOptions: AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Missing credentials");
//         }

//         const user = await prisma.user.findFirst({
//           where: { email: credentials.email },
//           select: { id: true, name: true, email: true, password: true },
//         });

//         if (!user || !user.password) {
//           throw new Error("Invalid credentials");
//         }

//         const correctPassword = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!correctPassword) {
//           throw new Error("Invalid credentials");
//         }

//         return { id: user.id, name: user.name, email: user.email };
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     signIn: "/login",
//   },
//   debug: process.env.NODE_ENV !== "production",
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token && session.user) {
//         session.user.id = token.id as string;
//         session.user.role = token.role as "ADMIN" | "EMPLOYEE";
//       }
//       return session;
//     },
//   },
//   cookies: {
//     sessionToken: {
//       name: "next-auth.session-token",
//       options: {
//         httpOnly: true,
//         sameSite: "lax",
//         path: "/",
//         secure: false, // disables __Secure- prefix
//       },
//     },
//   },
  
// };
// pages/api/auth/[...nextauth].ts

// pages/api/auth/[...nextauth].ts

import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "./prisma"; // adjust path as needed

// ————— Extend Types —————
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    password?: string | null;
  }
}

// ————— Auth Options —————
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }
        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
          select: { id: true, name: true, email: true, password: true },
        });
        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }
        const valid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!valid) {
          throw new Error("Invalid credentials");
        }
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  debug: process.env.NODE_ENV !== "production",

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // 1) relative urls
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // 2) same-origin absolute
      if (new URL(url).origin === baseUrl) return url;
      // 3) fallback
      return baseUrl;
    },
  },

  // ————— Explicit Cookie Definitions —————
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        domain: "client-relation-sakhawat.vercel.app",
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      },
    },
    csrfToken: {
      name: "next-auth.csrf-token",
      options: {
        httpOnly: false,
        sameSite: "lax",
        path: "/",
        secure: false,
      },
    },
    callbackUrl: {
      name: "next-auth.callback-url",
      options: {
        httpOnly: false,
        sameSite: "lax",
        path: "/",
        secure: false,
      },
    },
  },

  // turn off __Secure- / __Host- entirely
  useSecureCookies: false,
};

export default NextAuth(authOptions);
