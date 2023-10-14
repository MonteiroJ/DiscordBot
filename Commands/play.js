const Discord = require('discord.js');
const { QueryType } = require("discord-player");

module.exports = {
    name: 'play',
    description: 'Play music',
    usage: '/play [music]',
    permission: 'None',
    dm: false,
    category: 'Music',
    options: [
        {
            type: 'string',
            name: 'music',
            description: 'Music to play',
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {
        let song = args.getString('music');

        if (!message.member.voice.channel) 
            return message.reply('You need to be in a voice channel to use this command!');
        if ((await message.guild.members.fetchMe()).voice.channel && (await message.guild.members.fetchMe()).voice.channel !== message.member.voice.channel) 
            return message.reply('You need to be in the same voice channel as me to use this command!');

        message.deferReply();

        const queue = await bot.player.nodes.create(message.guild, { metadata: {message: message}});

        let track;
        console.log(song);
        if(this.isYoutubeLink(song)) {
            track = await bot.player.search(song, {requestedBy: message.user, searchEngine: QueryType.YOUTUBE_VIDEO}).then(x => x.tracks[0]);
        } else if (this.isSpotifyLink(song)) {
            track = await bot.player.search(song, {requestedBy: message.user, searchEngine: QueryType.SPOTIFY_PLAYLIST}).then(x => x.tracks[0]);
        } else {
            track = await bot.player.search(song, {requestedBy: message.user}).then(x => x.tracks[0]);
        }
        console.log(track)
        if(!track) 
            return message.channel.send('No mucis found!');

        if(!queue.connection) {
            await queue.connect(message.member.voice.channel);
        } 
        await queue.play(track);

        message.followUp(`The music ${track.title} has been added to the queue by ${message.user} !`);

    },

    isYoutubeLink(song) {
        console.log(`Youtube: ${song.includes('youtube.com')}`);
        return song.includes('youtube.com');
    },

    isSpotifyLink(song) {
        console.log(`Spotify: ${song.includes('spotify.com')}`);
        return song.includes('spotify.com');
    }
};