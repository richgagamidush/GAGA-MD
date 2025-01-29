
const { keith } = require('../keizzah/keith');
const axios = require("axios");
const { getytlink, ytdwn } = require("../keizzah/ytdl-core");
const yts = require("yt-search");
const fs = require('fs');
const conf = require(__dirname + '/../set');

keith({
  nomCom: "tiktoksearch",
  aliases: ["tiksearch", "tiktoklist"],
  categorie: "search",
  reaction: "📽️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  // Check if there is a query in the arguments
  if (!arg || !arg[0]) {
    return repondre('Please provide a query!');
  }

  try {
    // URL for the TikTok search API
    const searchApiUrl = `https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=${encodeURIComponent(arg.join(' '))}`;
    const response = await axios.get(searchApiUrl);

    // Check if response data is valid and contains search results
    const searchData = response.data.data;
    if (!searchData || searchData.length === 0) {
      return repondre("No TikTok search results found.");
    }

    // Construct TikTok search message
    let searchMessage = `${conf.BOT} 𝐓𝐈𝐊𝐓𝐎𝐊 𝐒𝐄𝐀𝐑𝐂𝐇\n\n`;

    // Loop through search results and construct track info with numbers
    searchData.forEach((track, index) => {
      const trackNumber = index + 1; // Number tracks starting from 1
      searchMessage += `*┃${trackNumber}.* ${track.title}\n`;
      searchMessage += `*┃Region*: ${track.region || "Unknown"}\n`;
      searchMessage += `*┃ID*: ${track.id}\n`;  // `id` is the video ID
      searchMessage += `*┃Video URL*: ${track.url}\n`;
      searchMessage += `*┃Cover Image*: ${track.cover}\n`;
      searchMessage += `*┃Views*: ${track.views || 0}\n`;
      searchMessage += `*┃Likes*: ${track.likes || 0}\n`;
      searchMessage += `*┃Comments*: ${track.comments || 0}\n`;
      searchMessage += `*┃Shares*: ${track.share || 0}\n`;
      searchMessage += `*┃Download Count*: ${track.download || 0}\n`;
      searchMessage += `───────────────────◆\n\n`;
    });

    // Determine the thumbnail URL
    const thumbnailUrl = searchData[0]?.cover || conf.URL;

    // Send the playlist message
    await zk.sendMessage(
      dest,
      {
        text: searchMessage,
        contextInfo: {
          mentionedJid: [dest],
          externalAdReply: {
            showAdAttribution: true,
            title: conf.BOT,
            body: conf.OWNER_NAME,
            thumbnailUrl: thumbnailUrl,
            sourceUrl: conf.GURL,
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
    );
  } catch (error) {
    // Log and respond with error message
    console.error(error);  // Log the error to the console
    repondre(`Error: ${error.message || 'Something went wrong.'}`);
  }
});

keith({
  nomCom: "twittersearch",
  aliases: ["xsearch", "twitterlist", "tweetsearch", "xsearch"],
  categorie: "search",
  reaction: "📽️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  // Ensure a query is provided in the arguments
  if (!arg || !arg[0]) {
    return repondre('Please provide a query!');
  }

  try {
    // Define the search API URL
    const searchApiUrl = `https://apis-starlights-team.koyeb.app/starlight/Twitter-Posts?text=${encodeURIComponent(arg.join(' '))}`;
    const response = await axios.get(searchApiUrl);
    const searchData = response.data.result;  // Assuming 'result' contains an array of tweets

    // Check if no results are found
    if (!searchData || searchData.length === 0) {
      return repondre("No Twitter search results found.");
    }

    // Construct the search message
    let searchMessage = `${conf.BOT} 𝐓𝐖𝐈𝐓𝐓𝐄𝐑 𝐒𝐄𝐀𝐑𝐂𝐇\n\n`;
    searchMessage += `Creator: ${response.data.creator}\n\n`;  // Include the creator info

    // Loop through search results and append details to the message
    searchData.forEach((track, index) => {
      const trackNumber = index + 1; // Number tracks starting from 1
      searchMessage += `*┃${trackNumber}.* ${track.user}\n`;
      searchMessage += `*┃Profile*: ${track.profile || "Unknown"}\n`;
      searchMessage += `*┃Post*: ${track.post}\n`;  // The text of the tweet
      searchMessage += `*┃User Link*: ${track.user_link}\n`;  // Link to the user's profile
      searchMessage += `───────────────────◆\n\n`;
    });

    // Determine the thumbnail URL
    const thumbnailUrl = searchData[0]?.profile || conf.URL;

    // Send the search result message
    await zk.sendMessage(
      dest,
      {
        text: searchMessage,
        contextInfo: {
          mentionedJid: [dest],
          externalAdReply: {
            showAdAttribution: true,
            title: conf.BOT,
            body: conf.OWNER_NAME,
            thumbnailUrl: thumbnailUrl,
            sourceUrl: conf.GURL,
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      }
    );
  } catch (error) {
    // Log and respond with the error message
    console.error(error);  // Log the error to the console
    repondre(`Error: ${error.message || 'Something went wrong.'}`);
  }
});


keith({
  nomCom: "yts",
  categorie: "Search",
  reaction: "✋"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  const query = arg.join(" ");

  if (!query) {
    return repondre("Please provide a search query.");
  }

  try {
    const info = await yts(query);
    const results = info.videos;

    if (results.length === 0) {
      return repondre("No results found.");
    }

    let captions = `*${conf.BOT} YOUTUBE SEARCH*\n`;
    results.slice(0, 10).forEach((video, index) => {
      captions += `*────────────────────*\n${index + 1}.*Title:* ${video.title}\n*Time:* ${video.timestamp}\n*Url:* ${video.url}\n`;
    });

    captions += "\n─────────────────────\n*";

    const thumb = results[0].thumbnail; // Using the first video's thumbnail

    await zk.sendMessage(dest, {
      image: { url: thumb },
      caption: captions,
      contextInfo: {
        externalAdReply: {
          title: `${conf.BOT} YouTube Search`,
          body: `Top results for "${query}"`,
          mediaType: 1,
          thumbnailUrl: thumb,
          sourceUrl: conf.GURL,
          showAdAttribution: true,
        },
      },
    }, { quoted: ms });

  } catch (error) {
    console.error("Error during the search process:", error);
    repondre("Error during the search process: " + error.message);
  }
});

