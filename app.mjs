import './config.mjs';
// import './db.mjs';
import express from 'express';
// import { mongoose } from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render("layout");
});

app.get('/restaurants', (req, res) => {
    res.render("restaurants");
});

app.listen(process.env.PORT || 3000);

// module.exports = app;
