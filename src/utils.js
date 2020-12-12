import constants from './constants';

let utils = {
  metaKey: '_secure__ls__metadata',
  encryptionSecret: '',
  secretPhrase: 's3cr3t$#@135^&*246',
  allKeys: [],
  is: function (key) {
    if (key) {
      return true;
    }
    return false;
  },
  warn: function (reason) {
    reason = reason ? reason : constants.WarningEnum.DEFAULT_TEXT;
    console.warn(constants.WarningTypes[reason]);
  },
  getObjectFromKey: function (data, key) {
    if (!data || !data.length) {
      return {};
    }

    let i, obj = {};

    for (i = 0; i < data.length; i++) {
      if (data[i].k === key) {
        obj = data[i];
        break;
      }
    }

    return obj;
  },
  getAllKeys: function () {
    return this.allKeys;
  },
  isKeyPresent: function (key) {
    let isKeyAlreadyPresent = false;

    for (let i = 0; i < this.allKeys.length; i++) {
      if (String(this.allKeys[i]) === String(key)) {
        isKeyAlreadyPresent = true; // found
        break;
      }
    }

    return isKeyAlreadyPresent;
  },
  addToKeysList: function (key) {
    this.allKeys.push(key);
  },
  removeFromKeysList: function (key) {
    let i, index = -1;

    for (i = 0; i < this.allKeys.length; i++) {
      if (this.allKeys[i] === key) {
        index = i;
        break;
      }
    }
    if (index !== -1) {
      this.allKeys.splice(index, 1);
    }
    return index;
  }
};

module.exports = utils;
