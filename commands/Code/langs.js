const { MessageEmbed, MessageManager } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const langs = require("../../botconfig/languageVersions.json");
module.exports = {
    name: "langs",
    category: "Code",
    aliases: ["languages"],
    cooldown: 2,
    usage: "langs",
    description: "Sends all available languages to compile",
    run: async (client, message, args, user, text, prefix) => {
    try{
      var embed = new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`Codetta Languages`)
        .setDescription(`Here are all available languages, and how to use them.`)
        .setImage('https://media.discordapp.net/attachments/834443815205077032/843513192490729472/unknown.png');
    for(var i = 0; i < Object.keys(langs).length; i ++){
        console.log("Checking " + Object.keys(langs)[i]);
        embed.addField(Object.values(langs)[i]['name'], `\`${Object.keys(langs)[i]}\`: Runs in ${Object.values(langs)[i]['engine']}`);
    }
    return message.channel.send(embed);
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}