// Written by Eric Crosson
// 2017-11-13
//
// Create twitter streams from twitter users to discord channels.

// TODO: populate backdata after a period of downtime (consider the
// need to timestamp this information)

'use strict;'

const _ = require('lodash')

////
// Logging configuration
const winston = require('winston')
const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.simple(),
    transports: [new winston.transports.Console()]
})
////

////
// Load user configuration
const findConfig = require('find-config')
// FIXME: provide flag to install template as a compromise for this
// hardcoded path
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

_.each(config.streams, (stream, streamName) => {
    streams[stream['twitter_id']] = stream['discord_channel_id']
    streamNames[stream['twitter_id']] = streamName
    logger.info(`Creating stream '${streamName}':\t${stream['twitter_id']} ===> ${stream['discord_channel_id']}`)
})
////

////
// Configure streams
let stream = twitter.stream('statuses/filter', {follow: _.keys(streams)})
stream.on('tweet', (tweet) => {
    // FIXME: opt-in to straem retweets
    if (tweet.hasOwnProperty('retweeted_status')) return;
    logger.info(`Event on stream '${streamNames[tweet.user['id']]}'`)
    logger.debug(`Received tweet: ${tweet.text}`)
    discord
        .channels
        .find('id', streams[tweet.user['id']])
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
