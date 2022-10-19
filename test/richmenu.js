///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////    STILL TESTING    ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


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
          "type": "message",
          "text": "我想用有趣的方法來決定吃什麼！"
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
          "type": "message",
          "text": "我想用店名查詢店家資料"
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
          "type": "message",
          "text": "我想篩選適合的餐廳"
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
          "type": "message",
          "text": "我想了解怎麼使用"
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
          "type": "message",
          "text": "我想跟飯友聊天～"
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
          "type": "message",
          "text": "我想寫個食記"
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

  // Set default rich menu
  await client.setDefaultRichMenu(richMenuId)

  // Create rich menu alias
  await client.createRichMenuAlias(richMenuId, 'richmenu-alias')

  console.log('success')
}

main(client)