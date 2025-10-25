import express from "express";
import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.semd("Render bot is alive and running.");
});

app.listen(PORT, () => console.log(`Ping server running on port ${PORT}`));

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (msg) => {
    if (msg.author.bot) return;
    const content = msg.content.toLowerCase();

    const mentioned =
      msg.mentions.has(client.user) || content.includes("render");

    if (!mentioned) return;

    if (content.includes("ping")) {
        msg.reply("🏓Pong steady and responsive.");
    }   else if (content.includes("info")) {
        msg.reply("Atlas Core Beta v0.1 - system stable and online.");
    }   else if (content.includes("quote")) {
        msg.reply("Discipline is the quiet form of confidence.");
    }   else if (content.includes("focus")) {
        msg.reply("Stay grounded. You move, the vision moves.");
    }   else if (content.includes("hello") || content.includes("hey")) {
        msg.reply("I'm here. What's the mission?);")
    }
});

process.on("unhandledRejection", (err) => console.error("Unhandled Rejection;", err));
process.on("uncaughtException", (err) => console.error("Uncaught Exception:", err));
    
client.login(process.env.BOT_TOKEN);