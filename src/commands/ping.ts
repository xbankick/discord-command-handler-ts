import { Message } from 'discord.js';
import { TextCommand } from '../templates/textCommand';

class Ping implements TextCommand {
    name: string = "ping";
    description: string = 'Test ping.';
    isOwner: boolean = true;
    async execute(message: Message, args: string[]) {
        if (!message.channel.isSendable()) return;
        const sentMessage = await message.channel.send('Pong: ... 🏓')
        const ping = sentMessage.createdTimestamp - message.createdTimestamp;
        sentMessage.edit(`Pong: ${ping}ms 🏓`);
    }
}
module.exports = new Ping();