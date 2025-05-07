// Set runtime to nodejs to avoid Prisma Edge Runtime issues
export const runtime = "nodejs"; // This is critical for Prisma to work properly

import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import bcryptjs from 'bcryptjs'
import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { UserRole } from "@prisma/client"

// Custom adapter that extends PrismaAdapter to handle OAuth providers
function customPrismaAdapter(prismaClient) {
  const standardAdapter = PrismaAdapter(prismaClient);
  
  return {
    ...standardAdapter,
    createUser: async (data) => {
      // Remove undefined fields to prevent Prisma validation errors
      const userData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined)
      );
      
      // Let Prisma handle default values and nulls for optional fields
      return await prismaClient.user.create({
        data: userData,
      });
    },
  };
}

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
  adapter: customPrismaAdapter(prisma),
  session: { strategy: "jwt" },
  basePath: "/api/auth",
  secret: process.env.AUTH_SECRET,
  // Use AUTH_URL if available, or fallback to NEXTAUTH_URL
  trustHost: true,
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  callbacks: {
    authorized({ auth, request }) {
      const { nextUrl } = request;
      const isLoggedIn = !!auth?.user;
      
      // Public routes - always accessible
      const isAuthRoute = nextUrl.pathname.startsWith('/auth');
      if (isAuthRoute) return true;
      
      // Protected routes need authentication
      const isApiRoute = nextUrl.pathname.startsWith('/api');
      const isDashboardRoute = nextUrl.pathname.startsWith('/dashboard');
      
      if (isDashboardRoute || isApiRoute) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      
      // Default: allow access
      return true;
    },
    
    jwt({ token, user }) {
      try {
        // Ensure token has a sub field
        if (!token.sub && user?.id) {
          token.sub = user.id;
        }

        if (user) {
          // Store essential user info directly on token for robustness
          token.id = user.id;
          token.email = user.email || token.email;
          token.name = user.name || token.name;
          token.role = user.role || token.role || "user";
          token.picture = user.image || token.picture;
        }

        return token;
      } catch (error) {
        console.error('Error in JWT callback:', error);
        // Return the token unchanged if there's an error
        return token;
      }
    },

    session({ session, token }) {
      try {
        if (token && session.user) {
          // Ensure all user properties are properly set from token
          session.user.id = token.sub || token.id as string || "";
          session.user.name = token.name as string || "";
          session.user.email = token.email as string || "";
          session.user.role = (token.role as UserRole) || "user";
          
          // Add image if available
          if (token.picture) {
            session.user.image = token.picture as string;
          }
        }
        return session;
      } catch (error) {
        console.error('Error in session callback:', error);
        // Return a basic valid session if there's an error
        if (session.user && !session.user.id && token?.sub) {
          session.user.id = token.sub;
        }
        return session;
      }
    }
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID ?? '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? '',
      allowDangerousEmailAccountLinking: true, // Allow linking accounts with the same email
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID ?? '',
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? '',
      allowDangerousEmailAccountLinking: true, // Allow linking accounts with the same email
    }),
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (!parsedCredentials.success) return null
        
        const { email, password: userPassword } = parsedCredentials.data

        // Buscar el correo
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() }
        })

        if (!user) return null;
        
        // Comparar contraseñas
        if(!bcryptjs.compareSync(userPassword, user.password ?? '')) return null;

        // Devolver usuario sin el password
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...rest } = user;
        return rest;
      },
    }),
  ],
})