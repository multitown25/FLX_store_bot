const express = require('express');
const axios = require('axios')

// вынести это в .env
const MS_TOKEN = 'c74a8a50dd71f2effeeb0760ca923825bffb5d6b'; // Ramazan
const TG_BOT_TOKEN = '5753507047:AAEIpHf-jF4nM0o0bzuxDycWQLNQXzcwPl8'; // Bender
const TG_API = `https://api.telegram.org/bot${TG_BOT_TOKEN}`
const URI = `/webhook/${TG_BOT_TOKEN}`
const WEBHOOK_URL = `https://2bd6-94-180-255-226.ngrok-free.app${URI}`; // screen name is ...
const PORT = 8010;

const $api = axios.create({
    withCredentials: true
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${MS_TOKEN}`;
    return config;
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const setupWebhook = async () => {
    const res = await axios.get(`${TG_API}/setWebhook?url=${WEBHOOK_URL}`);
    console.log(res.data);
}

app.post('/webhook-customerorder-sobrano', async (req, res, next) => {
    try {
        const orderId = req.query.id;
        const order = await $api.get(`https://api.moysklad.ru/api/remap/1.2/entity/customerorder/${orderId}`).then(res => res.data);
        const manager = order.attributes?.find(item => item.name === "Клиент закреплен");
        console.log(manager)
        const text = `Заказ ${order.name}\nСамовывоз\nСобран ${order.updated.slice(0, -4)}\nЗакреплен за'${manager.value}'`;        

        await axios.post(`${TG_API}/sendMessage`, {
            chat_id: 482738452, // Ramazan
            text
        })
        
        // console.log(order);

        console.log('WEBHOOK WITHOUT QUERY PARAMS!!!');
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }

})

// app.post(URI, async (req, res) => {
//     console.log(req.body)

//     const chatId = req.body.message.chat.id
//     const text = req.body.message.text

//     await axios.post(`${TG_API}/sendMessage`, {
//         chat_id: chatId,
//         text: text
//     })
//     return res.send()
// })

app.get('/test', async (req, res, next) => {
    console.log('TEST IS PASSED');
    res.end();
})

app.listen(PORT, async () => {
    console.log(`Server has been stared ${PORT} PORT`);
    await setupWebhook();
})

