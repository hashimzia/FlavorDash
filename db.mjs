
import './config.mjs';
import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';

if (!process.env.MONGODB_URI) {
    throw console.error("No Mongo DB");
}

mongoose.connect(process.env.MONGODB_URI);


const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,

});
UserSchema.plugin(passportLocalMongoose);
const Restaurant = new mongoose.Schema({
    name: String,
    food: [{
        name: String,
        price: Number,
        ingredients: Array,
        description: String,
    }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ownerBool: Boolean

});

mongoose.model("User", UserSchema);
mongoose.model("Restaurant", Restaurant);