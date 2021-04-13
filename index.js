
const Discord = require("discord.js")
const config = require("./config.json")
const bot = new Discord.Client();
const fs = require("fs");
bot.commands = new Discord.Collection();
const prefix = `%`

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
        console.log("je ne trouve pas les commandes du bot");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} chargé à 100%`);
        bot.commands.set(props.help.name, props);
    });

    fs.readdir("./events/", (err, f) =>{
        if(err) console.log(err);
        console.log(`${f.length} events en chargement`);

        f.forEach((f)=>{
            const events = require (`./events/${f}`);
            const event = f.split(".")[0];

            client.on(event, events.bind(null, client));
        });
    });
});

bot.on("ready", ()=> {
    console.log(bot.user.username + " est en ligne !")
});

bot.on("message", async message =>{

    if(message.author.bot) return;
    if(message.channel.type === `dm`) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase()
    const commands = bot.commands.get(command)
    commands.run(bot, message, args)
    
    let commandfile =  bot.commands.get(command.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);

    var jeuxs =[
        `%help pour de l'aide`,
        `by ttks#9888`
    ];

    setInterval(function () {
        var jeux = jeuxs[Math.floor(Math.random() * jeuxs.length)];

        bot.user.setPresence({
            game: {
                name:jeux
            }
        });
    }, 3000);
})
bot.login(config.token)