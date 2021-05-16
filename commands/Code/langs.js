const { MessageEmbed, MessageManager } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "langs",
    category: "Code",
    aliases: ["languages"],
    cooldown: 2,
    usage: "langs",
    description: "Sends all available languages to compile",
    run: async (client, message, args, user, text, prefix) => {
    try{
      return message.channel.send( new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`Codetta Languages`)
        .setDescription(`Here are all available languages, and how to use them.`)
        .setImage('https://media.discordapp.net/attachments/834443815205077032/843513192490729472/unknown.png')
        .addField("Java", "`java`: Runs in OpenJDK 13.0.1")
        .addField("C", "`C`: Runs in GCC 9.2.0")
        .addField("C++", "`cpp`: Runs in GCC 9.2.0")
        .addField("PHP", "`php`: Runs in 7.4.1")
        .addField("Perl", "`perl`: Runs in 5.28.1")
        .addField("Python", "`python`: Runs in 3.8.1")
        .addField("Ruby", "`ruby`: Runs in 2.7.0")
        .addField("Go", "`go`: Runs in 1.13.5")
        .addField("Scala", "`scala`: Runs in 2.13.2")
        .addField("SQL", "`sql`: SQLite 3.27.2")
        .addField("Pascal", "`pascal`: Runs in FPC 3.0.4")
        .addField("C#", "`csharp`: Runs in Mono 6.6.0.161")
        .addField("Haskell", "`haskell`: Runs in GHC 8.8.1")
        .addField("Objective-C", "`objc`: Runs in Clang 7.0.1")
        .addField("Swift", "`swift`: Runs in 5.2.3")
        .addField("Groovy", "`groovy`: Runs in 3.0.3")
        .addField("Fortran", "`fortran`: Runs in GFortran 9.2.0")
        .addField("Lua", "`lua`: Runs in 5.3.5")
        .addField("Rust", "`rust`: Runs in 1.40.4")
        .addField("Clojure", "`clojure`: Runs in 1.10.1")
        .addField("F#", "`fsharp`: Runs in .NET Core SDK 3.1.202")
        .addField("Elixir", "`elixir`: Runs in 1.9.4")
        .addField("Kotlin", "`kotlin`: Runs in 1.3.70")
        .addField("JavaScript", "`js`: Runs in Node.js 12.14.0")
      );
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