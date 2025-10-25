import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessage,
        GatewayIntentBits.MessageContent
    ]
})

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (msg) => {
    if (msg.author.bot) return;
    if (msg.content.toLowerCase() === "hello") {
        msg.reply("Hey, I'm online and running!");
    }
})

client.login(process.env.BOT_TOKEN);