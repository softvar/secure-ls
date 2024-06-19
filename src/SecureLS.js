import constants from './constants';
import enc from './enc-utf8';
import utils from './utils';

import AES from 'crypto-js/aes';
import RABBIT from 'crypto-js/rabbit';
import RC4 from 'crypto-js/rc4';
import DES from 'crypto-js/tripledes';
import { compressToUTF16, decompressFromUTF16 } from 'lz-string/libs/lz-string';
import Base64 from './Base64';

const encryptors = {
  [constants.EncrytionTypes.AES]: AES,
  [constants.EncrytionTypes.DES]: DES,
  [constants.EncrytionTypes.RABBIT]: RABBIT,
  [constants.EncrytionTypes.RC4]: RC4,
};

export class SecureLS {
  constructor({
    encryptionSecret = '',
    encryptionNamespace = '',
    isCompression = true,
    encodingType = constants.EncrytionTypes.BASE64,
    storage = localStorage,
    metaKey = constants.metaKey,
  } = {}) {
    // Assign libraries and utilities
    Object.assign(this, {
      _name: 'secure-ls',
      Base64,
      LZString: { compressToUTF16, decompressFromUTF16 },
      AES,
      DES,
      RABBIT,
      RC4,
      enc,
    });

    // Configuration and property assignment
    this.config = {
      encryptionSecret,
      encryptionNamespace,
      isCompression,
      encodingType: encodingType.toLowerCase(),
      storage,
      metaKey,
    };
    this.encryptionSecret = encryptionSecret;
    this.storage = storage;
    this.metaKey = metaKey;

    // Initialize the class
    this.init();
  }

  init() {
    let metaData = this.getMetaData();

    this._isBase64 = this._isBase64EncryptionType();
    this._isAES = this._isAESEncryptionType();
    this._isDES = this._isDESEncryptionType();
    this._isRabbit = this._isRabbitEncryptionType();
    this._isRC4 = this._isRC4EncryptionType();
    this._isCompression = this._isDataCompressionEnabled();

    // fill the already present keys to the list of keys being used by secure-ls
    this.allKeys = metaData.keys || this.resetAllKeys();
  }

  _isBase64EncryptionType() {
    return (
      Base64 &&
      (typeof this.config.encodingType === 'undefined' || this.config.encodingType === constants.EncrytionTypes.BASE64)
    );
  }

  _isAESEncryptionType() {
    return AES && this.config.encodingType === constants.EncrytionTypes.AES;
  }

  _isDESEncryptionType() {
    return DES && this.config.encodingType === constants.EncrytionTypes.DES;
  }

  _isRabbitEncryptionType() {
    return RABBIT && this.config.encodingType === constants.EncrytionTypes.RABBIT;
  }

  _isRC4EncryptionType() {
    return RC4 && this.config.encodingType === constants.EncrytionTypes.RC4;
  }

  _isDataCompressionEnabled() {
    return this.config.isCompression;
  }

  getEncryptionSecret(key) {
    let metaData = this.getMetaData();
    let obj = utils.getObjectFromKey(metaData.keys, key);

    if (!obj) {
      return;
    }

    if (this._isAES || this._isDES || this._isRabbit || this._isRC4) {
      if (typeof this.config.encryptionSecret === 'undefined') {
        this.encryptionSecret = obj.s;

        if (!this.encryptionSecret) {
          this.encryptionSecret = utils.generateSecretKey();
          this.setMetaData();
        }
      } else {
        this.encryptionSecret = this.config.encryptionSecret || obj.s || '';
      }
    }
  }

  getEncryptionType() {
    const encodingType = this.config.encodingType;
    return encodingType ? encodingType.toLowerCase() : constants.EncrytionTypes.BASE64;
  }

  getDataFromLocalStorage(key) {
    return this.storage.getItem(key, true);
  }

  setDataToLocalStorage(key, data) {
    this.storage.setItem(key, data);
  }

  setMetaData() {
    let dataToStore = this.processData(
      {
        keys: this.allKeys,
      },
      true,
    );

    // Store the data to localStorage
    this.setDataToLocalStorage(this.getMetaKey(), dataToStore);
  }

