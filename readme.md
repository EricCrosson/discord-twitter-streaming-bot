# discord-twitter-streaming-bot

> Create live streams from twitter users to discord channels

## Install

```bash
npm install --save discord-twitter-streaming-bot
```

## Configure

Create and populate a  `~/.config/discord-twitter-streaming-bot/config.json` file from the following template


```json
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
        },
        "favorite_news" : {
            "twitter_id" : "246886422",
            "channel_id" : "10293847565748392010"
        }
    }
}
```

> Note that all queries to external services rely on id numbers, and
> all labels are for human convenience only.

## Use

```bash
discord-twitter-streaming-bot
```
