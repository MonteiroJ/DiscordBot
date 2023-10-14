require('dotenv').config();

const Discord = require('discord.js');
const Player = require('discord-player');
const { BridgeProvider, BridgeSource, YouTubeExtractor } = require('@discord-player/extractor');
const loadCommands = require('./Loader/loadCommands');
const loadEvents = require('./Loader/loadEvents');

const intents = new Discord.IntentsBitField(3276799);
const bot = new Discord.Client({intents});
const bridgeProvider = new BridgeProvider(BridgeSource.YouTube);

bot.player = new Player.Player(bot, {
    leaveOnEnd: true,
    leaveOnEmpty: true,
    initialVolume: 50,
    ytdlOptions: {
        filter: 'audioonly',
        quality: 'highestaudio',
        highWaterMark: 1 << 25
    },
    bridgeProvider
});

bot.player.extractors.register(YouTubeExtractor, {bridgeProvider});
bot.commands = new Discord.Collection();

bot.login(process.env.token);
loadCommands(bot);
loadEvents(bot);
