const { zokou } = require("../framework/zokou");
const axios = require('axios');
const ytSearch = require('yt-search');

// Define the command with aliases
zokou({
  nomCom: "play",
  aliases: ["play", "music", "song", "mp3"],
  categorie: "Search",
  reaction: "🎵"
}, async (dest, zk, commandOptions) => {
  const { arg, ms, repondre } = commandOptions;

  if (!q) {
    return reply("Please provide a title or link (Spotify/YouTube)!");
  }

  reply("GAGA MD Fetching audio... ");

  let spotifySent = false;
  let youtubeSent = false;

  try {
    // Fetch from Spotify
    const spotifyResponse = await axios.get(
      `https://spotifyapi.caliphdev.com/api/search/tracks?q=${encodeURIComponent(q)}`
    );
    const spotifyTrack = spotifyResponse.data?.[0]; // Safely access first track

    if (spotifyTrack) {
      const trackStream = await axios({
        url: `https://spotifyapi.caliphdev.com/api/download/track?url=${encodeURIComponent(spotifyTrack.url)}`,
        method: "GET",
        responseType: 'stream'
      });

      if (trackStream.headers["content-type"]?.includes("audio/mpeg")) {
        await client.sendMessage(from, {
          audio: trackStream.data,
          mimetype: "audio/mpeg",
          contextInfo: {
            externalAdReply: {
              title: spotifyTrack.title,
              body: "GAGA MD: SPOTIFY",
              mediaType: 1,
              sourceUrl: spotifyTrack.url,
              renderLargerThumbnail: true
            }
          }
        });
        spotifySent = true;
      } else {
        console.log("Spotify stream not in audio/mpeg format.");
      }
    } else {
      console.log("No Spotify track found.");
    }
  } catch (error) {
    console.error("Spotify Error:", error.message);
  }

  try {
    // Fetch from YouTube
    const youtubeSearchResults = await yts(q);
    const youtubeVideo = youtubeSearchResults.videos[0];

    if (youtubeVideo && youtubeVideo.seconds < 3600) { // Video duration < 1 hour
      const youtubeAudio = await youtube(youtubeVideo.url);

      if (youtubeAudio?.mp3) {
        await client.sendMessage(from, {
          audio: { url: youtubeAudio.mp3 },
          mimetype: "audio/mpeg",
          contextInfo: {
            externalAdReply: {
              title: youtubeVideo.title,
              body: "GAGA MD: YOUTUBE",
              mediaType: 1,
              sourceUrl: youtubeVideo.url,
              renderLargerThumbnail: true
            }
          }
        });
        youtubeSent = true;
      } else {
        console.log("Failed to fetch YouTube audio.");
      }
    } else {
      console.log("No suitable YouTube results found.");
    }
  } catch (error) {
    console.error("YouTube Error:", error.message);
  }

  if (!spotifySent && !youtubeSent) {
    reply("Failed to fetch audio from both Spotify and YouTube.");
  } else if (spotifySent && youtubeSent) {
    reply("Both Spotify and YouTube audio sent successfully.");
  } else if (spotifySent) {
    reply("GAGA TECH: Spotify audio sent successfully.");
  } else if (youtubeSent) {
    reply("*GAGA MD: Download and successfully*.");
  }
});
