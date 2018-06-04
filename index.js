// Written by Eric Crosson
// 2017-11-13
//
// Create twitter streams from twitter users to discord channels.

// TODO: populate backdata after a period of downtime (consider the
// need to timestamp this information)

// TODO: add bitmexrekt stream -- filter by two emojis or more

'use strict;'

const _ = require('lodash')

////
// Logging configuration
const winston = require('winston')
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [new winston.transports.Console()]
})
////

////
// Load user configuration
const findConfig = require('find-config')
const configFile = findConfig('discord-twitter-streaming-bot/config.json')
if (configFile === null) {
    logger.error('Could not find configuration file')
    logger.error('Aborting')
    process.exit(1)
}
logger.info(`Configuration file: '${configFile}'`)
const config = require(configFile)
////

////
// Discord configuration
const discord = new (require('discord.js')).Client()

discord.on('ready', () => {
    logger.info('Client ready: discord')
})
////

////
// Twitter configuration
const Twit = require('twit')
const twitter = new Twit({
  consumer_key: config.twitter['consumer_key'],
  consumer_secret: config.twitter['consumer_secret'],
  access_token: config.twitter['token_key'],
  access_token_secret: config.twitter['token_secret']
})
////

////
// Data manipulation
var streams = {}
var streamNames = {}

////
// Stream configuration
let stream = twitter.stream('user', {id: config.username})
stream.on('tweet', (tweet) => {
    if (tweet.hasOwnProperty('retweeted_status')) return;
    logger.debug(`Received tweet: ${tweet}`)
    discord
        .channels
        .find('id', config.discord_channel_id)
        .send(tweet.text)
})

stream.on('connect', (request) => {
    logger.debug(`Client connecting: twitter`)
})
stream.on('connected', (response) => {
    logger.info('Client ready: twitter')
})
stream.on('disconnect', (disconnectMessage) => {
    logger.warn(`Received a disconnect message from twitter: ${disconnectMessage}`)
})
stream.on('reconnect', (request, response, connectInterval) => {
    logger.warn('Reconnection attempt to twitter is scheduled')
})
stream.on('warning', (warning) => { logger.warn(warning) })
stream.on('error', (error) => { throw error })
////

////
// Start streaming
discord.login(config.discord_token)
////
