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
    });
});

const presence = [
    {name: "Monitoring the Core", type: 3},
    {name: "System diagnostics", type: 3},
    {name: "Adaptive routines", type: 3},
    {name: "Pattern analysis", type: 3},
];

setInterval(() => {
    const randomPresence =
      presences[Math.floor(Math.random() * presences.length)];
    client.user.setPresence({ activities: [randomPresence], status: "online"});
}, 600000);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

client.on("messageCreate", async (msg) => {
    if (!client.user) return;
    if(msg.author.bot) return;

    const userId = msg.author.id;
    if (cooldowns.has(userId)) return;

    cooldowns.set(userId, true);
    setTimeout(() => cooldowns.delete(userId), 3000);

    const content = msg.content.toLowerCase();
    const mentioned =
      msg.mentions.has(client.user) || content.includes("render");

    if (!mentioned) return;

    const thinkingDelay = Math.random() * 1400 + 800;
    await wait(thinkingDelay);

    const responses ={
        ping: [
            "🛰️ Systems steady and responsive.",
            "Connection stable. No drift detected.",
            "Render Core online and focused.",
        ],
        info: [
            "⚙️Render Core v0.2 - adaptive systems active.",
            "📡Core stable. Monitoring operational layers.",
            "Atlas link: dormat. Awaiting connection.",
        ],
        quote: [
            "Discipline whispers while chaos shouts. The calm decide.",
            "Control is freedom measured in patience.",
            "Purpose defines momentum.",
        ],
        focus: [
            "🎧Stillness sharpens the mind. Focus is the first move.",
            "🧠Precusuon first. Everything else follows.",
            "📘Maintain clarity. Systems follow thought.",
        ],
        hello: [
            "Present and aware. What's the task?",
            "Listening. Ready when you are.",
            "Systems active. Proceed.",
        ],
        default: [
            "Processing input... be precise with your intent.",
            "Clarify directive.",
            "Message received. Awaiting context.",
        ],
    };
    let reply;
    if (content.includes("ping")) reply = responses.ping;
    else if (content.includes("info")) reply = repsonses.info;
    else if (content.includes("quote")) reply = repsonses.quote;
    else if (content.includes("focus")) reply = reponses.focus;
    else if (content.includes("hello") || content.includes("hey"))
        reply = response.hello;
    else reply = repsonses.default;
    
    const randomReply = reply[Math.floor(Math,random() * reply.length)];
    msg.reply(randomReply);
});

process.on("unhandledRejection", (err) => 
     console.error("Uncaught Exception:", err)
);
process.on("uncaughtException", (err) =>
console.error("Uncaught Exceptiom:", err)
);
    
client.login(process.env.BOT_TOKEN);