  getMetaData() {
    return this.get(this.getMetaKey(), true) || {};
  }

  getMetaKey() {
    return this.metaKey + (this.config.encryptionNamespace ? '__' + this.config.encryptionNamespace : '');
  }

  resetAllKeys() {
    this.allKeys = [];
    return [];
  }

  processData(data, isAllKeysData) {
    if (data === null || data === undefined || data === '') {
      return '';
    }

    let jsonData;

    try {
      jsonData = JSON.stringify(data);
    } catch (err) {
      throw new Error('Could not stringify data', err);
    }

    // Encode Based on encoding type
    // If not set, default to Base64 for securing data
    let encodedData = jsonData;

    if (this._isBase64 || isAllKeysData) {
      encodedData = Base64.encode(jsonData);
    } else {
      const encryptor = encryptors[this.getEncryptionType()];
      if (encryptor) {
        encodedData = encryptor.encrypt(jsonData, this.encryptionSecret);
      }

      encodedData = encodedData && encodedData.toString();
    }

    // Compress data if set to true
    let compressedData = encodedData;
    if (this._isCompression || isAllKeysData) {
      compressedData = this.LZString.compressToUTF16(encodedData);
    }

    return compressedData;
  }

  // PUBLIC APIs
  getAllKeys() {
    let data = this.getMetaData();

    return utils.extractKeyNames(data) || [];
  }

  get(key, isAllKeysData) {
    let decodedData = '';
    let jsonData = '';

    if (!utils.is(key)) {
      utils.warn(constants.WarningEnum.KEY_NOT_PROVIDED);
      return jsonData;
    }

    let data = this.getDataFromLocalStorage(key);

    if (!data) {
      return jsonData;
    }

    let deCompressedData = data; // saves else
    if (this._isCompression || isAllKeysData) {
      // meta data always compressed
      deCompressedData = this.LZString.decompressFromUTF16(data);
    }

    decodedData = deCompressedData; // saves else
    if (this._isBase64 || isAllKeysData) {
      // meta data always Base64
      decodedData = Base64.decode(deCompressedData);
    } else {
      this.getEncryptionSecret(key);
      const encryptor = encryptors[this.getEncryptionType()];

      if (encryptor) {
        const bytes = encryptor.decrypt(deCompressedData.toString(), this.encryptionSecret);

        if (bytes) {
          decodedData = bytes.toString(enc._Utf8);
        }
      }
    }

    try {
      jsonData = JSON.parse(decodedData);
    } catch (err) {
      throw new Error('Could not parse JSON', err);
    }

    return jsonData;
  }

  set(key, data) {
    let dataToStore = '';

    if (!utils.is(key)) {
      utils.warn(constants.WarningEnum.KEY_NOT_PROVIDED);
      return;
    }

    this.getEncryptionSecret(key);

    // add key(s) to Array if not already added, only for keys other than meta key
    if (!(String(key) === String(this.metaKey))) {
      if (!utils.isKeyPresent(this.allKeys, key)) {
        this.allKeys.push({
          k: key,
          s: this.encryptionSecret,
        });
        this.setMetaData();
      }
    }

    dataToStore = this.processData(data);
    // Store the data to localStorage
    this.setDataToLocalStorage(key, dataToStore);
  }

  remove(key) {
    if (!utils.is(key)) {
      utils.warn(constants.WarningEnum.KEY_NOT_PROVIDED);
      return;
    }

    if (key === this.metaKey && this.getAllKeys().length) {
      utils.warn(constants.WarningEnum.META_KEY_REMOVE);
      return;
    }

    if (utils.isKeyPresent(this.allKeys, key)) {
      utils.removeFromKeysList(this.allKeys, key);
      this.setMetaData();
    }
    this.storage.removeItem(key);
  }

  removeAll() {
    let keys = this.getAllKeys();

    for (let i = 0; i < keys.length; i++) {
      this.storage.removeItem(keys[i]);
    }

    this.storage.removeItem(this.metaKey);
    this.resetAllKeys();
  }

  clear() {
    this.storage.clear();
    this.resetAllKeys();
  }
}
