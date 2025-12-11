import NextAuth, { type NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { createUser, getUserByEmail } from './actions';

const config: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) { // user is only available on first sign in
        try {
          const responseUser = await getUserByEmail(user);

          if (responseUser.ok && responseUser.user) {
            token.id = responseUser.user.id;
          }
        } catch (error) {
            console.error('Error adding id to token: ', error)
        }
      }
      return token;
    },

    async signIn({ user }) {
      if (!user.email) return false;
    
      try {
        const responseUser = await getUserByEmail(user);
        const { user: existingUser } = responseUser;
    
        if (existingUser) {
          return true; 
        }
    
        const createResponse = await createUser(user);
        if (!createResponse.ok) {
          console.error('Error al crear el usuario:', createResponse.message);
          return false;
        }
    
        return true;
    
      } catch (error) {
        console.error('Error al iniciar sesión: ', error);
        return false;
      }
    },

    async redirect({ url, baseUrl }) {
      // Allows relative redirects
      if (url.startsWith('/')) return `${baseUrl}${url}`;

      // Allows redirects to other domains if they are in the URL
      if (new URL(url).origin === baseUrl) return url;
      
      // If none of the above (e.g. first login), redirect to dashboard
      return baseUrl + '/dashboard';
    },

    async session({ session, token }) {
      if (session?.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);