const express = require('express');
const app = express();
const http = require('http');
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const Jimp = require('jimp');
const db = require('quick.db');
var prefix = ayarlar.prefix;
require('./util/eventLoader')(client);
// GEREKLİ YERLER kurcalamayın

// -------------------------------------------------------------

app.get("/", (request, response) => {
    console.log(` az önce pinglenmedi. Sonra ponglanmadı... ya da başka bir şeyler olmadı.`);
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);

//------------------------------------------------------------------

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};
 
  // KOMUT TANIMI

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);

  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

// PERM LEVELLER 

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 4;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

//

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

//----------------------------------------------------------------------------------

//-----------------------------Girişte Rol Verme----------------------------------//
client.on("guildMemberAdd", member => {
  member.roles.add('UNREGISTER ID'); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
});
//-----------------------------Girişte Rol Verme----------------------------------//


//------------------------HOŞGELDİN-EMBEDLİ-----------------------\\
client.on("guildMemberAdd", member => {
  require("moment-duration-format")
    var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
    var üs = üyesayısı.match(/([0-9])/g)
    üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
    if(üs) {
      üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
        return {
          '0': ``,
          '1': ``,
          '2': ``,
          '3': ``,
          '4': ``,
          '5': ``,
          '6': ``,
          '7': ``,
          '8': ``,
          '9': ``}[d];})}
    const kanal = member.guild.channels.cache.find(r => r.id === "KANAL ID");
    let register = 'REGİSTER ROL ID'
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
    const kurulus = new Date().getTime() - user.createdAt.getTime();  
   const gecen = moment.duration(kurulus).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
  var kontrol;
if (kurulus < 1296000000) kontrol = 'Hesap Durumu: Güvenilir Değil.'
if (kurulus > 1296000000) kontrol = 'Hesap Durumu: Güvenilir Gözüküyor.'
  moment.locale("tr");
const embed = new Discord.MessageEmbed()
.setAuthor(member.guild.name, member.guild.iconURL({dynamic:true}))
.setDescription(`
<@`+member.id+`> Sunucumuza Katıldı ! 

Kayıt edilmek için teyit odasında <@&{register}> yetkililerine teyit vermen yeterli !

Seninle birlikte `+üyesayısı+` kişiye ulaştık !

Sunucumuzun kurallarına uymayı unutma, kurallarımızı okumanı tavsiye ederiz.

Sunucumuzun tagını (\`tagınız\`) alarak bizlere destek olabilirsin

İçeride keyifli vakitler geçirmeni dileriz.`)
.setImage(`https://media0.giphy.com/media/NKEt9elQ5cR68/200.gif`)
kanal.send(embed)
kanal.send(`<@&${register}>`)
});
//------------------------HOŞGELDİN-EMBEDLİ-----------------------\\

//------------------------ŞÜPHELİ-HESAP-----------------------\\ 
client.on("guildMemberAdd", member => {
  var moment = require("moment")
  require("moment-duration-format")
  moment.locale("tr")
   var {Permissions} = require('discord.js');
   var x = moment(member.user.createdAt).add(7, 'days').fromNow()
   var user = member.user
   x = x.replace("birkaç saniye önce", " ")
   if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
  const kytsz = member.guild.roles.cache.find(r => r.id === "KAYITSIZ ROL ID") 
   var rol = member.guild.roles.cache.get("ŞÜPHELİ ROL ID") // ŞÜPHELİ HESAP ROLÜNÜN İDSİNİ GİRİN
   var kayıtsız = member.guild.roles.cache.get(kytsz) // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
   member.roles.add(rol)
   member.roles.remove(kytsz)

member.user.send('Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır.')
setTimeout(() => {

}, 1000)


   }
        else {

        }
    });

//------------------------ŞÜPHELİ-HESAP-----------------------\\   


//------------------------HOŞGELDİN-EMBEDSİZ-----------------------\\
/*client.on("guildMemberAdd", member => {
  require("moment-duration-format")
    var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
    var üs = üyesayısı.match(/([0-9])/g)
    üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
    if(üs) {
      üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
        return {
          '0': ``,
          '1': ``,
          '2': ``,
          '3': ``,
          '4': ``,
          '5': ``,
          '6': ``,
          '7': ``,
          '8': ``,
          '9': ``}[d];})}
    const kanal = member.guild.channels.cache.find(r => r.id === "KANAL ID");
    let register = 'REGİSTER ROL ID'
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
    const kurulus = new Date().getTime() - user.createdAt.getTime();  
   const gecen = moment.duration(kurulus).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
  var kontrol;
if (kurulus < 1296000000) kontrol = 'Hesap Durumu: Güvenilir Değil.'
if (kurulus > 1296000000) kontrol = 'Hesap Durumu: Güvenilir Gözüküyor.'
  moment.locale("tr")
.setAuthor(member.guild.name, member.guild.iconURL({dynamic:true}))
.setDescription(`
<@`+member.id+`> Sunucumuza Katıldı ! 

Kayıt edilmek için teyit odasında <@&{register}> yetkililerine teyit vermen yeterli !

Seninle birlikte `+üyesayısı+` kişiye ulaştık !

Sunucumuzun kurallarına uymayı unutma, kurallarımızı okumanı tavsiye ederiz.

Sunucumuzun tagını (\`tagınız\`) alarak bizlere destek olabilirsin

İçeride keyifli vakitler geçirmeni dileriz.`)
.setImage(`https://media0.giphy.com/media/NKEt9elQ5cR68/200.gif`)
kanal.send(embed)
kanal.send(`<@&${register}>`)
});*/ 
//------------------------HOŞGELDİN-EMBEDSİZ-----------------------\\


//------------------------TAGA ROL VERME-----------------------\\

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
    let tag = ""; //tagınız
    let sunucu = ""; //sunucu ID
    let kanal = "" //log kanal id
    let rol = ""; //tag alınca verilcek rol id
    if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
      client.channels.cache.get(kanal).send(`${newUser} **\`${tag}\`** tagını aldığı için <@&${rol}> ailemize katıldı :)`)
      client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol)
    } if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
      client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol)
      client.channels.cache.get(kanal).send(`${newUser} **\`${tag}\`** tagını çıkardığı için <@&${rol}> ailemizden ayrıldı :(`)
    }

  }
})
//------------------------TAGA ROL VERME-----------------------\\

//----------------------TAG-KONTROL----------------------\\       

client.on("guildMemberAdd", member => {
  let sunucuid = "SUNUCU ID"; //Buraya sunucunuzun IDsini yazın
  let tag = "TAG"; //Buraya tagınızı yazın
  let rol = "TAGLI ROL ID"; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
  let channel = client.guilds.cache.get(sunucuid).channels.cache.find(x => x.name == 'auto-tag-role'); //tagrol-log yerine kendi log kanalınızın ismini yazabilirsiniz
if(member.user.username.includes(tag)){
member.roles.add(rol)
  const tagalma = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, o doğuştan beri bizden !`)
      .setTimestamp()
     client.channels.cache.get('TAG ALINCA MESAJ GİDİCE KANAL İD').send(tagalma)
}
})

//-----------------------TAG-KONTROL----------------------\\   

client.login(ayarlar.token);