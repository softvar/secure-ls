/*
 ES6 compatible port of CryptoJS - encoding

 Source: https://github.com/brix/crypto-js
 LICENSE: MIT
 */
const enc = {
  Latin1: {
    stringify: (wordArray) => {
      // Shortcuts
      let words = wordArray.words;
      let sigBytes = wordArray.sigBytes;
      let latin1Chars = [],
        i,
        bite;

      // Convert
      for (i = 0; i < sigBytes; i++) {
        bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
        latin1Chars.push(String.fromCharCode(bite));
      }

      return latin1Chars.join('');
    },
  },

  _Utf8: {
    stringify: (wordArray) => {
      try {
        return decodeURIComponent(escape(enc.Latin1.stringify(wordArray)));
      } catch (err) {
        throw new Error('Malformed UTF-8 data', err);
      }
    },
  },
};

export default enc;
