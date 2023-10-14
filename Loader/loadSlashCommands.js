const Discord = require('discord.js');
const REST = require('@discordjs/rest');
const { Routes } = require('discord.js');

module.exports = async bot => {

    let commands = [];

    console.log('Loading Slash Commands...');
    bot.commands.forEach(async command => {

        let slashCommand = new Discord.SlashCommandBuilder()
            .setName(command.name)
            .setDescription(command.description)
            .setDMPermission(command.dm)
            .setDefaultMemberPermissions(command.permisson === 'None' ? null : command.permisson)
            

        if (command.options?.length >= 1) {
            for (let i = 0; i < command.options.length; i++) {
                let commandType = command.options[i].type.slice(0, 1).toUpperCase() + command.options[i].type.slice(1, command.options[i].type.length).toLowerCase();                       
                slashCommand[`add${commandType}Option`](option => option.setName(command.options[i].name).setDescription(command.options[i].description).setRequired(command.options[i].required))
            }
        }
        await commands.push(slashCommand);
    });

    const rest = new Discord.REST({ version: '10' }).setToken(bot.token);
    await rest.put(Routes.applicationCommands(bot.user.id), { body: commands });
    console.log('Slash Commands Loaded Successfully');
};