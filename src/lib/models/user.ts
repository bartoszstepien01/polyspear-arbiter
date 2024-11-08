import { Schema, model, Types } from 'mongoose';

export interface User {
    _id: Types.ObjectId,
    username: string,
    password: string
};

const userSchema = new Schema<User>({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = model<User>('User', userSchema);
export default User;
