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
      case '開發中':
        event.reply('心好累：）')
        break

      // Rich Menu
      case '我想了解怎麼使用～':
        event.reply([{
          "type": "template",
          "altText": "this is an image carousel template",
          "template": {
            "type": "image_carousel",
            "columns": [
              {
                "imageUrl": "https://raw.githubusercontent.com/bdgtopic/line-bot-nodejs/main/public/instruction-1.png"
              },
              {
                "imageUrl": "https://raw.githubusercontent.com/bdgtopic/line-bot-nodejs/main/public/instruction-2.png"
              },
              {
                "imageUrl": "https://raw.githubusercontent.com/bdgtopic/line-bot-nodejs/main/public/instruction-3.png"
              },
              {
                "imageUrl": "https://raw.githubusercontent.com/bdgtopic/line-bot-nodejs/main/public/instruction-4.png"
              },
              {
                "imageUrl": "https://raw.githubusercontent.com/bdgtopic/line-bot-nodejs/main/public/instruction-5.png"
              },
              {
                "imageUrl": "https://raw.githubusercontent.com/bdgtopic/line-bot-nodejs/main/public/instruction-6.png"
              }
            ]
          }
        }])
        break
        
      default:
        event.reply('輸入「開發中」看看')
    }
});

app.post('/', linebotParser);
app.post('/', linebotParser);
app.listen(process.env.PORT || 3000, () => {
    console.log('Express server start')
});