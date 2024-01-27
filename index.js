const express = require('express');
const axios = require('axios')

const TG_BOT_TOKEN = '5753507047:AAEIpHf-jF4nM0o0bzuxDycWQLNQXzcwPl8'; // Bender
const TG_API = `https://api.telegram.org/bot${TG_BOT_TOKEN}`
const URI = `/webhook/${TG_BOT_TOKEN}`
const WEBHOOK_URL = `https://94.180.255.226${URI}`;
const PORT = 8010;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const setupWebhook = async () => {
    const res = await axios.get(`${TG_API}/setWebhook?url=${WEBHOOK_URL}`);
    console.log(res.data);
}

app.get('/webhook-customerorder-sobrano/:id&:type', (req, res, next) => {
    console.log(req.body);
    res.end();
})

app.get('/test', (req, res, next) => {
    console.log('TEST IS PASSED');
    res.end();
})

app.listen(PORT, async () => {
    console.log(`Server has been stared ${PORT} PORT`);
    await setupWebhook();
})

