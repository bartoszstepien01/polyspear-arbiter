import mongoose from 'mongoose';
import { error, type Actions, redirect } from '@sveltejs/kit';
import Tournament from '$lib/models/tournament.js';
import PlayerModel, { type Player } from '$lib/models/player.js';
import MatchModel, { type Match } from '$lib/models/match.js';
import { requireAuthentication } from '$lib/server/auth.js';

export async function load({ params, locals }) {
    requireAuthentication(locals);

    try {
        const tournament = await Tournament.findById(params.id).cache(0);
        if (tournament === null) error(404, { message: 'Nie znaleziono zasobu' });

        const players = await PlayerModel.find({}).cache(0);

        return {
            tournament: JSON.parse(JSON.stringify(tournament)),
            players: JSON.parse(JSON.stringify(players))
        };
    } catch(exception) {
        if (exception instanceof mongoose.Error.CastError) error(400, { message: 'Niepoprawne dane' });

        throw exception;
    }
}

export const actions: Actions = {
    edit: async ({ request, locals }) => {
        requireAuthentication(locals);

        const data = await request.formData();

        const id = data.get('id');
        const name = data.get('name');
        const date = data.get('date');
        const tempo = data.get('tempo');

        const players = data.get('players');
        const parsedPlayers: Player[] = JSON.parse(players?.toString() ?? '[]');

        const bracket = data.get('bracket');
        const parsedBracket: Match[] = JSON.parse(bracket?.toString() ?? '[]');

        await Tournament.deleteOne({ _id: id });

        // TODO: Fix it for God's sake
        // Why is it needed: Mongoose pre middleware is supposed to delete all matches in
        // the tournament after executing the line above. However, since middleware functions
        // are async the await in the aforementioned line doesn't 'wait' for them to finish.
        // So a situation can happen when we try to create a new document but a previous 
        // one still exists.
        let retry = async (maxRetries: number, fn: () => Promise<any>): Promise<any> => {
            try {
                return await fn();
            } catch (error) {
                if (maxRetries <= 0) throw error;
                return retry(maxRetries - 1, fn);
            }
        }

        const parent = await retry(999, async () => await Tournament.create({
            _id: id,
            name: name,
            date: date, 
            tempo: tempo,
            players: parsedPlayers.map((p) => p._id)
        }));

        if (bracket === null) return;

        for (const bracket of parsedBracket) {
            const newParent = await retry(999, async () => await MatchModel.create({
                _id: bracket._id,
                name: bracket.name,
                players: bracket.players.map((p) => p._id),
                results: bracket.results
            }));

            parent.matchHead.push(newParent);

            let bracketTreeWalk = async (node: Match, current: Match) => {
                for (const child of current.children) {
                    const newNode = await retry(999, async () => await MatchModel.create({
                        _id: child._id,
                        name: child.name,
                        players: child.players.map((p) => p._id),
                        results: child.results
                    }));
                    node.children.push(newNode);

                    bracketTreeWalk(newNode, child);
                }

                // @ts-expect-error
                await node.save();
            };

            await bracketTreeWalk(newParent, bracket);
            await newParent.save();
        }

        //await parent.matchHead.save();
        await parent.save();

        redirect(302, '/tournament/' + id);
    },
    delete: async ({ request, locals }) => {
        requireAuthentication(locals);

        const data = await request.formData();

        const id = data.get('id');
        if (id === null) error(400, 'Niepoprawne dane');

        await Tournament.deleteOne({ _id: id });

        redirect(302, '/');
    }
}