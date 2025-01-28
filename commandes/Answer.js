const {
  zokou
} = require("../framework/zokou");
const {
  default: axios
} = require("axios");
zokou({
  'nomCom': "darkgpt",
  'reaction': '📡',
  'categorie': 'AI'
}, async (_0x40b158, _0x2101a0, _0x2563b9) => {
  const {
    repondre: _0x49381c,
    arg: _0x207296,
    ms: _0x4dd555
  } = _0x2563b9;
  try {
    if (!_0x207296 || _0x207296.length === 0) {
      return _0x49381c("Please ask a question Gaga will answer it.");
    }
    const _0x5529b9 = _0x207296.join(" ");
    const _0x5d3d03 = await _0xc46c9c("https://api.dreaded.site/api/makgpt?text=" + encodeURIComponent(_0x3c0d7c));
    const _0x20bc85 = _0x303006.data;
    if (_0x20bc85) {
      _0x49381c(_0x20bc85.result);
    } else {
      _0x49381c("Error during response generation.");
    }
  } catch (_0x4baeb0) {
    console.error("Erreur:", _0x4baeb0.message || "Une erreur s'est produite");
    _0x49381c("Oops, an error occurred while processing your request.");
  }
});
