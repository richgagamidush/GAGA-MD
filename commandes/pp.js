













const {
  zokou
} = require("../framework/zokou");
const axios = require("axios");
const Genius = require("genius-lyrics");
const Client = new Genius.Client('jKTbbU-6X2B9yWWl-KOm7Mh3_Z6hQsgE4mmvwV3P3Qe7oNa9-hsrLxQV5l5FiAZO');
zokou({
  'nomCom': "bible",
  'reaction': '🎓',
  'categorie': "General"
}, async (_0x1d3930, _0x367c74, _0x33306c) => {
  const {
    repondre: _0x79010,
    arg: arguments,
    ms: _0x1e4814
  } = _0x33306c;
  const _0x491925 = arguments.join(" ");
  if (!_0x491925) {
    return _0x79010("Please specify the book, the chapter and the verse you want to read. Example: bible Romans 6:23");
  }
  let _0x12b57e = await fetch('https://bible-api.com/' + _0x491925);
  if (!_0x12b57e.ok) {
    return _0x79010("Please specify the chapter number or name. Example: bible john 3:16");
  }
  let _0x1c7aad = await _0x12b57e.json();
  let _0x4fd368 = "⚓ *THE HOLY BIBLE*\n\n🔘 *_VERSE:_* " + _0x1c7aad.reference + "\n\n🔘 *_NO. VERSES:_* " + _0x1c7aad.verses.length + "\n\n🔘 *_NOW READ:_* " + _0x1c7aad.text + "\n\n🔘 *_LANGUAGE_:* " + _0x1c7aad.translation_name + "\n\n\n\n│ > Genarated by Gaga md\n";
  await _0x79010(_0x4fd368);
});
zokou({
  'nomCom': "poll",
  'reaction': '✨',
  'categorie': 'General'
}, async (_0x1242a3, _0x55ea42, _0x25751c) => {
  const {
    repondre: _0x3d1bd1,
    arg: arguments,
    ms: _0x225d62
  } = _0x25751c;
  const _0x3f13a3 = arguments.join(" ");
  let [_0x5964eb, _0x4092e0] = _0x3f13a3.split('/');
  if (_0x3f13a3.split('/').length < 0x2) {
    return _0x3d1bd1("Incorrect format.\nExample: poll what is 1+1/2, 3, 4");
  }
  let _0x550abe = [];
  for (let _0x5806eb of _0x4092e0.split(',')) {
    _0x550abe.push(_0x5806eb);
  }
  await _0x55ea42.sendMessage(_0x1242a3, {
    'poll': {
      'name': _0x5964eb,
      'values': _0x550abe
    }
  });
});
zokou({
  'nomCom': "fact",
  'reaction': '✌️',
  'categorie': 'User'
}, async (_0x3a9351, _0x4af598, _0x3675ea) => {
  const {
    repondre: _0x145c63,
    arg: arguments,
    ms: _0x35d619
  } = _0x3675ea;
  const _0x435d09 = await fetch("https://nekos.life/api/v2/fact");
  const _0x2cbfd7 = await _0x435d09.json();
  _0x145c63("◆━━━━━━✦FACT✦━━━━━━◆ \n*◇* " + _0x2cbfd7.fact + "\n\n\n\n\n*◇* Engine by Gaga md\n\n╔═════◇\n║◇ *KEEP USING HANS MD BOT*\n╚════════════════════> ");
});
zokou({
  'nomCom': "quotes",
  'reaction': '🗿',
  'categorie': "User"
}, async (_0xaa8493, _0x23a598, _0x3b03d0) => {
  const {
    repondre: _0x46c05e,
    arg: arguments,
    ms: _0x55e78b
  } = _0x3b03d0;
  const _0x425fe4 = await fetch("https://favqs.com/api/qotd");
  const _0x5629f8 = await _0x425fe4.json();
  const _0x1551ee = "\n◆━━━━━━✦QUOTE✦━━━━━━◆ \n◇ _" + _0x5629f8.quote.body + "_\n\n\n◇ *AUTHOR:* " + _0x5629f8.quote.author + "\n\n\n\n\n◇ _Engine by:_ *GAGA-MF*\n\n\n╔═════◇\n║◇ *KEEP USING GAGA MD BOT*\n╚════════════════════> ";
  _0x46c05e(_0x1551ee);
});
zokou({
  'nomCom': 'define',
  'reaction': '😁',
  'categorie': "Search"
}, async (_0x5125b5, _0x490f5c, _0x9633c6) => {
  const {
    repondre: _0x530bc2,
    arg: arguments,
    ms: _0xcce573
  } = _0x9633c6;
  if (!arguments || arguments.length === 0x0) {
    return _0x530bc2("Provide a term");
  }
  const _0x322268 = arguments.join(" ");
  try {
    let {
      data: _0x414ae6
    } = await axios.get("http://api.urbandictionary.com/v0/define?term=" + _0x322268);
    var _0x3374e3 = "\n Word: " + _0x322268 + "\n Definition: " + _0x414ae6.list[0x0].definition.replace(/\[/g, '').replace(/\]/g, '') + "\n Example: " + _0x414ae6.list[0x0].example.replace(/\[/g, '').replace(/\]/g, '');
    return _0x530bc2(_0x3374e3);
  } catch {
    return _0x530bc2("No result for " + _0x322268);
  }
});
zokou({
  'nomCom': 'lyrics2',
  'reaction': '✨',
  'categorie': "Search"
}, async (_0x34d58e, _0x347cd3, _0x50f283) => {
  const {
    repondre: _0x3ff9cf,
    arg: arguments,
    ms: _0x37fef9
  } = _0x50f283;
  try {
    if (!arguments || arguments.length === 0x0) {
      return _0x3ff9cf("Please provide me the song name");
    }
    const _0x141cf7 = arguments.join(" ");
    const _0x58d1b4 = await Client.songs.search(_0x141cf7);
    const _0x4cd9c3 = _0x58d1b4[0x0];
    console.log(_0x4cd9c3);
    const _0x940320 = await _0x4cd9c3.lyrics();
    const _0x56e1cc = await _0x4cd9c3.artist.name;
    const _0x370b40 = await _0x4cd9c3.title;
    const _0x38c824 = "*YOBIH BUG BOT LYRICS FINDER*\n\n*TITLE* - " + _0x370b40 + "\n\n*ARTIST* - " + _0x56e1cc + "\n\n" + _0x940320;
    await _0x347cd3.sendMessage(_0x34d58e, {
      'image': {
        'url': "./media/lyrics.jpg"
      },
      'caption': _0x38c824
    }, {
      'quoted': _0x37fef9
    });
  } catch (_0x22811e) {you
    _0x3ff9cf("Error occurred: " + _0x22811e);
    console.log(_0x22811e);
  }
});
