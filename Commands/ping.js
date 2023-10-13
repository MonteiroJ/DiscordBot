const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Shows the bot\'s latency',
    permission: 'None',
    dm: true,

    async run(bot, message) {
        console.log('Ping has been called');
        await message.reply(`Pong! Latency is ${Math.round(bot.ws.ping)}ms`);
    }
};