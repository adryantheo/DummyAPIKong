const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { response } = require('express');
const e = require('express');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (request, response) => {
    response.json('Hello World');
});

app.get('/kong', (request, response) => {
    response.json('Ini Kong');
});

app.post('/king', (request, response) => {
    let a = request.body.name;
    console.log(a);
    response.json('Nama Saya: ' + a);
});

app.listen(port, () => {
    console.log(`App Listening at Localhost:${port}`);
});
