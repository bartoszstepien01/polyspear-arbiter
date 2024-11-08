import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = (event) => {
  const user = event.locals.user;

  if (user) {
    // TODO: Change this method of logging user out
    // This method is insufficient and doesn't handle
    // various cases when we would like a user to be logged out.
    // Token blacklist should be implemented
    event.cookies.delete('token', { path: '/' });
  }

  redirect(302, '/');
};