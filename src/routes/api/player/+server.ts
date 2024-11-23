import { error, type RequestHandler } from '@sveltejs/kit';
import Player from '$lib/models/player.js';
import { requireApiAuthentication } from '$lib/server/auth';
import { deleteCache } from '$lib/server/cache';

export const POST: RequestHandler = async ({ request, locals }) => {
    requireApiAuthentication(locals);

    const json = await request.json();

    const name = json["name"];
    const country = json["country"];

    const newPlayer = await Player.create({
        name: name,
        country: country
    });

    deleteCache('players');

    return new Response(JSON.stringify(newPlayer));
}