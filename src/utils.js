import PBKDF2 from 'crypto-js/pbkdf2';
import constants from './constants';
import CryptoJSWordArray from './WordArray';

const utils = {
  is: (key) => !!key,

  warn: (reason = constants.WarningEnum.DEFAULT_TEXT) => {
    console.warn(constants.WarningTypes[reason]);
  },

  generateSecretKey: () => {
    const salt = CryptoJSWordArray.random(128 / 8);
    const key128Bits = PBKDF2(constants.secretPhrase, salt, { keySize: 128 / 32 });
    return key128Bits.toString();
  },

  getObjectFromKey: (data = [], key) => {
    return data.find((item) => item.k === key) || {};
  },

  extractKeyNames: ({ keys = [] } = {}) => {
    return keys.map(({ k }) => k);
  },

  isKeyPresent: (allKeys = [], key) => {
    return allKeys.some((item) => String(item.k) === String(key));
  },

  removeFromKeysList: (allKeys = [], key) => {
    const index = allKeys.findIndex((item) => item.k === key);
    if (index !== -1) {
      allKeys.splice(index, 1);
    }
    return index;
  },
};

export default utils;
