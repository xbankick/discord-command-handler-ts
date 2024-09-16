import { Client, Events, GatewayIntentBits, Partials } from 'discord.js';
require('dotenv').config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
    ],
    partials: [
        Partials.Channel
    ]
});

client.once(Events.ClientReady, () => {
    import('./handlers/textCommandsHandler');
    console.log(`Logged in as ${client.user?.tag}!`);
});

client.login(process.env.YOUR_BOT_TOKEN);

export { client };

