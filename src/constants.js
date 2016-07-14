let WarningEnum = {
  KEY_NOT_PROVIDED: 'keyNotProvided',
  META_KEY_REMOVE: 'metaKeyRemove',
  DEFAULT_TEXT: 'defaultText'
};

let WarningTypes = {};

WarningTypes[WarningEnum.KEY_NOT_PROVIDED] = 'Secure LS: Key not provided. Aborting operation!';
WarningTypes[WarningEnum.META_KEY_REMOVE] = `Secure LS: Meta key can not be removed
unless all keys created by Secure LS are removed!`;
WarningTypes[WarningEnum.DEFAULT_TEXT] = `Unexpected output`;

let constants = {
  WarningEnum: WarningEnum,
  WarningTypes: WarningTypes,
  EncrytionTypes: {
    BASE64: 'base64',
    AES: 'aes',
    DES: 'des',
    RABBIT: 'rabbit',
    RC4: 'rc4'
  }
};

module.exports = constants;
