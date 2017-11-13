// Written by Eric Crosson
// 2017-11-13
//
// Stream tweets

'use strict;'

const _ = require('lodash');

const Discord = require('discord.js');
const discord = new Discord.Client();
const config = require('./config.json');

const Twitter = require('twitter');

discord.on('ready', () => {
    console.log('I am ready!');
});

const twitter = new Twitter({
  consumer_key: config.twitter['consumer_key'],
  consumer_secret: config.twitter['consumer_secret'],
  access_token_key: config.twitter['token_key'],
  access_token_secret: config.twitter['token_secret']
});

// my id: 2724617514
// whalecalls id: 4041496403
// bot-testing-channel: 347781297663639552
// whale-calls channel: 369253117214195712
var stream = twitter.stream('statuses/filter', {follow: config.streams['whalecalls']['twitter_id']});
stream.on('data', function(event) {
    const isTweet = _.conforms({
        contributors: _.isObject,
        id_str: _.isString,
        text_: _.isString
    });
    if (!_.conformsTo(event, isTweet)) return;
    console.log("\n\n")
    console.log(event);
    forwardTweetToDiscord(event);
});

stream.on('error', function(error) {
    throw error;
});

function forwardTweetToDiscord(tweet) {
    const discordChannel = discord.channels.find('id', config.streams['whalecalls']['channel_id']);
    discordChannel.send({embed: {
        // TODO: add url
        title: tweet.text
    }});
}

discord.login(config.discord_token);
