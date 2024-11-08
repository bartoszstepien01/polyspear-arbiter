import Tournament from '$lib/models/tournament.js';

export async function load({ params }) {
    const tournaments = await Tournament.find();

    return {
        tournaments: JSON.parse(JSON.stringify(tournaments))
    };
}