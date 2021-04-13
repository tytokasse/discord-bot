const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=> {

    function getUserFromMention(mention) {
        if (!mention) return;
    
        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);
    
            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
    
            return bot.users.cache.get(mention);
        }
    }

    if (args[0]){
        const user = getUserFromMention(args[0])

        let avatarembed = new Discord.MessageEmbed()

        .setTitle(user.username)
        .setColor("RANDOM")
        .setFooter("By "+ message.author.tag)
        .setImage(user.displayAvatarURL({ size : 2048 , dynamic: true }))
        .setDescription(`[Lien de l avatar](${user.avatarURL()})`);

        return message.channel.send(avatarembed)
        
    }
    let authorembed = new Discord.MessageEmbed()

        .setTitle(message.author.username)
        .setColor("RANDOM")
        .setFooter("By "+ message.author.tag)
        .setImage(message.author.displayAvatarURL({ size : 2048 , dynamic: true }))
        .setDescription(`[Lien de l avatar](${message.author.avatarURL()})`)
        
        return message.channel.send(authorembed)
}

module.exports.help ={
    name: "avatar"

}
