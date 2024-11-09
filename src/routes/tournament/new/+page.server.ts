import { error, redirect, type Actions } from '@sveltejs/kit';
import Tournament from '$lib/models/tournament.js';
import PlayerModel, { type Player } from '$lib/models/player.js';
import MatchModel, { type Match } from '$lib/models/match.js';
import { requireAuthentication } from '$lib/server/auth.js';
import { withCache, deleteCache } from '$lib/server/cache.js';

export async function load({ params, locals }) {
    requireAuthentication(locals);

    try {
        const players = await withCache(async () => await PlayerModel.find({}), 'players');

        return {
            players: players
        };
    } catch(exception) {
        throw exception;
    }
}

export const actions: Actions = {
    default: async ({ request, locals }) => {
        requireAuthentication(locals);

        const data = await request.formData();

        const name = data.get('name');
        const date = data.get('date');
        const tempo = data.get('tempo');

        const players = data.get('players');
        const parsedPlayers: Player[] = JSON.parse(players?.toString() ?? '[]');

        const bracket = data.get('bracket');
        const parsedBracket: Match[] = JSON.parse(bracket?.toString() ?? '[]');

        const parent = await Tournament.create({
            name: name,
            date: date, 
            tempo: tempo,
            players: parsedPlayers.map((p) => p._id)
        });

        if (bracket === null) return;

        for (const bracket of parsedBracket) {
            const newParent = await MatchModel.create({
                name: bracket.name,
                players: bracket.players.map((p) => p._id),
                results: bracket.results
            });

            parent.matchHead.push(newParent);

            let bracketTreeWalk = async (node: Match, current: Match) => {
                for (const child of current.children) {
                    const newNode = await MatchModel.create({
                        name: child.name,
                        players: child.players.map((p) => p._id),
                        results: child.results
                    });
                    node.children.push(newNode);

                    bracketTreeWalk(newNode, child);
                }

                // @ts-expect-error
                await node.save();
            };

            await bracketTreeWalk(newParent, bracket);
            // @ts-expect-error
            await newParent.save();
        }

        // await parent.matchHead.save();
        // @ts-expect-error
        await parent.save();
        await deleteCache('tournaments');

        redirect(302, '/tournament/' + parent._id);
    }
}