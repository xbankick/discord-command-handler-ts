import { Collection, Events } from "discord.js";
import { client } from "..";
import { owner, prefix } from '../../config.json';
import { TextCommand } from "../templates/textCommand";
import load from "./loader";

const commands: Collection<string, TextCommand> = load();

client.on(Events.MessageCreate, async (message) => {
    // didn't start with prefix? return.
    if (!message.content.startsWith(prefix)) return;
    // is bot? return.
    if (message.author.bot) return;
    // is system? return.
    if (message.system) return;

    // get args.
    const args = message.content.slice(prefix.length).trim().split(/\s+/g);
    // getting command used.
    const commandName = args[0].toLowerCase();
    // trying to get comamnd.
    let command = commands.get(commandName)

    // if not a command name; check if it alias.
    if (!command)
        command = commands.filter(
            (c) => c.aliases ?
                c.aliases.map(arg => arg.toLowerCase())
                    .includes(commandName)
                : null
        )
            .first()

    // if not command; return.
    if (!command) return;

    // handle isGuild.
    if (command.isGuild) {
        if (!message.guild) return

        // handle roles
        if (command.roles) {
            if (!message.member) return
            for (const role of command.roles) {
                if (!message.member.roles.cache.has(role)) return;
            }
        }
        // handle permissions
        if (command.permissions) {
            if (!message.member) return
            for (const p of command.permissions) {
                if (!message.member.permissions.has(p)) {
                    return;
                }
            }
        }
    }

    // handle Owner.
    if (command.isOwner) {
        if (message.author.id != owner) return;
    }

    try {
        command.execute(message, args)
    } catch (err) {
        console.error(err);
    }
});