import mongoose from 'mongoose';
import { Password } from '../services/password';

// Interface: describes properties to creat a new user
interface UserAttrs {
    email: string;
    password: string;
}

// Interface: describes properties of the User Model
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
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

// Password hashing function
userSchema.pre('save', function (done) {
    if (this.isModified('password')) {
        Password.toHash(this.get('password')).then((hashed) =>
            this.set('password', hashed)
        );
    }
    // Always call done() when finished processing
    done();
});

// Add new methods in the model
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
export { User };
