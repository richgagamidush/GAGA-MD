// Define the command with aliases for video
zokou({
  nomCom: "video1",
  aliases: ["videodoc", "film", "mp4"],
  categorie: "Search",
  reaction: "💬"
}, async (dest, zk, commandOptions) => {
  const { arg, ms, repondre } = commandOptions;

  // Check if a query is provided
  if (!arg[0]) {
    return repondre("Please provide a video name.");
  }

  const query = arg.join(" ");

  try {
    // Perform a YouTube search based on the query
    const searchResults = await ytSearch(query);

    // Check if any videos were found
    if (!searchResults || !searchResults.videos.length) {
      return repondre('No video found for the specified query.');
    }

    const firstVideo = searchResults.videos[0];
    const videoUrl = firstVideo.url;

    // Function to get download data from APIs
    const getDownloadData = async (url) => {
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error('Error fetching data from API:', error);
        return { success: false };
      }
    };

    // List of APIs to try
    const apis = [
      `https://api-rin-tohsaka.vercel.app/download/ytmp4?url=${encodeURIComponent(videoUrl)}`,
      `https://api.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(videoUrl)}`,
      `https://www.dark-yasiya-api.site/download/ytmp4?url=${encodeURIComponent(videoUrl)}`,
      `https://api.giftedtech.web.id/api/download/dlmp4?url=${encodeURIComponent(videoUrl)}&apikey=gifted-md`,
      `https://api.dreaded.site/api/ytdl/video?url=${encodeURIComponent(videoUrl)}`
    ];
   for (const api of apis) {
      downloadData = await getDownloadData(api);
      if (downloadData && downloadData.success) break;
    }

    // Check if a valid download URL was found
    if (!downloadData || !downloadData.success) {
      return repondre('Failed to retrieve download URL from all sources. Please try again later.');
    }

    const downloadUrl = downloadData.result.download_url;
    const songTitle = downloadData.result.title;
    const videoThumbnail = firstVideo.thumbnail;
    const videoChannel = downloadData.result.author;
    const videoPublished = downloadData.result.uploadDate;
    const videoViews = downloadData.result.viewCount;

    // Prepare the message with song details
    const messagePayload = {
      caption: `\n*𝗡𝗝𝗔𝗕𝗨𝗟𝗢 𝗝𝗕 𝗦𝗢𝗡𝗚𝗦*\n
╭━━━━━━━━━━━━━━━━━⊷
┃ *Title:* ${songTitle} 
┃ *Quality:* High
┃ *Duration:* ${firstVideo.timestamp}
╰━━━━━━━━━━━━━━━━━⊷
⦿ *Direct YtLink:* ${videoUrl}

╭━━━━━━━━━━━━━━━━━⊷
┃ _Hallo download and enjoy_
╰━━━━━━━━━━━━━━━━━⊷`,
      document: { url: downloadUrl },
        mimetype: 'audio/mpeg',
        contextInfo: {
          externalAdReply: {
            title: "𝗡𝗝𝗔𝗕𝗨𝗟𝗢 𝗝𝗕" ,
            body: "Tap her to follow our channel",
            mediaType: 1,
            sourceUrl:"https://whatsapp.com/channel/0029VarYP5iAInPtfQ8fRb2T",
            thumbnailUrl: firstVideo.thumbnail,
            renderLargerThumbnail: false,
            showAdAttribution: true,
        }
      }
    };

    await zk.sendMessage(dest, messagePayload, { quoted: ms });

  } catch (error) {
    console.error('Error during download process:', error);
    return repondre(`Download failed due to an error: ${error.message || error}`);
  }
});
