import NextAuth, { type NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

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
    async redirect({ url, baseUrl }) {
      // Permite redirecciones relativas
      if (url.startsWith('/')) return `${baseUrl}${url}`;

      // Permite redirecciones a otros dominios si vienen en la URL
      if (new URL(url).origin === baseUrl) return url;
      
      // Si no es ninguno de los anteriores (ej. primer login), redirige a dashboard
      return baseUrl + '/dashboard';
    },
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
