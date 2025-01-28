
const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

zokou({ nomCom: "update", categorie: "system" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    
    
















   async (dest, zk, commandeOptions, { from, reply }) => {
    try {
        const repoUrl = 'https://github.com/richgagamidush/GAGA-MD.git'; // GitHub repository URL
        const targetFolder = 'commandes'; // Local folder for the repo

        // Ensure the target folder exists
        if (!fs.existsSync(targetFolder)) {
            fs.mkdirSync(targetFolder); // Create folder if it doesn't exist
        }

        // Determine the appropriate Git command
        const gitCommand = fs.existsSync(`${targetFolder}/.git`)
            ? `git -C ${targetFolder} pull` // Pull latest changes if already cloned
            : `git clone ${repoUrl} ${targetFolder}`; // Clone repo if not already done

        // Execute the Git command
        const output = await new Promise((resolve, reject) => {
            exec(gitCommand, (err, stdout, stderr) => {
                if (err) {
                    reject(new Error(`Git command failed: ${stderr.trim()}`));
                } else {
                    resolve(stdout.trim());
                }
            });
        });

        // Send a success message with the output
        await conn.sendMessage(
            from,
            { text: `*GAGA MD Update completed successfully!*\n\n\`\`\`${output}\`\`\`` },
            { quoted: mek }
        );
    } catch (error) {
        console.error(error);
        reply(`*❌ Error during update:* ${error.message}`);
    }
});
