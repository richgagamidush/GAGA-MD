const {zokou}=require("../framework/zokou")







zokou({nomCom:"restart",categorie:"Mods",reaction:"🚀"},async(dest,z,com)=>{


  
const{repondre,ms,dev,superUser}=com;

  if(!superUser)
  {
    return repondre("Access denied👿👿👿This command can only be excuted by Gaga or bot owner🌚");
  }

  const {exec}=require("child_process")

    repondre("GAGA-MD bot Restarting ⚽");

  exec("pm2 restart all");
  

  



})
