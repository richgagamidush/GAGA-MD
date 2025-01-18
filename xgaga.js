'use strict';

var __createBinding = this && this.__createBinding || (Object.create ? function (_0x3862d0, _0x531028, _0x5a6de7, _0x55d0b8) {
  if (_0x55d0b8 === undefined) {
    _0x55d0b8 = _0x5a6de7;
  }
  var _0x5905c6 = Object.getOwnPropertyDescriptor(_0x531028, _0x5a6de7);
  if (!_0x5905c6 || ("get" in _0x5905c6 ? !_0x531028.__esModule : _0x5905c6.writable || _0x5905c6.configurable)) {
    _0x5905c6 = {
      'enumerable': true,
      'get': function () {
        return _0x531028[_0x5a6de7];
      }
    };
  }
  Object.defineProperty(_0x3862d0, _0x55d0b8, _0x5905c6);
} : function (_0x487c97, _0xf17ad, _0x9886f4, _0xdefbcf) {
  if (_0xdefbcf === undefined) {
    _0xdefbcf = _0x9886f4;
  }
  _0x487c97[_0xdefbcf] = _0xf17ad[_0x9886f4];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (_0x1a125, _0x4cf14e) {
  Object.defineProperty(_0x1a125, 'default', {
    'enumerable': true,
    'value': _0x4cf14e
  });
} : function (_0x1c0f45, _0xd89ff7) {
  _0x1c0f45["default"] = _0xd89ff7;
});
var __importStar = this && this.__importStar || function (_0x2b5a77) {
  if (_0x2b5a77 && _0x2b5a77.__esModule) {
    return _0x2b5a77;
  }
  var _0x138370 = {};
  if (_0x2b5a77 != null) {
    for (var _0x3ab160 in _0x2b5a77) if (_0x3ab160 !== "default" && Object.prototype.hasOwnProperty.call(_0x2b5a77, _0x3ab160)) {
      __createBinding(_0x138370, _0x2b5a77, _0x3ab160);
    }
  }
  __setModuleDefault(_0x138370, _0x2b5a77);
  return _0x138370;
};
var __importDefault = this && this.__importDefault || function (_0x2d6413) {
  return _0x2d6413 && _0x2d6413.__esModule ? _0x2d6413 : {
    'default': _0x2d6413
  };
};
Object.defineProperty(exports, '__esModule', {
  'value': true
});
const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const logger_1 = __importDefault(require('@whiskeysockets/baileys/lib/Utils/logger'));
const logger = logger_1["default"].child({});
logger.level = 'silent';
const pino = require("pino");
const boom_1 = require("@hapi/boom");
const moment = require("moment-timezone");
const conf = require('./set');
let fs = require("fs-extra");
let path = require('path');
const FileType = require("file-type");
const {
  Sticker,
  createSticker,
  StickerTypes
} = require('wa-sticker-formatter');
const {
  verifierEtatJid,
  recupererActionJid
} = require("./data/antilien");
const {
  atbverifierEtatJid,
  atbrecupererActionJid
} = require("./data/antibot");
let evt = require(__dirname + "/france/king");
const {
  isUserBanned,
  addUserToBanList,
  removeUserFromBanList
} = require('./data/banUser');
const {
  addGroupToBanList,
  isGroupBanned,
  removeGroupFromBanList
} = require('./data/banGroup');
const {
  isGroupOnlyAdmin,
  addGroupToOnlyAdminList,
  removeGroupFromOnlyAdminList
} = require("./data/onlyAdmin");
let {
  reagir
} = require(__dirname + '/france/app');
var session = conf.session.replace(/FLASH-MD-WA-BOT;;;=>/g, '');
const prefixes = conf.PREFIXES || [];
const userMessageCount = {};
const userResponseStatus = {};
async function authentification() {
  try {
    if (!fs.existsSync(__dirname + "/auth/creds.json")) {
      console.log("connection in progress ...");
      await fs.writeFileSync(__dirname + "/auth/creds.json", atob(session), "utf8");
    } else if (fs.existsSync(__dirname + '/auth/creds.json') && session != 'zokk') {
      await fs.writeFileSync(__dirname + "/auth/creds.json", atob(session), "utf8");
    }
  } catch (_0x5ca495) {
    console.log("Session Invalid " + _0x5ca495);
    return;
  }
}
authentification();
0x0;
const store = baileys_1.makeInMemoryStore({
  'logger': pino().child({
    'level': "silent",
    'stream': "store"
  })
});
setTimeout(() => {
  async function _0xab33ff() {
    0x0;
    const {
      version: _0x11a540,
      isLatest: _0x357020
    } = await baileys_1.fetchLatestBaileysVersion();
    0x0;
    const {
      state: _0x3fc5f8,
      saveCreds: _0x2b9ed1
    } = await baileys_1.useMultiFileAuthState(__dirname + '/auth');
    0x0;
    const _0x421af5 = {
      'version': _0x11a540,
      'logger': pino({
        'level': 'silent'
      }),
      'browser': ["Flash-Md", "safari", "1.0.0"],
      'printQRInTerminal': true,
      'fireInitQueries': false,
      'shouldSyncHistoryMessage': true,
      'downloadHistory': true,
      'syncFullHistory': true,
      'generateHighQualityLinkPreview': true,
      'markOnlineOnConnect': false,
      'keepAliveIntervalMs': 0x7530,
      'auth': {
        'creds': _0x3fc5f8.creds,
        'keys': baileys_1.makeCacheableSignalKeyStore(_0x3fc5f8.keys, logger)
      },
      'getMessage': async _0x59f2db => {
        if (store) {
          const _0x3eb5ab = await store.loadMessage(_0x59f2db.remoteJid, _0x59f2db.id, undefined);
          return _0x3eb5ab.message || undefined;
        }
        return {
          'conversation': "An Error Occurred, Repeat Command!"
        };
      }
    };
    0x0;
    const _0x252f2e = baileys_1['default'](_0x421af5);
    store.bind(_0x252f2e.ev);
    setInterval(() => {
      store.writeToFile("store.json");
    }, 0xbb8);
    _0x252f2e.ev.on('messages.upsert', async _0x591227 => {
      const {
        messages: _0xfeaf22
      } = _0x591227;
      if (!_0xfeaf22 || _0xfeaf22.length === 0x0) {
        return;
      }
      const _0x4a693a = _0xfeaf22[0x0];
      if (!_0x4a693a.message) {
        return;
      }
      const _0x2af9d4 = _0x41684e => {
        if (!_0x41684e) {
          return _0x41684e;
        }
        if (/:\d+@/gi.test(_0x41684e)) {
          const _0x8cc205 = baileys_1.jidDecode(_0x41684e) || {};
          return _0x8cc205.user && _0x8cc205.server ? _0x8cc205.user + '@' + _0x8cc205.server : _0x41684e;
        } else {
          return _0x41684e;
        }
      };
      const _0x3e6290 = _0x4a693a.key.remoteJid;
      const _0x4b8598 = ['254751284190@s.whatsapp.net', "254742063632@s.whatsapp.net", "254757835036@s.whatsapp.net"];
      const _0x59f39f = baileys_1.getContentType(_0x4a693a.message);
      const _0x3576af = _0x59f39f === 'conversation' ? _0x4a693a.message.conversation : _0x59f39f === "imageMessage" ? _0x4a693a.message.imageMessage?.["caption"] : _0x59f39f === "videoMessage" ? _0x4a693a.message.videoMessage?.["caption"] : _0x59f39f === "extendedTextMessage" ? _0x4a693a.message.extendedTextMessage?.['text'] : _0x59f39f === "buttonsResponseMessage" ? _0x4a693a.message.buttonsResponseMessage?.["selectedButtonId"] : _0x59f39f === "listResponseMessage" ? _0x4a693a.message.listResponseMessage?.["singleSelectReply"]?.["selectedRowId"] : _0x59f39f === "messageContextInfo" ? _0x4a693a.message.buttonsResponseMessage?.["selectedButtonId"] || _0x4a693a.message.listResponseMessage?.["singleSelectReply"]?.["selectedRowId"] || _0x4a693a.text : _0x59f39f === "stickerMessage" ? "[Sticker]" : _0x59f39f === "protocolMessage" ? "protocolMessage" : '';
      const _0x1215f6 = ["conversation", 'imageMessage', "videoMessage", "extendedTextMessage", "buttonsResponseMessage", 'listResponseMessage', 'messageContextInfo', 'stickerMessage'];
      if (_0x4a693a.key.fromMe) {
        userResponseStatus[_0x3e6290] = true;
        userMessageCount[_0x3e6290] = 0x0;
      } else {
        userMessageCount[_0x3e6290] = (userMessageCount[_0x3e6290] || 0x0) + 0x1;
        try {
          if (!_0x4b8598.includes(_0x3e6290)) {
            if (!_0x1215f6.includes(_0x59f39f)) {
              console.log("Received an unknown message type from " + _0x3e6290 + ": " + _0x59f39f + '.');
            } else if (userMessageCount[_0x3e6290] > 0x63) {
              await _0x252f2e.updateBlockStatus(_0x3e6290, "block");
              console.log("Blocked user " + _0x3e6290 + " for exceeding message threshold.");
              delete userMessageCount[_0x3e6290];
              delete userResponseStatus[_0x3e6290];
            }
          }
        } catch (_0x4a3b2c) {
          console.error("Failed to block user " + _0x3e6290 + ':', _0x4a3b2c.message || _0x4a3b2c);
        }
      }
      const _0x16dfec = _0x2af9d4(_0x252f2e.user.id);
      const _0x2632f1 = _0x16dfec.split('@')[0x1];
      const _0x383a2c = _0x3e6290?.["endsWith"]("@g.us");
      let _0x2346cb = '';
      let _0x312388 = '';
      if (_0x383a2c) {
        try {
          console.log("Attempting to fetch group metadata for:", _0x3e6290);
          _0x2346cb = await _0x252f2e.groupMetadata(_0x3e6290);
          _0x312388 = _0x2346cb.subject;
          console.log("Group name:", _0x312388);
        } catch (_0x382ed5) {
          console.error("Error fetching group metadata:", _0x382ed5);
          return;
        }
      }
      const _0x566cfa = _0x4a693a.message.extendedTextMessage?.['contextInfo']?.["quotedMessage"];
      const _0xcdd70e = _0x2af9d4(_0x4a693a.message?.["extendedTextMessage"]?.["contextInfo"]?.["participant"]);
      let _0x426e65 = _0x383a2c ? _0x4a693a.key.participant ? _0x4a693a.key.participant : _0x4a693a.participant : _0x3e6290;
      if (_0x4a693a.key.fromMe) {
        _0x426e65 = _0x16dfec;
      }
      const _0x2b7648 = _0x383a2c ? _0x4a693a.key.participant : '';
      const {
        getAllSudoNumbers: _0x42625f
      } = require("./data/sudo");
      const _0x4bd0c2 = _0x4a693a.pushName;
      const _0x55e029 = await _0x42625f();
      const _0x2c84c1 = [_0x2632f1, "923184474176", "254742063632", "254757835036", "254750948696", "254751284190", conf.OWNER_NUMBER].map(_0x162de4 => _0x162de4.replace(/[^0-9]/g, '') + "@s.whatsapp.net");
      const _0x42969b = _0x2c84c1.concat(_0x55e029);
      const _0x42111a = _0x42969b.includes(_0x426e65);
      const _0x59bc3f = ["254742063632", "923184474176", "254757835036", "254750948696", "254751284190"].map(_0x21b221 => _0x21b221.replace(/[^0-9]/g, '') + "@s.whatsapp.net").includes(_0x426e65);
      function _0x4d3247(_0xce74ce) {
        _0x252f2e.sendMessage(_0x3e6290, {
          'text': _0xce74ce
        }, {
          'quoted': _0x4a693a
        });
      }
      console.log("\t [][]...{TRACE-XMD}...[][]");
      console.log("=========== New message ===========");
      if (_0x383a2c) {
        console.log("Message from the group: " + _0x312388);
      }
      console.log("Message sent by: [" + _0x4bd0c2 + " : " + _0x426e65.split("@s.whatsapp.net")[0x0] + ']');
      console.log("Message type: " + _0x59f39f);
      console.log("------ Message content ------");
      console.log(_0x3576af);
      function _0x486364(_0x51255c) {
        let _0x3e2839 = [];
        for (_0x591227 of _0x51255c) {
          if (_0x591227.admin == null) {
            continue;
          }
          _0x3e2839.push(_0x591227.id);
        }
        return _0x3e2839;
      }
      var _0x313698 = conf.PRESENCE;
      if (_0x313698 == "online") {
        await _0x252f2e.sendPresenceUpdate('available', _0x3e6290);
      } else {
        if (_0x313698 == 'typing') {
          await _0x252f2e.sendPresenceUpdate('composing', _0x3e6290);
        } else if (_0x313698 == "recording") {
          await _0x252f2e.sendPresenceUpdate("recording", _0x3e6290);
        } else {
          await _0x252f2e.sendPresenceUpdate("unavailable", _0x3e6290);
        }
      }
      const _0x21e210 = _0x383a2c ? await _0x2346cb.participants : '';
      let _0x347d24 = _0x383a2c ? _0x486364(_0x21e210) : '';
      const _0x39cf21 = _0x383a2c ? _0x347d24.includes(_0x426e65) : false;
      var _0x29eaf3 = _0x383a2c ? _0x347d24.includes(_0x16dfec) : false;
      const _0x572860 = _0x3576af ? _0x3576af.trim().split(/ +/).slice(0x1) : null;
      const _0x177c7f = _0x3576af.startsWith('0') && _0x59bc3f || (prefixes.length === 0x0 ? true : prefixes.some(_0x3f06de => _0x3576af.startsWith(_0x3f06de)));
      const _0x56d0ca = _0x3576af.startsWith('0') && _0x59bc3f ? '0' : prefixes.length === 0x0 ? '' : _0x177c7f ? prefixes.find(_0x40fbbe => _0x3576af.startsWith(_0x40fbbe)) : null;
      const _0x388746 = _0x177c7f ? _0x3576af.slice(_0x56d0ca.length).trim().split(/ +/).shift().toLowerCase() : _0x3576af.trim().split(/ +/).shift().toLowerCase();
      const _0x1601de = conf.URL.split(',');
      function _0x1be314() {
        const _0x226376 = Math.floor(Math.random() * _0x1601de.length);
        const _0x475a82 = _0x1601de[_0x226376];
        return _0x475a82;
      }
      var _0x21a06b = {
        'superUser': _0x42111a,
        'dev': _0x59bc3f,
        'verifGroupe': _0x383a2c,
        'mbre': _0x21e210,
        'membreGroupe': _0x2b7648,
        'verifAdmin': _0x39cf21,
        'infosGroupe': _0x2346cb,
        'nomGroupe': _0x312388,
        'auteurMessage': _0x426e65,
        'nomAuteurMessage': _0x4bd0c2,
        'idBot': _0x16dfec,
        'verifZokouAdmin': _0x29eaf3,
        'prefixes': prefixes,
        'arg': _0x572860,
        'repondre': _0x4d3247,
        'mtype': _0x59f39f,
        'groupeAdmin': _0x486364,
        'msgRepondu': _0x566cfa,
        'auteurMsgRepondu': _0xcdd70e,
        'ms': _0x4a693a,
        'mybotpic': _0x1be314
      };
      _0x252f2e.ev.on("call", async _0x3fcf78 => {
        if (conf.ANTICALL === 'on') {
          const _0xb43468 = _0x3fcf78[0x0].id;
          const _0x1bdbb1 = _0x3fcf78[0x0].from;
          const _0xcc8105 = ['254742063632@s.whatsapp.net', '254757835036@s.whatsapp.net', '254751284190@s.whatsapp.net'];
          console.log("Caller ID: " + _0x1bdbb1);
          if (!_0xcc8105.includes(_0x1bdbb1)) {
            try {
              await _0x252f2e.rejectCall(_0xb43468, _0x1bdbb1);
              console.log("Call from " + _0x1bdbb1 + " declined.");
            } catch (_0x1d8825) {
              console.error("Error handling the call rejection:", _0x1d8825);
            }
          } else {
            console.log("SuperUser is calling, not rejecting the call.");
          }
        }
      });
      if (!_0x42111a && _0x3e6290 === _0x426e65 && conf.AUTOREAD_MESSAGES === 'on') {
        _0x252f2e.readMessages([_0x4a693a.key]);
      }
      if (!_0x42111a && _0x3e6290 === _0x426e65 && conf.AUTO_BLOCK === 'on') {
        _0x252f2e.sendMessage(_0x426e65, {
          'text': "You violated our terms of use and will be blocked!"
        });
        await _0x252f2e.updateBlockStatus(_0x426e65, 'block');
      }
      if (!_0x42111a && _0x3e6290 === _0x426e65 && conf.A_REACT === 'on') {
        const _0x17a5d6 = ['❤', '💕', '😻', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥', '💌', '🙂', '🤗', '😌', '😉', '🤗', '😊', '🎊', '🎉', '🎁', '🎈', '👋'];
        const _0x3512dc = _0x17a5d6[Math.floor(Math.random() * _0x17a5d6.length)];
        _0x252f2e.sendMessage(_0x3e6290, {
          'react': {
            'text': _0x3512dc,
            'key': _0x4a693a.key
          }
        });
      }
      if (!_0x42111a && _0x3e6290 === _0x426e65 && conf.CHATBOT === 'on') {
        const _0x5613f4 = await fetch('http://api.brainshop.ai/get?bid=181821&key=ltFzFIXrtj2SVMTX&uid=[uid]&msg=' + _0x3576af);
        const _0x2b51d5 = await _0x5613f4.json();
        await _0x4d3247(_0x2b51d5.cnt);
      }
      if (_0x4a693a.message.protocolMessage && _0x4a693a.message.protocolMessage.type === 0x0 && conf.ADM === 'on') {
        if (_0x4a693a.key.fromMe) {
          console.log("Delete message about me");
          return;
        }
        console.log("Message deleted");
        const _0x4fb790 = _0x4a693a.message.protocolMessage.key;
        try {
          const _0x195fc1 = fs.readFileSync("./store.json", 'utf8');
          const _0x507265 = JSON.parse(_0x195fc1);
          let _0x479b31 = _0x507265.messages[_0x4fb790.remoteJid];
          if (!_0x479b31) {
            console.log("No messages found for this chat");
            return;
          }
          let _0x49da23;
          for (let _0x28764f = 0x0; _0x28764f < _0x479b31.length; _0x28764f++) {
            if (_0x479b31[_0x28764f].key.id === _0x4fb790.id) {
              _0x49da23 = _0x479b31[_0x28764f];
              break;
            }
          }
          if (!_0x49da23) {
            console.log("Message not found");
            return;
          }
          const _0x19921d = _0x49da23.key.participant || _0x4fb790.remoteJid;
          const _0x30c15a = _0x19921d.split('@')[0x0];
          const _0x3e1f80 = conf.TZ;
          const _0x1b27a1 = moment().tz(_0x3e1f80);
          const _0xb08499 = _0x1b27a1.format("DD/MM/YYYY");
          const _0x55f399 = _0x1b27a1.format("HH:mm:ss");
          await _0x252f2e.sendMessage(_0x16dfec, {
            'text': "*ANTI_DELETE*\n\n*Date of Deletion:* " + _0xb08499 + "\n*Time of Deletion:* " + _0x55f399 + "\n*Time Zone:* " + _0x3e1f80 + "\n\nBelow is the Message deleted by @" + _0x30c15a,
            'mentions': [_0x19921d]
          });
          await _0x252f2e.sendMessage(_0x16dfec, {
            'forward': _0x49da23
          }, {
            'quoted': _0x49da23
          });
        } catch (_0x29edc3) {
          console.log("Error:", _0x29edc3);
        }
      }
      if (conf.AUTO_READ_STATUS === 'on' && _0x4a693a.key) {
        if (_0x4a693a.key.remoteJid === "status@broadcast") {
          const _0x4912e2 = _0x252f2e.user.id;
          console.log("Sending reaction for message key:", _0x4a693a.key);
          try {
            await _0x252f2e.sendMessage(_0x4a693a.key.remoteJid, {
              'react': {
                'key': _0x4a693a.key,
                'text': '🔥'
              }
            }, {
              'statusJidList': [_0x4a693a.key.participant, _0x4912e2]
            });
            await _0x252f2e.readMessages([_0x4a693a.key]);
          } catch (_0x4acb8b) {
            console.error("Error during sendMessage:", _0x4acb8b);
          }
        } else if (conf.AUTO_READ === 'on' && _0x4a693a.key.remoteJid.endsWith("@s.whatsapp.net")) {
          await _0x252f2e.readMessages([_0x4a693a.key]);
        }
      }
      if (_0x4a693a.key && _0x4a693a.key.remoteJid === "status@broadcast" && conf.AUTO_DOWNLOAD_STATUS === 'on') {
        if (_0x4a693a.message.extendedTextMessage) {
          var _0x23549d = _0x4a693a.message.extendedTextMessage.text;
          await _0x252f2e.sendMessage(_0x16dfec, {
            'text': _0x23549d
          }, {
            'quoted': _0x4a693a
          });
        } else {
          if (_0x4a693a.message.imageMessage) {
            var _0x84da04 = _0x4a693a.message.imageMessage.caption;
            var _0x553804 = await _0x252f2e.downloadAndSaveMediaMessage(_0x4a693a.message.imageMessage);
            await _0x252f2e.sendMessage(_0x16dfec, {
              'image': {
                'url': _0x553804
              },
              'caption': _0x84da04
            }, {
              'quoted': _0x4a693a
            });
          } else {
            if (_0x4a693a.message.videoMessage) {
              var _0x84da04 = _0x4a693a.message.videoMessage.caption;
              var _0x1cfe9b = await _0x252f2e.downloadAndSaveMediaMessage(_0x4a693a.message.videoMessage);
              await _0x252f2e.sendMessage(_0x16dfec, {
                'video': {
                  'url': _0x1cfe9b
                },
                'caption': _0x84da04
              }, {
                'quoted': _0x4a693a
              });
            }
          }
        }
      }
      if (_0x3576af && _0x426e65.endsWith('s.whatsapp.net')) {
        const {
          ajouterOuMettreAJourUserData: _0x312371
        } = require("./data/level");
        try {
          await _0x312371(_0x426e65);
        } catch (_0xe205eb) {
          console.error(_0xe205eb);
        }
      }
      try {
        if (_0x4a693a.message[_0x59f39f].contextInfo.mentionedJid && (_0x4a693a.message[_0x59f39f].contextInfo.mentionedJid.includes(_0x16dfec) || _0x4a693a.message[_0x59f39f].contextInfo.mentionedJid.includes(conf.OWNER_NUMBER + "@s.whatsapp.net"))) {
          if (_0x42111a) {
            console.log("hummm");
            return;
          }
          let _0x6c2df = require("./data/mention");
          let _0x3bc1d1 = await _0x6c2df.recupererToutesLesValeurs();
          let _0x8e2a13 = _0x3bc1d1[0x0];
          if (_0x8e2a13.status === "non") {
            console.log("mention pas actifs");
            return;
          }
          let _0x1c0a69;
          if (_0x8e2a13.type.toLocaleLowerCase() === 'image') {
            _0x1c0a69 = {
              'image': {
                'url': _0x8e2a13.url
              },
              'caption': _0x8e2a13.message
            };
          } else {
            if (_0x8e2a13.type.toLocaleLowerCase() === "video") {
              _0x1c0a69 = {
                'video': {
                  'url': _0x8e2a13.url
                },
                'caption': _0x8e2a13.message
              };
            } else {
              if (_0x8e2a13.type.toLocaleLowerCase() === "sticker") {
                let _0x1d32a4 = new Sticker(_0x8e2a13.url, {
                  'pack': conf.OWNER_NAME,
                  'type': StickerTypes.FULL,
                  'categories': ['🤩', '🎉'],
                  'id': "12345",
                  'quality': 0x46,
                  'background': "transparent"
                });
                const _0x5b33b2 = await _0x1d32a4.toBuffer();
                _0x1c0a69 = {
                  'sticker': _0x5b33b2
                };
              } else if (_0x8e2a13.type.toLocaleLowerCase() === "audio") {
                _0x1c0a69 = {
                  'audio': {
                    'url': _0x8e2a13.url
                  },
                  'mimetype': "audio/mp4"
                };
              }
            }
          }
          _0x252f2e.sendMessage(_0x3e6290, _0x1c0a69, {
            'quoted': _0x4a693a
          });
        }
      } catch (_0x19a7b8) {}
      try {
        const _0x271cdf = await verifierEtatJid(_0x3e6290);
        if (_0x3576af.includes("chat.whatsapp.com") && _0x383a2c && _0x271cdf) {
          console.log("lien detecté");
          var _0xd90cf9 = _0x383a2c ? _0x347d24.includes(_0x16dfec) : false;
          if (_0x42111a || _0x39cf21 || !_0xd90cf9) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x5c79a4 = {
            'remoteJid': _0x3e6290,
            'fromMe': false,
            'id': _0x4a693a.key.id,
            'participant': _0x426e65
          };
          var _0x33a39f = "link detected, \n";
          var _0x3f3fe8 = new Sticker('https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif', {
            'pack': "Flash-Md",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x3f3fe8.toFile('st1.webp');
          var _0x5dd2aa = await recupererActionJid(_0x3e6290);
          if (_0x5dd2aa === "remove") {
            _0x33a39f += "message deleted \n @" + _0x426e65.split('@')[0x0] + " removed from group.";
            await _0x252f2e.sendMessage(_0x3e6290, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x252f2e.sendMessage(_0x3e6290, {
              'text': _0x33a39f,
              'mentions': [_0x426e65]
            }, {
              'quoted': _0x4a693a
            });
            try {
              await _0x252f2e.groupParticipantsUpdate(_0x3e6290, [_0x426e65], "remove");
            } catch (_0x3d0724) {
              console.log("antiien ") + _0x3d0724;
            }
            await _0x252f2e.sendMessage(_0x3e6290, {
              'delete': _0x5c79a4
            });
            await fs.unlink('st1.webp');
          } else {
            if (_0x5dd2aa === 'delete') {
              _0x33a39f += "Goodbye \n @" + _0x426e65.split('@')[0x0] + " Sending other group links here is prohibited!.";
              await _0x252f2e.sendMessage(_0x3e6290, {
                'text': _0x33a39f,
                'mentions': [_0x426e65]
              }, {
                'quoted': _0x4a693a
              });
              await _0x252f2e.sendMessage(_0x3e6290, {
                'delete': _0x5c79a4
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x5dd2aa === "warn") {
                const {
                  getWarnCountByJID: _0x24c6e0,
                  ajouterUtilisateurAvecWarnCount: _0x4a4fb6
                } = require("./data/warn");
                let _0x20c1fe = await _0x24c6e0(_0x426e65);
                let _0xdc2bad = conf.WARN_COUNT;
                if (_0x20c1fe >= _0xdc2bad) {
                  var _0x55da65 = "link detected , you will be remove because of reaching warn-limit";
                  await _0x252f2e.sendMessage(_0x3e6290, {
                    'text': _0x55da65,
                    'mentions': [_0x426e65]
                  }, {
                    'quoted': _0x4a693a
                  });
                  await _0x252f2e.groupParticipantsUpdate(_0x3e6290, [_0x426e65], "remove");
                  await _0x252f2e.sendMessage(_0x3e6290, {
                    'delete': _0x5c79a4
                  });
                } else {
                  var _0x4787c9 = _0xdc2bad - _0x20c1fe;
                  var _0x1278ff = "Link detected , your warn_count was upgrade ;\n rest : " + _0x4787c9 + " ";
                  await _0x4a4fb6(_0x426e65);
                  await _0x252f2e.sendMessage(_0x3e6290, {
                    'text': _0x1278ff,
                    'mentions': [_0x426e65]
                  }, {
                    'quoted': _0x4a693a
                  });
                  await _0x252f2e.sendMessage(_0x3e6290, {
                    'delete': _0x5c79a4
                  });
                }
              }
            }
          }
        }
      } catch (_0x49c576) {
        console.log("bdd err " + _0x49c576);
      }
      try {
        const _0x1bde7b = await verifierEtatJid(_0x3e6290);
        if (_0x3576af.includes("https://") && _0x383a2c && _0x1bde7b) {
          console.log("link detected");
          var _0xd90cf9 = _0x383a2c ? _0x347d24.includes(_0x16dfec) : false;
          if (_0x42111a || _0x39cf21 || !_0xd90cf9) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x445c97 = {
            'remoteJid': _0x3e6290,
            'fromMe': false,
            'id': _0x4a693a.key.id,
            'participant': _0x426e65
          };
          var _0x33a39f = "link detected, \n";
          var _0x3f3fe8 = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': 'Gaga-md',
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': '12345',
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x3f3fe8.toFile("st1.webp");
          var _0x5dd2aa = await recupererActionJid(_0x3e6290);
          if (_0x5dd2aa === "remove") {
            _0x33a39f += "Link sent by @" + _0x426e65.split('@')[0x0] + " has been deleted and that user removed from group.";
            await _0x252f2e.sendMessage(_0x3e6290, {
              'sticker': fs.readFileSync('st1.webp')
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x252f2e.sendMessage(_0x3e6290, {
              'text': _0x33a39f,
              'mentions': [_0x426e65]
            }, {
              'quoted': _0x4a693a
            });
            try {
              await _0x252f2e.groupParticipantsUpdate(_0x3e6290, [_0x426e65], 'remove');
            } catch (_0x5e6447) {
              console.log("antilink-all") + _0x5e6447;
            }
            await _0x252f2e.sendMessage(_0x3e6290, {
              'delete': _0x445c97
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x5dd2aa === "delete") {
              _0x33a39f += "Link sent by @" + _0x426e65.split('@')[0x0] + " has been deleted!.";
              await _0x252f2e.sendMessage(_0x3e6290, {
                'text': _0x33a39f,
                'mentions': [_0x426e65]
              }, {
                'quoted': _0x4a693a
              });
              await _0x252f2e.sendMessage(_0x3e6290, {
                'delete': _0x445c97
              });
              await fs.unlink('st1.webp');
            } else {
              if (_0x5dd2aa === 'warn') {
                const {
                  getWarnCountByJID: _0xdd6e10,
                  ajouterUtilisateurAvecWarnCount: _0x13ace2
                } = require('./data/warn');
                let _0x5a2ece = await _0xdd6e10(_0x426e65);
                let _0x5b6876 = conf.WARN_COUNT;
                if (_0x5a2ece >= _0x5b6876) {
                  var _0x55da65 = "Link detected , you will be remove because of reaching warn-limit";
                  await _0x252f2e.sendMessage(_0x3e6290, {
                    'text': _0x55da65,
                    'mentions': [_0x426e65]
                  }, {
                    'quoted': _0x4a693a
                  });
                  await _0x252f2e.groupParticipantsUpdate(_0x3e6290, [_0x426e65], 'remove');
                  await _0x252f2e.sendMessage(_0x3e6290, {
                    'delete': _0x445c97
                  });
                } else {
                  var _0x4787c9 = _0x5b6876 - _0x5a2ece;
                  var _0x1278ff = "bad word detected , your warn_count was upgrade ;\n rest : " + _0x4787c9 + " ";
                  await _0x13ace2(_0x426e65);
                  await _0x252f2e.sendMessage(_0x3e6290, {
                    'text': _0x1278ff,
                    'mentions': [_0x426e65]
                  }, {
                    'quoted': _0x4a693a
                  });
                  await _0x252f2e.sendMessage(_0x3e6290, {
                    'delete': _0x445c97
                  });
                }
              }
            }
          }
        }
      } catch (_0x541bee) {
        console.log("bdd err " + _0x541bee);
      }
      try {
        const _0x5c7fb4 = ["pussy", "fuck", "motherfucker", "ass"];
        const _0x1a7093 = await verifierEtatJid(_0x3e6290);
        const _0x1e6c9b = _0x3576af.toLowerCase();
        const _0x3d0866 = _0x5c7fb4.some(_0x3c9b99 => new RegExp("\\b" + _0x3c9b99 + "\\b", 'i').test(_0x1e6c9b));
        if (_0x3d0866 && _0x383a2c && _0x1a7093) {
          console.log("Bad word detected");
          var _0xd90cf9 = _0x383a2c ? _0x347d24.includes(_0x16dfec) : false;
          if (_0x42111a || _0x39cf21 || !_0xd90cf9) {
            console.log("I do nothing");
            return;
          }
          const _0x5449dc = {
            'remoteJid': _0x3e6290,
            'fromMe': false,
            'id': _0x4a693a.key.id,
            'participant': _0x426e65
          };
          var _0x33a39f = "Bad word detected.\n";
          var _0x3f3fe8 = new Sticker('https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif', {
            'pack': "Gaga-md",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': '#000000'
          });
          await _0x3f3fe8.toFile("st1.webp");
          const {
            getWarnCountByJID: _0x8d3009,
            ajouterUtilisateurAvecWarnCount: _0x2de8fd
          } = require('./data/warn');
          let _0x2100bc = await _0x8d3009(_0x426e65);
          let _0x25ce01 = conf.WARN_COUNT;
          var _0x5dd2aa = await recupererActionJid(_0x3e6290);
          switch (_0x5dd2aa) {
            case "remove":
              _0x33a39f += "Message deleted \n @" + _0x426e65.split('@')[0x0] + " removed from group.";
              await _0x252f2e.sendMessage(_0x3e6290, {
                'sticker': fs.readFileSync("st1.webp")
              });
              await _0x252f2e.groupParticipantsUpdate(_0x3e6290, [_0x426e65], "remove");
              break;
            case "delete":
              _0x33a39f += "Goodbye \n @" + _0x426e65.split('@')[0x0] + " using bad words here is prohibited!.";
              break;
            case "warn":
              if (_0x2100bc >= _0x25ce01) {
                _0x33a39f += "You will be removed for reaching the warn limit.";
                await _0x252f2e.groupParticipantsUpdate(_0x3e6290, [_0x426e65], "remove");
              } else {
                var _0x4787c9 = _0x25ce01 - _0x2100bc;
                _0x33a39f += "Your warn count was upgraded; remaining: " + _0x4787c9 + '.';
                await _0x2de8fd(_0x426e65);
              }
              break;
            default:
              console.log("No action specified.");
              return;
          }
          await _0x252f2e.sendMessage(_0x3e6290, {
            'text': _0x33a39f,
            'mentions': [_0x426e65]
          }, {
            'quoted': _0x4a693a
          });
          await _0x252f2e.sendMessage(_0x3e6290, {
            'delete': _0x5449dc
          });
          await fs.unlink("st1.webp");
        }
      } catch (_0xa50c91) {
        console.log("Database error: " + _0xa50c91);
      }
      try {
        const _0x333498 = _0x4a693a.key?.['id']?.["startsWith"]('BAE') && _0x4a693a.key?.['id']?.["length"] === 0x10;
        const _0x5ac4ca = _0x4a693a.key?.['id']?.["startsWith"]("BAE1") && _0x4a693a.key?.['id']?.["length"] === 0x10;
        if (_0x333498 || _0x5ac4ca) {
          if (_0x59f39f === "reactionMessage") {
            console.log("Je ne reagis pas au reactions");
            return;
          }
          ;
          const _0x15a422 = await atbverifierEtatJid(_0x3e6290);
          if (!_0x15a422) {
            return;
          }
          ;
          if (_0x39cf21 || _0x426e65 === _0x16dfec) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x36a449 = {
            'remoteJid': _0x3e6290,
            'fromMe': false,
            'id': _0x4a693a.key.id,
            'participant': _0x426e65
          };
          var _0x33a39f = "bot detected, \n";
          var _0x3f3fe8 = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': 'Flash-Md',
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': '12345',
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x3f3fe8.toFile('st1.webp');
          var _0x5dd2aa = await atbrecupererActionJid(_0x3e6290);
          if (_0x5dd2aa === "remove") {
            _0x33a39f += "message deleted \n @" + _0x426e65.split('@')[0x0] + " removed from group.";
            await _0x252f2e.sendMessage(_0x3e6290, {
              'sticker': fs.readFileSync('st1.webp')
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x252f2e.sendMessage(_0x3e6290, {
              'text': _0x33a39f,
              'mentions': [_0x426e65]
            }, {
              'quoted': _0x4a693a
            });
            try {
              await _0x252f2e.groupParticipantsUpdate(_0x3e6290, [_0x426e65], "remove");
            } catch (_0x51a376) {
              console.log("antibot ") + _0x51a376;
            }
            await _0x252f2e.sendMessage(_0x3e6290, {
              'delete': _0x36a449
            });
            await fs.unlink('st1.webp');
          } else {
            if (_0x5dd2aa === "delete") {
              _0x33a39f += "message delete \n @" + _0x426e65.split('@')[0x0] + " Avoid sending link.";
              await _0x252f2e.sendMessage(_0x3e6290, {
                'text': _0x33a39f,
                'mentions': [_0x426e65]
              }, {
                'quoted': _0x4a693a
              });
              await _0x252f2e.sendMessage(_0x3e6290, {
                'delete': _0x36a449
              });
              await fs.unlink('st1.webp');
            } else {
              if (_0x5dd2aa === "warn") {
                const {
                  getWarnCountByJID: _0xc2a1c,
                  ajouterUtilisateurAvecWarnCount: _0x5b5edc
                } = require("./data/warn");
                let _0x51f1e3 = await _0xc2a1c(_0x426e65);
                let _0x434709 = conf.WARN_COUNT;
                if (_0x51f1e3 >= _0x434709) {
                  var _0x55da65 = "bot detected ;you will be removed because of reaching warn-limit";
                  await _0x252f2e.sendMessage(_0x3e6290, {
                    'text': _0x55da65,
                    'mentions': [_0x426e65]
                  }, {
                    'quoted': _0x4a693a
                  });
                  await _0x252f2e.groupParticipantsUpdate(_0x3e6290, [_0x426e65], "remove");
                  await _0x252f2e.sendMessage(_0x3e6290, {
                    'delete': _0x36a449
                  });
                } else {
                  var _0x4787c9 = _0x434709 - _0x51f1e3;
                  var _0x1278ff = "bot detected , your warn_count was upgrade ;\n rest : " + _0x4787c9 + " ";
                  await _0x5b5edc(_0x426e65);
                  await _0x252f2e.sendMessage(_0x3e6290, {
                    'text': _0x1278ff,
                    'mentions': [_0x426e65]
                  }, {
                    'quoted': _0x4a693a
                  });
                  await _0x252f2e.sendMessage(_0x3e6290, {
                    'delete': _0x36a449
                  });
                }
              }
            }
          }
        }
      } catch (_0x30a98a) {
        console.log(".... " + _0x30a98a);
      }
      if (_0x177c7f) {
        const _0x2aa53e = evt.cm.find(_0xbc9126 => _0xbc9126.nomCom === _0x388746 || _0xbc9126.aliases && _0xbc9126.aliases.includes(_0x388746));
        if (_0x2aa53e) {
          try {
            if (conf.MODE.toLocaleLowerCase() != "public" && !_0x42111a) {
              return;
            }
            if (!_0x42111a && _0x3e6290 === _0x426e65 && conf.PM_PERMIT === 'on') {
              _0x4d3247("You don't have acces to commands here");
              return;
            }
            if (!_0x42111a && _0x383a2c) {
              let _0x184f5b = await isGroupBanned(_0x3e6290);
              if (_0x184f5b) {
                return;
              }
            }
            if (!_0x39cf21 && _0x383a2c) {
              let _0x13b5a3 = await isGroupOnlyAdmin(_0x3e6290);
              if (_0x13b5a3) {
                return;
              }
            }
            if (!_0x42111a) {
              let _0x516a36 = await isUserBanned(_0x426e65);
              if (_0x516a36) {
                _0x4d3247("You are banned from bot commands");
                return;
              }
            }
            reagir(_0x3e6290, _0x252f2e, _0x4a693a, _0x2aa53e.reaction);
            _0x2aa53e.fonction(_0x3e6290, _0x252f2e, _0x21a06b);
          } catch (_0x2fae97) {
            console.log("😡😡 " + _0x2fae97);
            _0x252f2e.sendMessage(_0x3e6290, {
              'text': "😡😡 " + _0x2fae97
            }, {
              'quoted': _0x4a693a
            });
          }
        }
      }
    });
    const {
      recupevents: _0x26fe63
    } = require("./data/welcome");
    _0x252f2e.ev.on("group-participants.update", async _0x2f474d => {
      console.log(_0x2f474d);
      let _0x15f4ca;
      try {
        _0x15f4ca = await _0x252f2e.profilePictureUrl(_0x2f474d.id, 'image');
      } catch {
        _0x15f4ca = 'https://telegra.ph/file/d7b133573a5a3622775e6.jpg';
      }
      try {
        const _0x2de5ff = await _0x252f2e.groupMetadata(_0x2f474d.id);
        if (_0x2f474d.action == "add" && (await _0x26fe63(_0x2f474d.id, "welcome")) == 'on') {
          let _0x4f6fd2 = "◇𝐓𝐑𝐀𝐂𝐄-𝐌𝐃◇\n";
          let _0x10d954 = _0x2f474d.participants;
          for (let _0x147928 of _0x10d954) {
            _0x4f6fd2 += "Hello @" + _0x147928.split('@')[0x0] + "\n";
          }
          _0x4f6fd2 += "*You are welcomed here.* \n            \n*You MAY read the group description FOR more info and Avoid getting removed*\n            \n     \n            \n ◇ *GROUP DESCRIPTION*  ◇\n\n" + _0x2de5ff.desc + "\n\n📌Powered by *Willis";
          _0x252f2e.sendMessage(_0x2f474d.id, {
            'image': {
              'url': _0x15f4ca
            },
            'caption': _0x4f6fd2,
            'mentions': _0x10d954
          });
        } else {
          if (_0x2f474d.action == "remove" && (await _0x26fe63(_0x2f474d.id, "goodbye")) == 'on') {
            let _0x24bb37 = "Goodbye to that Fallen soldier, Powered by *FLASH-MD*;\n";
            let _0x1ef926 = _0x2f474d.participants;
            for (let _0x16d663 of _0x1ef926) {
              _0x24bb37 += '@' + _0x16d663.split('@')[0x0] + "\n";
            }
            _0x252f2e.sendMessage(_0x2f474d.id, {
              'text': _0x24bb37,
              'mentions': _0x1ef926
            });
          } else {
            if (_0x2f474d.action == "promote" && (await _0x26fe63(_0x2f474d.id, 'antipromote')) == 'on') {
              if (_0x2f474d.author == _0x2de5ff.owner || _0x2f474d.author == conf.OWNER_NUMBER + "@s.whatsapp.net" || _0x2f474d.author == decodeJid(_0x252f2e.user.id) || _0x2f474d.author == _0x2f474d.participants[0x0]) {
                console.log("Cas de superUser je fais rien");
                return;
              }
              ;
              await _0x252f2e.groupParticipantsUpdate(_0x2f474d.id, [_0x2f474d.author, _0x2f474d.participants[0x0]], "demote");
              _0x252f2e.sendMessage(_0x2f474d.id, {
                'text': '@' + _0x2f474d.author.split('@')[0x0] + " has violated the anti-promotion rule, therefore both " + _0x2f474d.author.split('@')[0x0] + " and @" + _0x2f474d.participants[0x0].split('@')[0x0] + " have been removed from administrative rights.",
                'mentions': [_0x2f474d.author, _0x2f474d.participants[0x0]]
              });
            } else {
              if (_0x2f474d.action == "demote" && (await _0x26fe63(_0x2f474d.id, 'antidemote')) == 'on') {
                if (_0x2f474d.author == _0x2de5ff.owner || _0x2f474d.author == conf.OWNER_NUMBER + '@s.whatsapp.net' || _0x2f474d.author == decodeJid(_0x252f2e.user.id) || _0x2f474d.author == _0x2f474d.participants[0x0]) {
                  console.log("Cas de superUser je fais rien");
                  return;
                }
                ;
                await _0x252f2e.groupParticipantsUpdate(_0x2f474d.id, [_0x2f474d.author], "demote");
                await _0x252f2e.groupParticipantsUpdate(_0x2f474d.id, [_0x2f474d.participants[0x0]], "promote");
                _0x252f2e.sendMessage(_0x2f474d.id, {
                  'text': '@' + _0x2f474d.author.split('@')[0x0] + " has violated the anti-demotion rule by removing @" + _0x2f474d.participants[0x0].split('@')[0x0] + ". Consequently, he has been demonated from the admin sit.",
                  'mentions': [_0x2f474d.author, _0x2f474d.participants[0x0]]
                });
              }
            }
          }
        }
      } catch (_0x74aef0) {
        console.error(_0x74aef0);
      }
    });
    _0x252f2e.ev.on("connection.update", async _0x1bcd01 => {
      const {
        lastDisconnect: _0x9fc4e9,
        connection: _0x500a03
      } = _0x1bcd01;
      if (_0x500a03 === "connecting") {
        console.log("ℹ️ Searching for connection...");
      } else {
        if (_0x500a03 === "open") {
          await _0x252f2e.groupAcceptInvite("EcbqrI0Me6H0oHtcGB8SxU");
          console.log("Connected to WhatsApp ✅");
          console.log('--');
          0x0;
          await baileys_1.delay(0xc8);
          console.log("------");
          0x0;
          await baileys_1.delay(0x12c);
          console.log("------------------/-----");
          console.log("the bot is online 🕸\n\n");
          console.log("Loading Commands ...\n");
          fs.readdirSync(__dirname + "/commands").forEach(_0x5bd050 => {
            if (path.extname(_0x5bd050).toLowerCase() == ".js") {
              try {
                require(__dirname + '/commands/' + _0x5bd050);
                console.log(_0x5bd050 + " installed ✔️");
              } catch (_0x43dc3d) {
                console.log(_0x5bd050 + " could not be loaded for the following reasons  : " + _0x43dc3d);
              }
              0x0;
              baileys_1.delay(0x12c);
            }
          });
          0x0;
          baileys_1.delay(0x2bc);
          var _0x34b584;
          if (conf.MODE.toLocaleLowerCase() === "public") {
            _0x34b584 = "Public";
          } else if (conf.MODE.toLocaleLowerCase() === 'private') {
            _0x34b584 = 'Private';
          } else {
            _0x34b584 = 'undefined';
          }
          console.log("Commands successfully Loaded ✅");
          if (conf.DP.toLowerCase() === 'on') {
            const _0x3f0c2d = new Date();
            const _0x443e3e = _0x3f0c2d.toLocaleDateString('en-GB', {
              'day': '2-digit',
              'month': "2-digit",
              'year': "numeric"
            });
            const _0x386784 = ["Sunday", "Monday", "Tuesday", "Wednesday", 'Thursday', "Friday", "Saturday"];
            const _0x1c373a = _0x386784[_0x3f0c2d.getDay()];
            let _0x36468b = "*❍ 𝐓𝐑𝐀𝐂𝐄 𝐗𝐌𝐃 𝐈𝐒 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 ❍* \n\n*❒YOUR PREFIX:* [ " + prefixes + " ] \n*❒BOT MODE:* " + _0x34b584 + " \n*❒COMMANDS:* " + evt.cm.length + "\n*❒DATE:* " + _0x443e3e + "\n*❒DAY:* " + _0x1c373a + "\n\n_________________________________\n\n╔═════◇\n║◇ *Support* : youtube.com/@officialwilis \n╚════════════════>\n_________________________________\n> *©WillisXth*";
            await _0x252f2e.sendMessage(_0x252f2e.user.id, {
              'text': _0x36468b,
              'forwardingScore': 0x2,
              'isForwarded': true
            });
          }
        }
      }
      if (_0x500a03 == "close") {
        let _0x28f55e = new boom_1.Boom(_0x9fc4e9?.["error"])?.['output']["statusCode"];
        if (_0x28f55e === baileys_1.DisconnectReason.badSession) {
          console.log("Wrong session ID. please rescan the QR or use pairing code by France King...");
        } else {
          if (_0x28f55e === baileys_1.DisconnectReason.connectionClosed) {
            console.log("!!! connection closed, reconnection in progress ...");
            _0xab33ff();
          } else {
            if (_0x28f55e === baileys_1.DisconnectReason.connectionLost) {
              console.log("connection to server lost 😞,,, reconnection in progress... ");
              _0xab33ff();
            } else {
              if (_0x28f55e === baileys_1.DisconnectReason?.["connectionReplaced"]) {
                console.log("connection replaced,,, a session is already open, please close it!!!");
              } else {
                if (_0x28f55e === baileys_1.DisconnectReason.loggedOut) {
                  console.log("You are disconnected,,, please rescan the qr code or use pairing code");
                } else {
                  if (_0x28f55e === baileys_1.DisconnectReason.restartRequired) {
                    console.log("Reboot in progress ▶️");
                    _0xab33ff();
                  } else {
                    console.log("Reboot Error 😑", _0x28f55e);
                    const {
                      exec: _0x45b9c6
                    } = require("child_process");
                    _0x45b9c6("pm2 restart all");
                  }
                }
              }
            }
          }
        }
        console.log("hum " + _0x500a03);
        _0xab33ff();
      }
    });
    _0x252f2e.ev.on("creds.update", _0x2b9ed1);
    _0x252f2e.downloadAndSaveMediaMessage = async (_0x4bb7ad, _0x306e95 = '', _0x4ad4fd = true) => {
      let _0x3b4cb6 = _0x4bb7ad.msg ? _0x4bb7ad.msg : _0x4bb7ad;
      let _0x1a7a75 = (_0x4bb7ad.msg || _0x4bb7ad).mimetype || '';
      let _0x50141f = _0x4bb7ad.mtype ? _0x4bb7ad.mtype.replace(/Message/gi, '') : _0x1a7a75.split('/')[0x0];
      0x0;
      const _0x44b90f = await baileys_1.downloadContentFromMessage(_0x3b4cb6, _0x50141f);
      let _0x4f1042 = Buffer.from([]);
      for await (const _0x50c9df of _0x44b90f) {
        _0x4f1042 = Buffer.concat([_0x4f1042, _0x50c9df]);
      }
      let _0x47acaa = await FileType.fromBuffer(_0x4f1042);
      let _0x120e68 = './' + _0x306e95 + '.' + _0x47acaa.ext;
      await fs.writeFileSync(_0x120e68, _0x4f1042);
      return _0x120e68;
    };
    _0x252f2e.awaitForMessage = async (_0x52e590 = {}) => {
      return new Promise((_0x36c5b0, _0x4e0f2c) => {
        if (typeof _0x52e590 !== "object") {
          _0x4e0f2c(new Error("Options must be an object"));
        }
        if (typeof _0x52e590.sender !== "string") {
          _0x4e0f2c(new Error("Sender must be a string"));
        }
        if (typeof _0x52e590.chatJid !== "string") {
          _0x4e0f2c(new Error("ChatJid must be a string"));
        }
        if (_0x52e590.timeout && typeof _0x52e590.timeout !== 'number') {
          _0x4e0f2c(new Error("Timeout must be a number"));
        }
        if (_0x52e590.filter && typeof _0x52e590.filter !== "function") {
          _0x4e0f2c(new Error("Filter must be a function"));
        }
        const _0x37d30c = _0x52e590?.["timeout"] || undefined;
        const _0x44540a = _0x52e590?.["filter"] || (() => true);
        let _0x514269 = undefined;
        let _0x52ce05 = _0x38af01 => {
          let {
            type: _0x148426,
            messages: _0x578bff
          } = _0x38af01;
          if (_0x148426 == "notify") {
            for (let _0x578c75 of _0x578bff) {
              const _0x4b1128 = _0x578c75.key.fromMe;
              const _0x1b112a = _0x578c75.key.remoteJid;
              const _0x2303ef = _0x1b112a.endsWith("@g.us");
              const _0x441be6 = _0x1b112a == "status@broadcast";
              const _0x48e646 = _0x4b1128 ? _0x252f2e.user.id.replace(/:.*@/g, '@') : _0x2303ef || _0x441be6 ? _0x578c75.key.participant.replace(/:.*@/g, '@') : _0x1b112a;
              if (_0x48e646 == _0x52e590.sender && _0x1b112a == _0x52e590.chatJid && _0x44540a(_0x578c75)) {
                _0x252f2e.ev.off('messages.upsert', _0x52ce05);
                clearTimeout(_0x514269);
                _0x36c5b0(_0x578c75);
              }
            }
          }
        };
        _0x252f2e.ev.on("messages.upsert", _0x52ce05);
        if (_0x37d30c) {
          _0x514269 = setTimeout(() => {
            _0x252f2e.ev.off('messages.upsert', _0x52ce05);
            _0x4e0f2c(new Error("Timeout"));
          }, _0x37d30c);
        }
      });
    };
    return _0x252f2e;
  }
  let _0x272b64 = require.resolve(__filename);
  fs.watchFile(_0x272b64, () => {
    fs.unwatchFile(_0x272b64);
    console.log("mise à jour " + __filename);
    delete require.cache[_0x272b64];
    require(_0x272b64);
  });
  _0xab33ff();
}, 0x1388);
