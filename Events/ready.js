const Discord = require('discord.js');
const loadSlashCommands = require('../Loader/loadSlashCommands.js');

module.exports = async (bot, message) => {

    //await loadSlashCommands(bot);
    console.log(`Logged in as ${bot.user.tag}`);
};