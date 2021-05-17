const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const indices = require("../../botconfig/languageVersions.json");
const functions = require("../../handlers/functions");
const funcs = require("../../handlers/functions");
const request = require('request');
const { debug } = require("request");
module.exports = {
    name: "paste",
    category: "Code",
    aliases: ["makePaste", "createPaste"],
    cooldown: 2,
    usage: "paste ```<language> <code>``` [paste title]",
    description: "Creates a paste with the given code and title.",
    run: async (client, message, args, user, text, prefix) => {
    try{
      var lines = text.split("\n");
      var lang = lines[0].slice(3);
      var code = "";
      var endCodeLine;
      var input = "";
      for(var i = 1; i < lines.length; i ++){
        if(lines[i].startsWith('```')){
          console.log("End Code Line = " + i + " Num lines = " + lines.length);
          endCodeLine = i;
          break;
        }
        code += lines[i];
        code += "\n";
      }
      if(endCodeLine != lines.length-1){
        for(var i = endCodeLine+1; i < lines.length;i ++){
          input += lines[i];
        }
      }
      code.trim(); 
      // console.log(`Lang Index: ${index}`);
      // console.log(`Code: \n${code}`);
      const body = {
        "source_code": code,
        "title": input
      }
      console.log(body);
      if(input) message.channel.send(`Creating a paste called ${input} with code \`\`\`${code}\`\`\``);
      else message.channel.send(`Creating a paste with code \`\`\`${code}\`\`\` in ${lang}`)


      const options = {
        method: 'POST',
        url: 'https://pastebin.com/api/api_post.php',
        form: {api_dev_key: 'BIgMH0TETw8f1VzAW2RnPqiefZMNo5Rx', api_option: "paste", api_paste_format: lang, api_paste_name: input, api_paste_code: code, api_user_key: "afdad8616a0823e126236ddcf0084f86"}
      };
      
      request(options, function (error, response, body) {
          if (error) throw new Error(error);
      
          console.log("Got: " + body);
          return message.channel.send(new MessageEmbed()
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`🟢 Accepted`)
            .addField("View your new paste!", `[Paste](${body})`)
            .addField("Requested by ", user, false)
          )
      });


    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
            .addField("Requested by ", user, false)
        );
    }
  }
}