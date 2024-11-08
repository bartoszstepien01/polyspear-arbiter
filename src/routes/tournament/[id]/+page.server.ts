import mongoose from 'mongoose';
import { error } from '@sveltejs/kit';
import Tournament from '$lib/models/tournament.js';

export async function load({ params }) {
    try {
        const tournament = await Tournament.findById(params.id);
        if (tournament === null) error(404, { message: 'Nie znaleziono zasobu' });

        return {
            tournament: JSON.parse(JSON.stringify(tournament))
        };
    } catch(exception) {
        if (exception instanceof mongoose.Error.CastError) error(400, { message: 'Niepoprawne dane' });

        throw exception;
    }
}