import Tournament from '$lib/models/tournament.js';

export async function load({ params }) {
    const tournaments = await Tournament.find().cache(0);

    return {
        tournaments: JSON.parse(JSON.stringify(tournaments))
    };
}