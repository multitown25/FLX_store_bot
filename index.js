const express = require('express');
const axios = require('axios')

const TG_BOT_TOKEN = '5753507047:AAEIpHf-jF4nM0o0bzuxDycWQLNQXzcwPl8'; // Bender
const TG_API = `https://api.telegram.org/bot${TG_BOT_TOKEN}`
const URI = `/webhook/${TG_BOT_TOKEN}`
const WEBHOOK_URL = `https://94.180.255.226${URI}`;
const PORT = 8010;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const setupWebhook = async () => {
    const res = await axios.get(`${TG_API}/setWebhook?url=${WEBHOOK_URL}`);
    console.log(res.data);
}

app.post('/webhook-customerorder-sobrano', async (req, res, next) => {
    const reqBody = req.body;
    const id = req.params.id;
    console.log(reqBody);
    console.log(id);
    console.log('WEBHOOK WITHOUT QUERY PARAMS!!!');
    res.end();
})

app.get('/test', async (req, res, next) => {
    console.log('TEST IS PASSED');
    res.end();
})

app.listen(PORT, async () => {
    console.log(`Server has been stared ${PORT} PORT`);
    await setupWebhook();
})

