/*
 ES6 compatible port of CryptoJS - WordArray for PBKDF2 password key generation

 Source: https://github.com/brix/crypto-js
 LICENSE: MIT
 */

let CryptoJSWordArray = {};

CryptoJSWordArray.random = function (nBytes) {
  let words = [];
  let r = (function (mw) {
    let mz = 0x3ade68b1;
    let mask = 0xffffffff;

    return function () {
      mz = (0x9069 * (mz & 0xFFFF) + (mz >> 0x10)) & mask;
      mw = (0x4650 * (mw & 0xFFFF) + (mw >> 0x10)) & mask;
      let result = ((mz << 0x10) + mw) & mask;

      result /= 0x100000000;
      result += 0.5;
      return result * (Math.random() > 0.5 ? 1 : -1);
    };
  });

  for (let i = 0, rcache; i < nBytes; i += 4) {
    let _r = r((rcache || Math.random()) * 0x100000000);

    rcache = _r() * 0x3ade67b7;
    words.push((_r() * 0x100000000) | 0);
  }

  return new this.Set(words, nBytes);
};

CryptoJSWordArray.Set = function (words, sigBytes) {
  words = this.words = words || [];

  if (sigBytes !== undefined) {
    this.sigBytes = sigBytes;
  } else {
    this.sigBytes = words.length * 8;
  }
};

module.exports = CryptoJSWordArray;
