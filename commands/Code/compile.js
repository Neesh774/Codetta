const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const indices = require("../../botconfig/languageVersions.json");
const functions = require("../../handlers/functions");
const funcs = require("../../handlers/functions");
const request = require('request');
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
      var index = indices[lang];
      for(var i = 1; i < lines.length - 1; i ++){
        code += lines[i];
        code += "\n";
      }
      code.trim(); 
      // console.log(`Lang Index: ${index}`);
      // console.log(`Code: \n${code}`);

      const body = {
        "source_code": code,
        "language_id": index,
      }
      console.log(body);
      const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        qs: {base64_encoded: 'true', fields: '*'},
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-key': 'd6f38a8010msh80def6bcd5ffaeap11ccd2jsnb191fc4ab056',
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
          useQueryString: true
        },
        body: body,
        json: true
      };
      
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
      
        console.log(body);
      });
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