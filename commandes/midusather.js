const axios = require("axios");
const {
  zokou
} = require('../framework/zokou');
zokou({
  'nomCom': "weather",
  'reaction': "🌡️",
  'categorie': "Search"
}, async (_0xfe9873, _0x3e3c79, _0x548dbe) => {
  const {
    repondre: _0xff71f0,
    arg: _0xe0347d,
    ms: _0x11ba74
  } = _0x548dbe;
  const _0x3deba0 = _0xe0347d.join(" ");
  if (!_0x3deba0) {
    return _0xff71f0("Give me location...");
  }
  try {
    const _0x565dc4 = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      'params': {
        'q': _0x3deba0,
        'units': "metric",
        'appid': '060a6bcfa19809c2cd4d97a212b19273',
        'language': 'en'
      }
    });
    const _0x11bf3d = _0x565dc4.data;
    const _0x362902 = _0x11bf3d.name;
    const _0x34b5e5 = _0x11bf3d.main.temp;
    const _0x127f85 = _0x11bf3d.main.feels_like;
    const _0x165207 = _0x11bf3d.main.temp_min;
    const _0x3033e3 = _0x11bf3d.main.temp_max;
    const _0x450202 = _0x11bf3d.weather[0x0].description;
    const _0x3f30c9 = _0x11bf3d.main.humidity;
    const _0x4b5d7a = _0x11bf3d.wind.speed;
    const _0x1ecb03 = _0x11bf3d.rain ? _0x11bf3d.rain['1h'] : 0x0;
    const _0x5be0d1 = _0x11bf3d.clouds.all;
    const _0x34d131 = new Date(_0x11bf3d.sys.sunrise * 0x3e8);
    const _0x373562 = new Date(_0x11bf3d.sys.sunset * 0x3e8);
    await _0xff71f0("❄️ Weather in " + _0x362902 + "\n\n🌡️ Temperature: " + _0x34b5e5 + "°C\n🌡️ Feels Like: " + _0x127f85 + "°C\n🌡️ Min Temperature: " + _0x165207 + "°C\n🌡️ Max Temperature: " + _0x3033e3 + "°C\n📝 Description: " + _0x450202 + "\n❄️ Humidity: " + _0x3f30c9 + "%\n🌀 Wind Speed: " + _0x4b5d7a + " m/s\n🌧️ Rain Volume (last hour): " + _0x1ecb03 + " mm\n☁️ Cloudiness: " + _0x5be0d1 + "%\n🌄 Sunrise: " + _0x34d131.toLocaleTimeString() + "\n🌅 Sunset: " + _0x373562.toLocaleTimeString() + "\n🌫️ Latitude: " + _0x11bf3d.coord.lat + "\n🌪️ Longitude: " + _0x11bf3d.coord.lon + "\n\n🗺 Country: " + _0x11bf3d.sys.country + "\n\n*°Genarated by GAGA-MD*");
  } catch (_0xeea2e6) {
    console.error("Error fetching weather data:", _0xeea2e6);
    await _0xff71f0("An error occurred while fetching the weather data. Please try again.");
  }
});
