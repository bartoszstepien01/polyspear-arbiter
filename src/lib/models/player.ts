import { Schema, model, Types } from 'mongoose';

export interface Player {
    _id: Types.ObjectId,
    name: string,
    country: string
};

const playerSchema = new Schema<Player>({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

const Player = model<Player>('Player', playerSchema);
export default Player;
