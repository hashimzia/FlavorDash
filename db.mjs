
import './config.mjs';
import mongoose from "mongoose";
mongoose.connect(process.env.DSN);
const User = new mongoose.Schema({
    name: String,
    hash: String,
    ownerBool: Boolean,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }
});

const Restaurant = new mongoose.Schema({
    name: String,
    food: [{
        name: String,
        price: Number,
        ingredients: Array,
        description: String,
    }]

});

mongoose.model("User", User);
mongoose.model("Restaurant", Restaurant);