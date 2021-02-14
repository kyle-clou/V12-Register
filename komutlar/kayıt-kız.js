const { MessageEmbed } = require('discord.js')
const datab = require('quick.db')
const ms = require('ms')
const moment = require("moment");
const { parseZone } = require("moment");

exports.run =  async (client, message, args) => {
  
if(!['788898307320840242'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${message.author} bu komutu kullanmak için yetkin bulunmamakta.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
  
const tag = 'KYLE'   
const kadınrol = message.guild.roles.cache.find(r => r.id === '')//KADIN ROL İD
const kadınrol2 = message.guild.roles.cache.find(r => r.id === '')//KADIN ROL İD
const kayıtsız = message.guild.roles.cache.find(r => r.id === '')//KAYITSIZ ROL İD
const genelchat = message.guild.channels.cache.find(c => c.id === '')//GENEL CHAT İD
const savelog = message.guild.channels.cache.find(c => c.id === '')// SAVELOG İD

if(!kadınrol) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`1. Kadın rolü ayarlanmamış/yanlış id girilmiş kayıt işlemine devam edilemiyor.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
if(!kadınrol2) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`2. Kadın rolü ayarlanmamış/yanlış id girilmiş kayıt işlemine devam edilemiyor.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
if(!kayıtsız) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Kayıtsız rolü ayarlanmamış/yanlış id girilmiş kayıt işlemine devam edilemiyor.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));

const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${message.author} bir kullanıcı belirt.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
let name = args[1]
let age = Number(args[2])
if(!name) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Bir isim belirtmelisin.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
if(!age) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Bir yaş belirtmelisin.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
if(member.id === message.author.id) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Kendini kayıt edemezsin.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
if(member.id === client.user.id) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Bot kayıt edemezsin.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
if(member.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Sunucu sahibini kayıt edemezsin.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Belirtilen kullanıcı sizden üst/aynı pozisyonda işleme devam edilemiyor.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
  
  
datab.add(`yetkili.${message.author.id}.kadin`, 1)
datab.add(`yetkili.${message.author.id}.toplam`, 1)
let alldata = datab.fetch(`yetkili.${message.author.id}.toplam`)

member.setNickname(`${tag} ${name} | ${age}`)
member.roles.add(kadınrol)
member.roles.add(kadınrol2)
member.roles.remove(kayıtsız)


message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${member} üyesini ${message.author} kayıt etti. \n\n ${kadınrol}, ${kadınrol2} Rolleri Verildi. \n \`${tag} ${name} | ${age}\` Olarak ismi güncellendi.`)
.setFooter(`Toplam kayıtların: ${alldata}`)               
.setColor('#ba61dd'))
  
genelchat.send(`${member} Aramıza katıldı, hoşgeldin umarım keyifli vakit geçirirsin. 
Sunucumuzun **${tag}** tagını alarak ailemizin parçası olabilirsin. `)
  
savelog.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`• Yetkili: ${message.author} | \`${message.author.id}\`\n• Kullanıcı: ${member} | \`${member.id}\`\n• Güncel İsim: \`${tag} ${name} | ${age}\`\n• Roller: ${kadınrol}, ${kadınrol2} \n• Kanal: <#${message.channel.id}> | \`${message.channel.id}\`\n• Kayıtlar: \`${alldata}\` `)
.setColor('#ba61dd'))


datab.push(`isim.${message.guild.id}`, {userID: member.id, isim: name, yas: age, role: kadınrol.id})}
exports.conf = {enabled: true, guildOnly: true, aliases: ['kadın', 'k', 'girl', 'woman', 'kız'], permLevel: 0}
exports.help = {name: 'kadın', description: "Etiketlenen kişiyi kadın rolleriyle kayıt eder.", usage: '.kadın @etiket/id İsim Yaş'}