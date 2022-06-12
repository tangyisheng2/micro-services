import mongoose, { Mongoose } from 'mongoose';

// Interface: describes properties to creat a new user
interface UserAttrs {
    email: string;
    password: string;
}

// Interface: describes properties of the User Model
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): any;
}

// Interface: describes properties of the user document
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
    updatedAt: string;
    createdAt: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String, // Specific to mongoose, not TS
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Add new methods in the model
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

export const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
