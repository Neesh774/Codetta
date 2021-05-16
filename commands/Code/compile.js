const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const indices = require("../../botconfig/languageVersions.json");
const functions = require("../../handlers/functions");
const funcs = require("../../handlers/functions");
const request = require('request');
const { debug } = require("request");
module.exports = {
    name: "compile",
    category: "Code",
    aliases: ["code", "run"],
    cooldown: 2,
    usage: "compile",
    description: "Compiles the given code. Remember, the code you put in must be the entire file, so if there are any main functions required, include those as well.",
    run: async (client, message, args, user, text, prefix) => {
    try{
      var lines = text.split("\n");
      var lang = lines[0].slice(3);
      var code = "";
      var index = indices[lang]['id'];
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
      // if(!endCodeLine == lines.length-1){
      //   console.log("Found input");
      //   for(var i = endCodeLine+1; i < lines.length;i ++){
      //     input += lines[i];
      //   }
      // }
      code.trim(); 
      // console.log(`Lang Index: ${index}`);
      // console.log(`Code: \n${code}`);
      const body = {
        "source_code": code,
        "language_id": index,
        "stdin": input
      }
      console.log(body);
      message.channel.send("Thinking...");
      const POSToptions = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        qs: {base64_encoded: 'false', fields: '*'},
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-key': 'd6f38a8010msh80def6bcd5ffaeap11ccd2jsnb191fc4ab056',
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
          useQueryString: true
        },
        body: body,
        json: true
      };
      var token;
      request(POSToptions, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        token = body['token'];
        var messageID;
        const GEToptions = {
          method: 'GET',
          url: 'https://judge0-ce.p.rapidapi.com/submissions/' + token,
          qs: {base64_encoded: 'false', fields: '*'},
          headers: {
            'x-rapidapi-key': 'd6f38a8010msh80def6bcd5ffaeap11ccd2jsnb191fc4ab056',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            useQueryString: true
          }
        };
        
        request(GEToptions, function (error, response, body) {
          if (error) throw new Error(error);
          try{
            body = JSON.parse(body);
          // console.log(body);
          console.log("Output: " + body['stdout']);
          console.log("Time: " + body['time']);
          console.log("Status: " + body['status']['description']);
          console.log("Language: " + body['language']['name']);
          if(body['stdout']){
            message.channel.send(new MessageEmbed()
              .setColor(ee.color)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle("🟢 Accepted")
              .setThumbnail(indices[lang]['image'])
              .setDescription(`\`\`\`${code}\`\`\``)
              .addField("Output: ", body['stdout'], true)
              .addField("Status: ", body['status']['description'], true)
              .addField('\u200B', '\u200B')
              .addField("Time: ", `${body['time']}ms`, true)
              .addField("Ran in ", body['language']['name'], true)
              .addField("Token: ", token, false)
              .addField("Requested by ", user, false)
            )
          }
          else if(body['status'] === "Processing"){
            message.channel.send(new MessageEmbed()
              .setColor(ee.color)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle("🟢 Try that again")
              .setDescription("Looks like there was an error. Try that command again.")
              .addField("Requested by ", user, false)
            )
          }
          else{
            message.channel.send(new MessageEmbed()
              .setColor(ee.color)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle("🟢 Accepted")
              .setDescription(`\`\`\`${code}\`\`\``)
              .addField("Error: ", body['stderr'])
              .addField("Compile output: ", `\`\`\`${body['compile_output']}\`\`\``)
              .addField("Status: ", body['status']['description'])
              .addField("Time: ", `${body['time']}ms`)
              .addField("Ran in ", body['language']['name'])
              .addField("Requested by ", user, false)
            )
          }
          }
          catch(e){
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`❌ ERROR | An error occurred`)
              .setDescription(`\`\`\`${e.stack}\`\`\``)
              .addField("Requested by ", user, false)
            );
          }
        });
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