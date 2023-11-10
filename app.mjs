import './config.mjs';
import './db.mjs';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';



// const User = mongoose.model("User");
const Restaurant = mongoose.model('Restaurant');
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
const publicFolder = path.join(__dirname, 'public');
app.use(express.static(publicFolder));

app.get('/', (req, res) => {
    res.render("home");
});

// app.get('/restaurants', (req, res) => {
//     res.render("restaurants");
// });

app.get('/restaurants', (req, res) => {
    const fakeRestaurent = {
        name: "Hashim's Halal Cart",
        food: [
            {
                name: "Chicken Over Rice",
                price: 9.99,
                ingredients: ["Love"],
                description: "Filled w love"
            }
        ]
    };

    const sampleRestaurant = new Restaurant(fakeRestaurent);
    sampleRestaurant.save()
        .then(() => {
            console.log('Restaurant saved successfully');
            res.redirect('/');
            return;
        })
        .catch(err => {
            console.error('Error saving restaurant:', err);
            res.status(500).send('Error saving restaurant');
            return;
        });
});

app.listen(process.env.PORT || 3000);

// module.exports = app;
