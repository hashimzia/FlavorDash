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
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
const publicFolder = path.join(__dirname, 'public');
app.use(express.static(publicFolder));

app.get('/', (req, res) => {
    res.render("home");
});

app.get('/restaurants', async (req, res) => {
    const restaurants = await Restaurant.find({});
    res.render("restaurants", { restaurants });
});

app.get('/restaurants-add', (req, res) => {
    res.render("restaurant-add");
});

app.post('/restaurants-add', (req, res) => {


    const sampleRestaurant = new Restaurant({
        name: req.body.name,
        food: [
            {
                name: req.body["food-name"],
                price: parseFloat(req.body["food-price"]),
                ingredients: req.body["food-ingredients"].split(","),
                description: req.body["food-description"]
            }
        ]
    });

    // const sampleRestaurant = new Restaurant(fakeRestaurent);
    sampleRestaurant.save()
        .then(() => {
            console.log('Restaurant saved successfully');
            res.redirect('/restaurants');
            return;
        })
        .catch(err => {
            console.error('Error saving restaurant:', err);
            res.status(500).send('Error saving restaurant');
            return;
        });
});

app.delete('/restaurants-add', async (req, res) => {
    await Restaurant.findByIdAndDelete(req.body.id);
});
app.listen(process.env.PORT || 3000);

// module.exports = app;
