const WarningEnum = {
  KEY_NOT_PROVIDED: 'keyNotProvided',
  META_KEY_REMOVE: 'metaKeyRemove',
  DEFAULT_TEXT: 'defaultText',
};

const WarningTypes = {};

WarningTypes[WarningEnum.KEY_NOT_PROVIDED] = 'Secure LS: Key not provided. Aborting operation!';
WarningTypes[WarningEnum.META_KEY_REMOVE] = `Secure LS: Meta key can not be removed
unless all keys created by Secure LS are removed!`;
WarningTypes[WarningEnum.DEFAULT_TEXT] = `Unexpected output`;

const constants = {
  WarningEnum: WarningEnum,
  WarningTypes: WarningTypes,
  EncrytionTypes: {
    BASE64: 'base64',
    AES: 'aes',
    DES: 'des',
    RABBIT: 'rabbit',
    RC4: 'rc4',
  },
  metaKey: '_secure__ls__metadata',
  secretPhrase: 's3cr3t$#@135^&*246',
};

export default constants;
