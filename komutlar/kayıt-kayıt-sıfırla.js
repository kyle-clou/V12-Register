const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
if(!["YETKILI ROL ID"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${message.author} bu komutu kullanmak için yetkin bulunmamakta.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));


const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send(new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Bir kullanıcı belirt.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
if(!member.roles.highest.position >= message.member.roles.highest.position) message.channel.send(new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Belirtilen kullanıcı sizden üst/aynı pozisyonda işleme devam edilemiyor.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));

  
let bilgi = db.get(`yetkili.${member.id}`);  
db.delete(`yetkili.${message.author.id}.erkek`)
db.delete(`yetkili.${message.author.id}.toplam`)  
db.delete(`yetkili.${message.author.id}.kadin`)
let toplami = db.fetch(`yetkili.${message.author.id}.toplam`)  

message.react('✅')

message.channel.send(new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setColor("0x2f3136")
.setDescription(`${member} Adlı Kullanıcının Db'si Silindi, <@${message.author.id}> Tarafından Sıfırlandı.`))
  

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["sıfırla", "kayıt-sıfırla", "kayıtları-sıfırla", "db-sıfırla", "dbisil", "db-sil"],
    permLevel: 0
};

exports.help = {
    name: "sıfırla"
}

