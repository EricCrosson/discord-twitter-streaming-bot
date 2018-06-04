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
    "username" : "twitter-username",
    "twitter" : {
        "consumer_key" : "xxxx",
        "consumer_secret" : "yyyy",
        "token_key" : "zzzz-zzzz",
        "token_secret" : "honeypot"
    },

    "discord_token" : "xxxx.xxxx.xxxx",
    "discord_channel_id": "xxxx"
}
```

> Note that all queries to external services rely on id numbers.

## Use

```bash
discord-twitter-streaming-bot
```

Or launch with `docker-compose` to ensure the process stays alive

```bash
npm run docker
```
