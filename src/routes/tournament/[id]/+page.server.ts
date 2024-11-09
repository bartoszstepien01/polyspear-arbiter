import mongoose from 'mongoose';
import { error } from '@sveltejs/kit';
import Tournament from '$lib/models/tournament.js';
import { withCache } from '$lib/server/cache.js';

export async function load({ params }) {
    try {
        const tournament = await withCache(async () => await Tournament.findById(params.id), params.id);

        if (tournament === null) error(404, { message: 'Nie znaleziono zasobu' });

        return {
            tournament: tournament
        };
    } catch(exception) {
        if (exception instanceof mongoose.Error.CastError) error(400, { message: 'Niepoprawne dane' });

        throw exception;
    }
}