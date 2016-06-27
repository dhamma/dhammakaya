process PTS Tipitaka from Dhammakaya 2.5

steps:

    1) convert.js split pali1.json into bookxml/
    2) footpgcsv2json.js split footpg1.json into data/footpg1.json
    3) parsepts.js generates xml with footnote markup into xml/
    4) xml/pts.js  generates ptsmul.ydb

known issue:
   node footpgcsv2json.js

    fs.js:1240
  var keys = Object.keys(options);
                    ^
TypeError: Object.keys called on non-object
    at Function.keys (native)
    at new fs.ReadStream (fs.js:1240:21)
    at Object.fs.createReadStream (fs.js:1218:10)
    at Object.<anonymous> (D:\kpc\dhammakaya\footpgcsv2json.js:51:17)
    at Module._compile (module.js:449:26)
    at Object.Module._extensions..js (module.js:467:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:312:12)
    at Module.runMain (module.js:492:10)
    at process.startup.processNextTick.process._tickCallback (node.js:244:9)