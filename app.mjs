import './config.mjs';
import './db.mjs';
import './auth.mjs';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import passport from 'passport';
import session from 'express-session';
import flash from 'connect-flash';
import MongoDBStore from 'connect-mongodb-session';

const store = new (MongoDBStore(session))({
    uri: process.env.MONGODB_URI, // Replace with your MongoDB Atlas URI
    collection: 'sessions', // Name of the collection to store sessions
    expires: 1000 * 60 * 60 * 24 * 7, // Session expiration time (7 days)
});

const User = mongoose.model("User");
const Restaurant = mongoose.model('Restaurant');
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sessionOptions = {
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: store
};
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
});
app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
const publicFolder = path.join(__dirname, 'public');
app.use(express.static(publicFolder));

app.get('/', (req, res) => {
    res.render("home");
});
app.get('/register', (req, res) => {
    res.render("register");
});

app.get('/restaurants', async (req, res) => {

    if (req.user) {
        let restaurants = await Restaurant.find({});
        if (req.query.name) {
            restaurants = restaurants.filter(el => el.name.toLowerCase().includes(req.query.name));
        }

        res.render("restaurants", { restaurants });

    } else {
        req.flash('error', 'You must be logged in to access this page.');
        res.redirect('/');
    }
});

app.get('/myrestaurants', async (req, res) => {

    if (req.user) {
        let restaurants = await Restaurant.find({});
        if (req.query.name) {
            restaurants = restaurants.filter(el => el.name.toLowerCase().includes(req.query.name));
        }
        restaurants = restaurants.filter(el => el.owner.equals(req.user._id));
        res.render("myrestaurants", { restaurants });

    } else {
        req.flash('error', 'You must be logged in to access this page.');
        res.redirect('/');
    }
});


app.get('/restaurants-add', (req, res) => {
    if (req.user) {
        res.render("restaurant-add");
    } else {
        req.flash('error', 'You must be logged in to access this page.'); // Flash success message
        res.redirect('/');
    }
});

app.post('/register', async function (req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        req.flash('error', 'Please provide a username and password');
        return res.redirect('/register');
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        req.flash('error', 'Username is already taken');
        return res.redirect('/register');
    }
    User.register(new User({ username: req.body.username }),
        req.body.password, function (err, user) {
            if (err) {
                req.flash('error', 'Your registration information is not valid');
                res.render('register', { message: 'Your registration information is not valid' });
            } else {
                passport.authenticate('local')(req, res, function () {
                    req.flash('success', 'Registration successful');
                    res.redirect('/');
                });
            }
        });
});

app.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user) {
        if (user) {
            req.logIn(user, function (err) {
                req.flash('success', 'Login successful'); // Flash success message
                res.redirect('/');
            });
        } else {
            req.flash('error', 'Invalid username or password'); // Flash error message
            res.redirect('/');
        }
    })(req, res, next);
});
app.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', 'Logout successful');
        res.redirect('/');
    });
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
        ],
        owner: req.user._id
    });
    sampleRestaurant.save()
        .then(() => {
            console.log('Restaurant saved successfully');
            res.redirect('/restaurants');
            return;
        })
        .catch(err => {
            req.flash('error', 'Some of the fields is incorrect'); // Flash error message
            res.redirect('/restaurants-add');
            return;
        });
});

app.delete('/restaurants-add', async (req, res) => {
    if (req.user) {
        const rest = await Restaurant.findById(req.body.id);
        if (rest.owner.equals(req.user._id)) { await Restaurant.findByIdAndDelete(req.body.id); return; }
    }


});
app.listen(process.env.PORT || 3000);

// module.exports = app;
