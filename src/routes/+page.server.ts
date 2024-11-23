import Tournament from '$lib/models/tournament.js';
import { withCache, deleteCache } from '$lib/server/cache.js';

export async function load({ params }) {
    const tournaments = await withCache(async () => await Tournament.find({}, '_id name'), 'tournaments');

    return {
        tournaments: tournaments
    };
}