import type { PageServerLoad, Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { createUser, loginUser } from '$lib/server/auth';

export const load: PageServerLoad = (event) => {
  const user = event.locals.user;

  if (user) {
    redirect(302, '/');
  }
};

export const actions: Actions = {
  default: async (event) => {
    const formData = Object.fromEntries(await event.request.formData());

    if (!formData.username || !formData.password) {
      return fail(400, {
        error: 'Brakujący e-mail lub hasło'
      });
    }

    const { username, password } = formData as { username: string; password: string };

    const { error, token } = await loginUser(username, password);

    if (error) {
      return fail(401, {
        error
      });
    }

    // Set the cookie
    event.cookies.set('token', token ?? '', {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 1 day
    });

    throw redirect(302, '/');
  }
};