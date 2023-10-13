const fs = require('fs');

module.exports = async bot => {

    console.log('Loading commands...');
    fs.readdirSync('./Commands/').filter(f => f.endsWith('.js')).forEach( async file => {
        let command = require(`../Commands/${file}`);
        if (!command.name || typeof command.name !== 'string') throw new TypeError(`Command ${file} has no name!`);
        bot.commands.set(command.name, command);
        console.log(`${command.name} loaded!`);
        
    });
};