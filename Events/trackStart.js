module.exports = async (bot, queue, track) => {

    queue.metadata.message.channel.send(`The music ${track.title} has been added by ${track.requestedBy.tag} `);
};