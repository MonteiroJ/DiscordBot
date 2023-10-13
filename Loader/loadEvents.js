const { log } = require('console');
const fs = require('fs');

module.exports = async bot => {

    console.log('Loading events...');
    fs.readdirSync('./Events/').filter(f => f.endsWith('.js')).forEach( async file => {

        let event = require(`../Events/${file}`);
        bot.on(file.split('.js').join(''), event.bind(null, bot));
        log(`Loaded event ${file.split('.js').join('')}`);
       
    });
};