const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const functions = require("../../handlers/functions");
const funcs = require("../../handlers/functions");
module.exports = {
    name: "compile",
    category: "Code",
    aliases: ["code", "run"],
    cooldown: 2,
    usage: "compile",
    description: "Compiles the given code.",
    run: async (client, message, args, user, text, prefix) => {
    try{
      var lines = text.split("\n");
      var lang = lines[0].slice(3);
      var code = "";
      for(var i = 1; i < lines.length - 1; i ++){
        code += lines[i];
        code += "\n";
      }
      functions.getCode(code, lang);
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