const iconv = require("iconv-lite");

function eucKrToUtf8(str) {
  var iconv = new Iconv("euc-kr", "utf-8");
  var buf = new Buffer(str, "binary");
  return iconv.convert(buf).toString();
}
module.exports = eucKrToUtf8;
