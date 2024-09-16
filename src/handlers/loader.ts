import { Collection } from "discord.js";
import fs from "fs";
import path from "path";
import { TextCommand } from "../templates/textCommand";

function load() {
    const commands: Collection<string, TextCommand> = new Collection();
    const commandsPath: string = path.join(__dirname, '../commands');
    const commandFiles: string[] = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
    for (const file of commandFiles) {
        const command: TextCommand = require(path.join(commandsPath, file));
        commands.set(command.name, command);
    }
    return commands;
}

export default load;