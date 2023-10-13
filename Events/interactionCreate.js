const Discord = require('discord.js');

module.exports = async (bot, interaction) => {

    if (interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {
        
        let entry = interaction.options.getFocused();
        let choices = bot.commands.filters(cmd => cmd.name.includes(entry));
        await interatction.respond(entry === '' ? bot.commands.map(cmd => ({name: cmd.name, value: cmd.name})) : choices.map(choice => ({name: choice.name, value: choice})));
    }

    if (interaction.type === Discord.InteractionType.ApplicationCommand) {

        let command = require(`../Commands/${interaction.commandName}.js`);
        command.run(bot, interaction, command.options);
    }
};