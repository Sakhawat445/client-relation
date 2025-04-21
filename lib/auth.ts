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
//         secure: true, // disables __Secure- prefix
//       },
//     },
//   },
  
// };

import NextAuth, { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Extend JWT to include custom user data
declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      name: string;
      email: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      id: string;
      name: string;
      email: string;
    };
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Replace with your real authentication logic
        const user = {
          id: "1",
          name: "Test",
          email: "test@example.com",
        };

        if (credentials?.email === user.email && credentials?.password === "123456") {
          return user;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name || "Unknown", // Provide a default value if name is null or undefined
          email: user.email || "Unknown", // Provide a default value if email is null or undefined
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
