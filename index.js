const express = require('express')
const app = express()
const linebot = require('linebot');

require('dotenv').config()

const bot = linebot({
    channelId: process.env.CHANNEL_ID,
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

const linebotParser = bot.parser();
bot.on('message', function (event) {
    console.log(event);
    switch (event.message.text) {
      case '測試':
        event.reply('測試timeing')
        break
      case '哈囉':
        event.reply('嗨～')
        break
      case '畢業專題':
        event.reply('別提了TAT')
        break
      default:
        event.reply('輸入「測試」、「哈囉」、「畢業專題」來看看會發生什麼事！')
    }
});

app.post('/', linebotParser);
app.listen(process.env.PORT || 3000, () => {
    console.log('Express server start')
});