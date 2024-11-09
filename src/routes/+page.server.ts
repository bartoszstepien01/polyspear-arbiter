import Tournament from '$lib/models/tournament.js';
import { withCache } from '$lib/server/cache.js';

export async function load({ params }) {
    // TODO: It downloads all data of the tournaments. It's unnecessary
    const tournaments = await withCache(async () => await Tournament.find(), 'tournaments');

    return {
        tournaments: tournaments
    };
}