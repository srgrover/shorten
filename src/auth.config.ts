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
    async signIn ({user}) {
      console.log({user})
      if (!user.email) return false;
      
      try {
        const responseUser = await getUserByEmail(user)
        const { ok, user: existingUser } = responseUser;
        console.log({existingUser})
        if (!ok) return false;

        if (!existingUser) {
          const createResponse = await createUser(user);
          const { ok, user: createdUser } = createResponse;
          console.log({createdUser})

          if (!ok) return false;
          return true;
        }
      } catch (error) {
        console.error('Error al iniciar sesión: ', error);
        throw new Error('Error al iniciar sesión.');
      }
      return true;
    },

    async redirect({ url, baseUrl }) {
      // Permite redirecciones relativas
      if (url.startsWith('/')) return `${baseUrl}${url}`;

      // Permite redirecciones a otros dominios si vienen en la URL
      if (new URL(url).origin === baseUrl) return url;
      
      // Si no es ninguno de los anteriores (ej. primer login), redirige a dashboard
      return baseUrl + '/dashboard';
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub!; 
      }
      return session;
    },
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
