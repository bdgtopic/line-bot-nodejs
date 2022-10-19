const line = require('@line/bot-sdk');
const { join } = require("path");
const { readFileSync } = require("fs");

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

const richMenuObject = () => ({
    "size": {
      "width": 2500,
      "height": 1686
    },
    "selected": true,
    "name": "richmenu",
    "chatBarText": "點擊體驗服務",
    "areas": [
      {
        "bounds": {
          "x": 0,
          "y": 0,
          "width": 823,
          "height": 834
        },
        "action": {
          "type": "postback",
          "text": "用有趣的方法來決定要吃什麼吧！",
          "data": "service_fun"
        }
      },
      {
        "bounds": {
          "x": 834,
          "y": 0,
          "width": 838,
          "height": 835
        },
        "action": {
          "type": "postback",
          "text": "輸入店名查詢店家資料",
          "data": "service_search"
        }
      },
      {
        "bounds": {
          "x": 1677,
          "y": 0,
          "width": 823,
          "height": 834
        },
        "action": {
          "type": "postback",
          "text": "用篩選器發現適合的餐廳吧！",
          "data": "service_select"
        }
      },
      {
        "bounds": {
          "x": 0,
          "y": 841,
          "width": 823,
          "height": 845
        },
        "action": {
          "type": "postback",
          "data": "service_instruction"
        }
      },
      {
        "bounds": {
          "x": 835,
          "y": 839,
          "width": 837,
          "height": 847
        },
        "action": {
          "type": "postback",
          "text": "找飯友就來這輕鬆聊天～",
          "data": "service_chat"
        }
      },
      {
        "bounds": {
          "x": 1678,
          "y": 839,
          "width": 822,
          "height": 847
        },
        "action": {
          "type": "postback",
          "text": "與我們分享這頓飯如何吧！",
          "data": "service_note"
        }
      }
    ]
  })


const main = async (client) => {
  // Create rich menu
  const richMenuId = await client.createRichMenu(
    richMenuObject()
  )

  // Upload image to rich menu
  const filepath = join(__dirname, './public/richmenu.png')
  const buffer = readFileSync(filepath)

  await client.setRichMenuImage(richMenuId, buffer)

  // Set rich menu A as the default rich menu
  await client.setDefaultRichMenu(richMenuId)

  // Create rich menu alias
  await client.createRichMenuAlias(richMenuId, 'richmenu-alias')

  console.log('success')
}

main(client)