import express from "express";
import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Render bot is alive and running.");
});

app.listen(PORT, () => console.log(`Ping server running on port ${PORT}`));

const cooldowns = new Map();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
});

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setPresence({
        activities: [{ name: "Monitoring the Core", type: 3}],
    })
});

client.on("messageCreate", async (msg) => {
    if (!client.user) return;
    if(msg.author.bot) return;

    const userId = msg.author.id;
    if (cooldowns.has(userId)) return;

    cooldowns.set(userId, True);
    setTimeout(() => cooldowns.delete(userId), 3000);

    const content = msg.content.toLowerCase();
    const mentioned =
      msg.mentions.has(client.user) || content.includes("render");

    if (!mentioned) return;

    if (content.includes("ping")) {
        msg.reply("🔵Connection stable. Systems steady and respoonsive.");
    }   else if (content.includes("info")) {
        msg.reply("⚙️Atlas Core Beta v0.1 - calm, stable, and online.");
    }   else if (content.includes("quote")) {
        msg.reply("🧠Discipline whispers while chaos shouts. The calm decide.");
    }   else if (content.includes("focus")) {
        msg.reply("⏳Stillness sharpens the mind. Focus is the first move.");
    }   else if (content.includes("hello") || content.includes("hey")) {
        msg.reply("Present and aware. What's the task?");
    }   else {
        msg.reply("Processing input... be precise with your intent.");
    }
});

process.on("unhandledRejection", (err) => 
     console.error("Uncaught Exception:", err)
);
process.on("uncaughtException", (err) =>
console.error("Uncaught Exceptiom:", err)
);
    
client.login(process.env.BOT_TOKEN);