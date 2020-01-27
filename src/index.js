const { Client } = require('discord.js');
require('dotenv').config();

// Defining a new Bot
const client = new Client();

// env Variables
const token = process.env.TOKEN;
const prefix = process.env.PREFIX;

client.on('ready', () => {
    console.log(`Bot logged in as: ${client.user.tag}`);
    client.user.setStatus('online');
});


client.on('message', async message => {

    const args = message.content.slice(prefix.length).trim().split(' ');
    const cmd = args.shift().toLowerCase();

    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    // Command Handler

    try {
        delete require.cache[require.resolve(`./commands/${cmd}.js`)];

        let command_file = require(`./commands/${cmd}.js`);
        command_file.run(client, message, args);

    } catch(err){
        console.log(err.stack)
    }

    

    // const user = message.mentions.users.first();
    
    //     if(user){
    //         const member = message.guild.member(user);
    
    //         if(member){
                
    //             message.channel.fetchMessages()
    //             .then(messages => `${messages.filter(m => {
    //                if (m.author.id === member.id){
    //                    m.delete().catch(console.error)
    //                }
                
    //             })}`)
    //             .catch(console.error);
    
    //         }
        
    // }



});

client.login(token);