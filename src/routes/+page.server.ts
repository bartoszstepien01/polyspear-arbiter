import Tournament from '$lib/models/tournament.js';
import { withCache, deleteCache } from '$lib/server/cache.js';

export async function load({ params }) {
    // TODO: It downloads all data of the tournaments. It's unnecessary
    deleteCache('tournaments');
    const tournaments = await withCache(async () => await Tournament.find(), 'tournaments');

    return {
        tournaments: tournaments
    };
}