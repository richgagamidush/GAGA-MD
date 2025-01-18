const util = require('util');

const fs = require('fs-extra');

const { zokou } = require(__dirname + "/../framework/zokou");

const { format } = require(__dirname + "/../framework/mesfonctions");

const os = require("os");

const moment = require("moment-timezone");

const s = require(__dirname + "/../set");



zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {

    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;

    let { cm } = require(__dirname + "/../framework//zokou");

    var coms = {};

    var mode = "public";

    

    if ((s.MODE).toLocaleLowerCase() != "yes") {

        mode = "private";

    }





    



    cm.map(async (com, index) => {

        if (!coms[com.categorie])

            coms[com.categorie] = [];

        coms[com.categorie].push(com.nomCom);

    });



    moment.tz.setDefault(s.TZ);



// Créer une date et une heure en GMT

const temps = moment().format('HH:mm:ss');

const date = moment().format('DD/MM/YYYY');



  let infoMsg =  `

╔═━━━━════───➳
┃ ━━✫*XGAGA*✫━━
┃ ¶Mode : ${mode}
┃ ¶User : ${s.OWNER_NAME}
┃ ¶Library : Baileys
┃ ¶Prefix : ${s.PREFIXE}
┃ ¶Date : ${date}
┃ ¶Time : ${temps}
┃ ¶Tools : ${cm.length}
┃ ¶Ramm : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
┃ ¶Host : ${os.platform()}
┃ ✫━━━━═════━━━━✫
╚══━━━════───\n\n`;


    

let menuMsg = `
┏━━━━══════━━━┓
┃🎇 *QUOTE* 🎆
"${randomQuote}"
┗━━━━═══════━━┛\n


`;



    for (const cat in coms) {

        menuMsg += `🛑_*${cat}*`;

        for (const cmd of coms[cat]) {
            
            menuMsg += `
┃🔘┃ ${cmd}`;

        }

        menuMsg += `
            \n`

    }



    menuMsg += `


 ╭──═════━━━━━━━━┓
 ┃® GAGA BOT
 ╰──━━══━━━━━━━━━┛
 ╭──━━━━━━━━━━━━━┓
 ┃Stay connected with  🔥
 ╰──━━═══━━━━━━━━┛\n


`;



   var lien = mybotpic();



   if (lien.match(/\.(mp4|gif)$/i)) {

    try {

        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *TKM-BOT*, déveloper Cod3uchiha" , gifPlayback : true }, { quoted: ms });

    }

    catch (e) {

        console.log("🥵🥵 Menu error " + e);

        repondre("🥵🥵 Menu error " + e);

    }

} 

// Vérification pour .jpeg ou .png

else if (lien.match(/\.(jpeg|png|jpg)$/i)) {

    try {

        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *ʜᴀɴs-ᴍᴅ*, déveloper ʜᴀɴsᴛᴢ" }, { quoted: ms });

    }

    catch (e) {

        console.log("🥵🥵 Menu error " + e);

        repondre("🥵🥵 Menu error " + e);

    }

} 

else {

    

    repondre(infoMsg + menuMsg);

    

}



});
// Random quotes array
const quotes = [
    "Dream big, work hard.",
    "Stay humble, hustle hard.",
    "Believe in yourself.",
    "Success is earned, not given.",
    "Actions speak louder than words.",
    "The best is yet to come.",
    "Keep pushing forward.",
    "Do more than just exist.",
    "Progress, not perfection.",
    "Stay positive, work hard.",
    "Be the change you seek.",
    "Never stop learning.",
    "Chase your dreams.",
    "Be your own hero.",
    "Life is what you make of it.",
    "Do it with passion or not at all.",
    "You are stronger than you think.",
    "Create your own path.",
    "Make today count.",
    "Embrace the journey.",
    "The best way out is always through.",
    "Strive for progress, not perfection.",
    "Don't wish for it, work for it.",
    "Live, laugh, love.",
    "Keep going, you're getting there.",
    "Don’t stop until you’re proud.",
    "Success is a journey, not a destination.",
    "Take the risk or lose the chance.",
    "It’s never too late.",
    "Believe you can and you're halfway there.",
    "Small steps lead to big changes.",
    "Happiness depends on ourselves.",
    "Take chances, make mistakes.",
    "Be a voice, not an echo.",
    "The sky is the limit.",
    "You miss 100% of the shots you don’t take.",
    "Start where you are, use what you have.",
    "The future belongs to those who believe.",
    "Don’t count the days, make the days count.",
    "Success is not the key to happiness. Happiness is the key to success."
];

// Function to get a random quote
const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
};
