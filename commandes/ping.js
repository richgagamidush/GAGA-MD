const {
  zokou
} = require("../framework/zokou");
const axios = require("axios");
const ytSearch = require("yt-search");
zokou({
  'nomCom': "play",
  'aliases': ["song", "ytmp4", "luckyvideo", "mp3"],
  'categorie': "Search",
  'reaction': '🎸'
}, async (_0x5e4068, _0xc8a335, _0x3852e4) => {
  const {
    arg: _0x493163,
    ms: _0x57913c,
    repondre: _0x89edd7
  } = _0x3852e4;
  if (!_0x493163[0]) {
    return _0x89edd7("Please provide a video name.");
  }
  const _0x9be2a9 = _0x493163.join(" ");
  try {
    const _0x5b5198 = await ytSearch(_0x9be2a9);
    if (!_0x5b5198 || !_0x5b5198.videos.length) {
      return _0x89edd7("No video found for the specified query.");
    }
    const _0x23e49a = _0x5b5198.videos[0];
    const _0x23313f = _0x23e49a.url;
    const _0x2accf8 = async _0x40c96b => {
      try {
        const _0x346ece = await axios.get(_0x40c96b);
        return _0x346ece.data;
      } catch (_0x2ddab1) {
        console.error("Error fetching data from API:", _0x2ddab1);
        return {
          'success': false
        };
      }
    };
    const _0x5844f7 = ["https://api-rin-tohsaka.vercel.app/download/ytmp4?url=" + encodeURIComponent(_0x23313f), "https://api.davidcyriltech.my.id/download/ytmp4?url=" + encodeURIComponent(_0x23313f), "https://www.dark-yasiya-api.site/download/ytmp3?url=" + encodeURIComponent(_0x23313f), "https://api.giftedtech.web.id/api/download/dlmp3?url=" + encodeURIComponent(_0x23313f) + "&apikey=gifted-md", "https://api.dreaded.site/api/ytdl/audio?url=" + encodeURIComponent(_0x23313f)];
    let _0x1b364e;
    for (const _0x4997f3 of _0x5844f7) {
      _0x1b364e = await _0x2accf8(_0x4997f3);
      if (_0x1b364e && _0x1b364e.success) {
        break;
      }
    }
    if (!_0x1b364e || !_0x1b364e.success) {
      return _0x89edd7("Failed to retrieve download URL from all sources. Please try again later.");
    }
    const _0x5df703 = _0x1b364e.result.download_url;
    const _0x5b25ad = _0x1b364e.result;
    const _0x541eb8 = {
      'video': {
        'url': _0x5df703
      },
      'mimetype': "audio/mp3",
      'contextInfo': {
        'externalAdReply': {
          'title': _0x5b25ad.title,
          'body': _0x5b25ad.title,
          'mediaType': 0x1,
          'sourceUrl': "https://whatsapp.com/channel/0029VasnifMFi8xW4Mqysn2F",
          'thumbnailUrl': _0x23e49a.thumbnail,
          'renderLargerThumbnail': true,
          'showAdAttribution': false
        }
      }
    };
    await _0xc8a335.sendMessage(_0x5e4068, _0x541eb8, {
      'quoted': _0x57913c
    });
  } catch (_0x50f10e) {
    console.error("Error during download process:", _0x50f10e);
    return _0x89edd7("Download failed due to an error: " + (_0x50f10e.message || _0x50f10e));
  }
});
