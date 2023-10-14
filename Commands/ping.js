const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Shows the bot\'s latency',
    usage: '/ping',
    permission: 'None',
    dm: true,

    async run(bot, message) {
        await message.reply(`Pong! Latency is ${Math.round(bot.ws.ping)}ms`);
    }
};