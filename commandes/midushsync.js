const { zokou } = require('../framework/zokou');
const traduire = require("../framework/traduction") ;
const { default: axios } = require('axios');
//const conf = require('../set');




zokou({nomCom:"update",reaction:"🚓",categorie:"General"},
        async(Void, citel, text,{ isCreator }) => {
            if (!isCreator) return citel.reply('This command is only for my owner')
            let commits = await DB.syncgit()
            if (commits.total === 0) { citel.reply(`Hey ${citel.pushName}. You have latest version installed.`)} 
            else {
                let update = await DB.sync()
                return await Void.sendMessage(citel.chat, { text: update,});
            }

        }
    )
  
