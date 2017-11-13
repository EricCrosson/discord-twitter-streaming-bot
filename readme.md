# discord-twitter-streaming-bot

> Stream tweets to a discord channel in real time

## Install

```bash
npm install --save discord-twitter-streaming-bot
```

## Configure

Create and populate a  `config.json` file from the following template

```
{
    "discord_token" : "xxxx.xxxx.xxxx",
    "twitter" : {
        "consumer_key" : "xxxx",
        "consumer_secret" : "yyyy",
        "token_key" : "zzzz-zzzz",
        "token_secret" : "honeypot"
    },

    "streams" : {
        "favorite_user" : {
            "twitter_id" : "123456789",
            "channel_id" : "09876543211234567890"
        }
    }
}

```

## Use

```bash
node index.js
```
