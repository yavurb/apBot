const { Client } = require('discord.js');
const client = new Client();
const config = require('./config.json');
const prefix = config.prefix;

client.on('ready', () => {
    console.log(`Bot logged in as: ${client.user.tag}`);
    client.user.setStatus('online');
});


client.on('message', async message => {

    const args = message.content.slice(prefix.length).trim().split(' ');
    const cmd = args.shift().toLowerCase();

    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    if(cmd === 'ping') message.reply('Pong!');


    

    const user = message.mentions.users.first();
    
        if(user){
            const member = message.guild.member(user);
    
            if(member){
                
                message.channel.fetchMessages()
                .then(messages => `${messages.filter(m => {
                   if (m.author.id === member.id){
                       m.delete().catch(console.error)
                   }
                
                })}`)
                .catch(console.error);
    
            }
        
    }



});

client.login(config.token);