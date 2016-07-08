import constants from './constants';

let utils = {
  prefix: '_secure__ls__metadata',
  encryptionSecret: 's3cr3t@123',
  allKeys: [],
  is: function (key) {
    if (key) {
      return true;
    }
    return false;
  },
  warn: function (reason) {
    reason = reason ? reason : constants.DEFAULT_WARNING_TEXT;
    console.warn(constants.WarningTypes[reason]);
  },
  getAllKeys: function () {
    return this.allKeys;
  },
  isKeyPresent: function (key) {
    let isKeyAlreadyPresent;

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
    let index = this.allKeys.indexOf(key);

    if (index > -1) {
      this.allKeys.splice(index, 1);
    }
    return index;
  }
};

module.exports = utils;
