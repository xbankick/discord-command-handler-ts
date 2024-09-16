import { Message } from 'discord.js';

export interface TextCommand {
    name: string;
    aliases?: string[]
    description?: string;
    isGuild?: boolean;
    isOwner?: boolean;
    roles?: string[];
    permissions?: bigint[];
    execute(message: Message, args: string[]): void;
}