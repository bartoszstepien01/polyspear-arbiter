import { Schema, model, SchemaTypes, Types, Model } from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import type { Player } from './player';

export interface Match {
    _id: Types.ObjectId | undefined,
    name: string,
    players: Player[],
    results: number[],
    children: Match[]
};

type THydratedMatchDocument = {
    _id: Types.ObjectId,
    name: string,
    players: Types.DocumentArray<Player>,
    results: number[],
    children: Types.DocumentArray<Match>
};
type MatchModelType = Model<Match, {}, {}, {}, THydratedMatchDocument>;

const matchSchema = new Schema<Match, MatchModelType>({
    name: {
        type: String,
        required: true
    },
    players: [{
        type: SchemaTypes.ObjectId,
        ref: 'Player',
        autopopulate: true
    }],
    results: [Number],
    children: [{
        type: SchemaTypes.ObjectId,
        ref: 'Match',
        autopopulate: true
    }]
});
matchSchema.plugin(mongooseAutoPopulate);
async function deleteChildren(next: Function) {
    const matchId = this.getQuery()._id;
    const match = await Match.findById(matchId);

    if (!match) return;

    if (match?.children.length !== 0)
        Match.deleteMany({ _id: { $in: match?.children } }).exec();

    next();
}
matchSchema.pre('deleteOne', deleteChildren);
matchSchema.pre('findOneAndDelete', deleteChildren);
matchSchema.pre('deleteMany', async function(next: Function) {
    let matchIds = this.getQuery()._id;
    if (!matchIds) return;

    matchIds = matchIds['$in'];

    for (const matchId of matchIds ?? []) {
        const match = await Match.findById(matchId);

        if (!match) continue;

        if (match?.children.length !== 0)
            Match.deleteMany({ _id: { $in: match?.children } }).exec();
    }

    next();
});

const Match = model<Match, MatchModelType>('Match', matchSchema);
export default Match;
