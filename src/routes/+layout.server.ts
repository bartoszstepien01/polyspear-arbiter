import type { ServerLoadEvent } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = (event: ServerLoadEvent) => {
  const user = event.locals.user;

  return {
    user: user,
    url: event.url.pathname
  };
};