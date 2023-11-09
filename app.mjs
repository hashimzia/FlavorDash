import './config.mjs';
// import './db.mjs';
import express from 'express';
// import { mongoose } from 'mongoose';
// import path from 'path';
// import { fileURLToPath } from 'url';

const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
    res.send("hi2");
});

app.get('/restaurants', (req, res) => {
    res.send("restaurants page");
});

// app.listen(process.env.PORT || 3000);

module.exports = app;
