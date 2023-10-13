const { log } = require('console');
const fs = require('fs');

module.exports = async (bot, message) => {
    
    let prefix = '!';

    let messageArray = message.content.split(' ');
    let commandName = messageArray[0].slice(prefix.length);
    let args = messageArray.slice(1);

    if (message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    log('checking if command exists')
    let command = require(`../Commands/${commandName}.js`);
    if (!command) return message.reply('There is no message');

    log('running command')
    command.run(bot, message, args);
};