'use server'

import { signIn } from '@/auth.config'

export const login = async (provider: string, formData?: FormData) => {  
  try {
    // For credential provider, get email and password from formData
    if (provider === 'credentials' && formData) {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      
      if (!email || !password) {
        return {
          ok: false,
          message: 'Email and password are required'
        };
      }
      
      return await signIn('credentials', {
        email,
        password,
        redirectTo: '/dashboard'
      });
    }
    
    // For OAuth providers
    await signIn(provider, {
      redirectTo: '/dashboard'
    })
    
    return {
      ok: true
    }
  } catch (error) {
    console.error('Error during sign in:', error)
    return {
      ok: false,
      message: 'Error during sign in. Please try again.'
    }
  }
}
