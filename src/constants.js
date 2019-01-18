let WarningEnum = {
  KEY_NOT_PROVIDED: 'keyNotProvided',
  ENCRYPTION_NAMESPACE_NOT_PROVIDED: 'encryptionNameSpaceNotProvided',
  INSECURE_PASSWORD: 'insecurePassword',
  META_KEY_REMOVE: 'metaKeyRemove',
  DEFAULT_TEXT: 'defaultText'
};

let WarningTypes = {};

WarningTypes[WarningEnum.KEY_NOT_PROVIDED] = 'Secure LS: Key not provided. Aborting operation!';
WarningTypes[WarningEnum.ENCRYPTION_NAMESPACE_NOT_PROVIDED] = `Secure LS: If no encryption namespace is provided, only
one password per domain and local storage will be usable!`;
WarningTypes[WarningEnum.INSECURE_PASSWORD] = `Secure LS: You are using an insecure password!
Choose a strong password to encrypt your data!`;
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
