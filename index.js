const express = require('express');
const axios = require('axios')

const TG_BOT_TOKEN = '5753507047:AAEIpHf-jF4nM0o0bzuxDycWQLNQXzcwPl8'; // Bender
const TG_API = `https://api.telegram.org/bot${TG_BOT_TOKEN}`
const URI = `/webhook/${TG_BOT_TOKEN}`
const WEBHOOK_URL = `http://94.180.255.226:8010${URI}`;
const PORT = 8010;

const app = express();

const setupWebhook = async () => {
    const res = await axios.get(`${TG_API}/setWebhook?url=${WEBHOOK_URL}`);
    console.log(res.data);
}

app.listen(PORT, async () => {
    console.log(`Server has been stared ${PORT} PORT`);
    await setupWebhook();
})

