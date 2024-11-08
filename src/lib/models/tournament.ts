import { Schema, model, SchemaTypes, Types, Model } from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import type { Player } from './player';
import MatchModel, { type Match } from './match';

export interface Tournament {
    _id: Types.ObjectId,
    name: string,
    date: Date,
    tempo: string,
    players: Player[],
    matchHead: Match[]
};

type THydratedTournamentDocument = {
    _id: Types.ObjectId,
    name: string,
    date: Date,
    tempo: string,
    players: Types.DocumentArray<Player>,
    matchHead: Types.DocumentArray<Match>
};
type TournamentModelType = Model<Tournament, {}, {}, {}, THydratedTournamentDocument>;

const tournamentSchema = new Schema<Tournament, TournamentModelType>({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    tempo: {
        type: String,
        required: true
    },
    players: [{
        type: SchemaTypes.ObjectId,
        ref: 'Player',
        autopopulate: true
    }],
    matchHead: [{
        type: SchemaTypes.ObjectId,
        ref: 'Match',
        autopopulate: true
    }]
});
tournamentSchema.plugin(mongooseAutoPopulate);
async function deleteMatchHead(next: Function) {
    const tournamentId = this.getQuery()._id;
    const tournament = await Tournament.findById(tournamentId);

    if (tournament?.matchHead)
        MatchModel.deleteMany({ _id: { $in: tournament.matchHead } }).exec();
    next();
};
tournamentSchema.pre('deleteOne', deleteMatchHead);
tournamentSchema.pre('findOneAndDelete', deleteMatchHead);

const Tournament = model<Tournament, TournamentModelType>('Tournament', tournamentSchema);
export default Tournament;