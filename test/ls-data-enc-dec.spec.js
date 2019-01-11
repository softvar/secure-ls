import chai from 'chai';
import SecureLS from '../dist/secure-ls.js';
import mockLS from './mock/ls';

const expect = chai.expect;

chai.expect();

describe('Encryption / Decryption Tests ->', () => {
  let mockStorage = mockLS.storageMock();
  let lib;

  beforeEach(() => {
    mockLS.storage = {};
    lib = new SecureLS();
    lib.ls = mockStorage;
  });

  afterEach(() => {
    lib.removeAll();
  });

  describe('Base64 encoded and no data compression', () => {
    it('should Base64 encode data before storing to localStorage', () => {
      let valueStored;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib = new SecureLS({isCompression: false});
      lib.ls = mockStorage;
      lib.set(key, data);

      // corresponding to [1, 2, 3] => "WzEsMiwzXQ==" i.e. Base64 encoded
      valueStored = lib.Base64.encode(JSON.stringify(data));

      expect(mockLS.storage[key]).to.exist;
      expect(mockLS.storage[key]).to.be.a('string');
      // important
      expect(mockLS.storage[key]).to.equal(valueStored);

      lib.removeAll();
    });
  });

  describe('Base64 encoded and data compression', () => {
    it('should Base64 encode data before storing to localStorage', () => {
      let valueStored;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib = new SecureLS();
      lib.ls = mockStorage;
      lib.set(key, data);

      // corresponding to [1, 2, 3] => "㪂ೠ눉惮 脔ொꀀ" i.e. Base64 encoded
      valueStored = lib.LZString.compressToUTF16(lib.Base64.encode(JSON.stringify(data)));

      expect(mockLS.storage[key]).to.exist;
      expect(mockLS.storage[key]).to.be.a('string');
      // important
      expect(mockLS.storage[key]).to.equal(valueStored);

      lib.removeAll();
    });
  });

  describe('AES encyption and no data compression', () => {
    it('should encrypt data with AES before storing to localStorage', () => {
      let valueStored, valueRetrieved;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib = new SecureLS({encodingType: 'aes', isCompression: false});
      lib.ls = mockStorage;
      lib.set(key, data);

      // corresponding to [1, 2, 3] => "U2FsdGVkX18+oRXqlPpUH+Q0sI26w+8msQo5UhNq6hw=" i.e. AES encrypted
      valueStored = lib.AES.encrypt(JSON.stringify(data), lib.utils.encryptionSecret).toString();

      expect(mockLS.storage[key]).to.exist;
      expect(mockLS.storage[key]).to.be.a('string');

      // Can't check exact values since CryptoJS encryption is time-dependent
      // expect(mockLS.storage[key]).to.equal(valueStored);

      valueRetrieved = JSON.parse(lib.AES.decrypt(valueStored, lib.utils.encryptionSecret).toString(lib.enc._Utf8));
      expect(data.toString()).to.equal(valueRetrieved.toString());

      lib.removeAll();
    });
  });

  describe('AES encyption and data compression', () => {
    it('should encrypt data with AES before storing to localStorage', () => {
      let valueStored, valueRetrieved;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib = new SecureLS({encodingType: 'aes', isCompression: true});
      lib.ls = mockStorage;
      lib.set(key, data);

      // corresponding to [1, 2, 3] => "⪂恢ೠ☎⁪ڰځ᠁쁺Ÿીꀜ鄈Àኀ퐁᠁肢ϙ㑀娃࠰Ⲁ찠̨ư༠ǟ踈Ÿ耀 " i.e. compressed AES encrypted
      valueStored = lib.LZString.compressToUTF16(
          lib.AES.encrypt(JSON.stringify(data), lib.utils.encryptionSecret).toString()
      );

      expect(mockLS.storage[key]).to.exist;
      expect(mockLS.storage[key]).to.be.a('string');

      // Can't check exact values since CryptoJS encryption is time-dependent
      // expect(mockLS.storage[key]).to.equal(valueStored);

      valueRetrieved = lib.LZString.decompressFromUTF16(valueStored);
      valueRetrieved = JSON.parse(lib.AES.decrypt(valueRetrieved, lib.utils.encryptionSecret).toString(lib.enc._Utf8));
      expect(data.toString()).to.equal(valueRetrieved.toString());

      lib.removeAll();
    });
  });

  describe('AES encyption, data compression and custom secret key', () => {
    it('should encrypt data with AES with custom key before storing to localStorage', () => {
      let valueStored, valueRetrieved;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib = new SecureLS({
        encodingType: 'aes',
        isCompression: true,
        encryptionSecret: 'mySecretKey123'
      });
      lib.ls = mockStorage;
      lib.set(key, data);

      expect(lib.config.encryptionSecret).to.equal('mySecretKey123');
      expect(lib.utils.encryptionSecret).to.equal('mySecretKey123');

      // corresponding to [1, 2, 3] => "⪂恢ೠ☎⁪ڰځ᠁쁺Ÿીꀜ鄈Àኀ퐁᠁肢ϙ㑀娃࠰Ⲁ찠̨ư༠ǟ踈Ÿ耀 " i.e. compressed AES encrypted
      valueStored = lib.LZString.compressToUTF16(
          lib.AES.encrypt(JSON.stringify(data), lib.utils.encryptionSecret).toString()
      );

      expect(mockLS.storage[key]).to.exist;
      expect(mockLS.storage[key]).to.be.a('string');

      // Can't check exact values since CryptoJS encryption is time-dependent
      // expect(mockLS.storage[key]).to.equal(valueStored);

      valueRetrieved = lib.LZString.decompressFromUTF16(valueStored);
      valueRetrieved = JSON.parse(lib.AES.decrypt(valueRetrieved, lib.utils.encryptionSecret).toString(lib.enc._Utf8));
      expect(data.toString()).to.equal(valueRetrieved.toString());

      lib.removeAll();
    });
  });

  describe('DES encyption and no data compression', () => {
    it('should encrypt data with DES before storing to localStorage', () => {
      let valueStored, valueRetrieved;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib = new SecureLS({encodingType: 'DES', isCompression: false});
      lib.ls = mockStorage;
      lib.set(key, data);

      // corresponding to [1, 2, 3] => "U2FsdGVkX19FJjcyo+8PjIGbhKjZKxEt" i.e. DES encrypted
      valueStored = lib.DES.encrypt(JSON.stringify(data), lib.utils.encryptionSecret).toString();

      expect(mockLS.storage[key]).to.exist;
      expect(mockLS.storage[key]).to.be.a('string');

      // Can't check exact values since CryptoJS encryption is time-dependent
      // expect(mockLS.storage[key]).to.equal(valueStored);

      valueRetrieved = JSON.parse(lib.DES.decrypt(valueStored, lib.utils.encryptionSecret).toString(lib.enc._Utf8));
      expect(data.toString()).to.equal(valueRetrieved.toString());

      lib.removeAll();
    });
  });

  describe('DES encyption, no data compression and custom secret key', () => {
    it('should encrypt data with DES before storing to localStorage', () => {
      let valueStored, valueRetrieved;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib = new SecureLS({
        encodingType: 'DES',
        isCompression: false,
        encryptionSecret: 'mySecretKey123'
      });
      lib.ls = mockStorage;
      lib.set(key, data);

      expect(lib.config.encryptionSecret).to.equal('mySecretKey123');
      expect(lib.utils.encryptionSecret).to.equal('mySecretKey123');

      // corresponding to [1, 2, 3] => "U2FsdGVkX19FJjcyo+8PjIGbhKjZKxEt" i.e. DES encrypted
      valueStored = lib.DES.encrypt(JSON.stringify(data), lib.utils.encryptionSecret).toString();

      expect(mockLS.storage[key]).to.exist;
      expect(mockLS.storage[key]).to.be.a('string');

      // Can't check exact values since CryptoJS encryption is time-dependent
      // expect(mockLS.storage[key]).to.equal(valueStored);

      valueRetrieved = JSON.parse(lib.DES.decrypt(valueStored, lib.utils.encryptionSecret).toString(lib.enc._Utf8));
      expect(data.toString()).to.equal(valueRetrieved.toString());

      lib.removeAll();
    });
  });

  describe('DES encyption and data compression', () => {
    it('should encrypt data with DES before storing to localStorage', () => {
      let valueStored, valueRetrieved;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib = new SecureLS({encodingType: 'DES', isCompression: true});
      lib.ls = mockStorage;
      lib.set(key, data);

      // corresponding to [1, 2, 3] => "⪂恢ೠ☎⁪ڰځ᠉쁡㠓䌄倈쁺ᆰୀ䬐ʐɀ挀喠儴ݲ " i.e. compressed DES encrypted
      valueStored = lib.LZString.compressToUTF16(
          lib.DES.encrypt(JSON.stringify(data), lib.utils.encryptionSecret).toString()
      );

      expect(mockLS.storage[key]).to.exist;
      expect(mockLS.storage[key]).to.be.a('string');

      // Can't check exact values since CryptoJS encryption is time-dependent
      // expect(mockLS.storage[key]).to.equal(valueStored);

      valueRetrieved = lib.LZString.decompressFromUTF16(valueStored);
      valueRetrieved = JSON.parse(lib.DES.decrypt(valueRetrieved, lib.utils.encryptionSecret).toString(lib.enc._Utf8));
      expect(data.toString()).to.equal(valueRetrieved.toString());

      lib.removeAll();
    });
  });

  describe('RABBIT encyption and no data compression', () => {
    it('should encrypt data with RABBIT before storing to localStorage', () => {
      let valueStored, valueRetrieved;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib = new SecureLS({encodingType: 'RABBIT', isCompression: false});
      lib.ls = mockStorage;
      lib.set(key, data);

      // corresponding to [1, 2, 3] => "U2FsdGVkX1+hs6euMenWXefB7TBJwPM=" i.e. RABBIT encrypted
      valueStored = lib.RABBIT.encrypt(JSON.stringify(data), lib.utils.encryptionSecret).toString();

      expect(mockLS.storage[key]).to.exist;
      expect(mockLS.storage[key]).to.be.a('string');

      // Can't check exact values since CryptoJS encryption is time-dependent
      // expect(mockLS.storage[key]).to.equal(valueStored);

      valueRetrieved = JSON.parse(lib.RABBIT.decrypt(valueStored, lib.utils.encryptionSecret).toString(lib.enc._Utf8));
      expect(data.toString()).to.equal(valueRetrieved.toString());

      lib.removeAll();
    });
  });

  describe('RABBIT encyption and data compression', () => {
    it('should encrypt data with RABBIT before storing to localStorage', () => {
      let valueStored, valueRetrieved;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib = new SecureLS({encodingType: 'RABBIT', isCompression: true});
      lib.ls = mockStorage;
      lib.set(key, data);

      // corresponding to [1, 2, 3] => "⪂恢ೠ☎⁪ڰځ᠉쁩ㆠ倖쀡´ِᅀ༁搄㇀ิ欬臬ע" i.e. compressed RABBIT encrypted
      valueStored = lib.LZString.compressToUTF16(lib.RABBIT.encrypt(JSON.stringify(data),
        lib.utils.encryptionSecret).toString());

      expect(mockLS.storage[key]).to.exist;
      expect(mockLS.storage[key]).to.be.a('string');

      // Can't check exact values since CryptoJS encryption is time-dependent
      // expect(mockLS.storage[key]).to.equal(valueStored);

      valueRetrieved = lib.LZString.decompressFromUTF16(valueStored);
      valueRetrieved = JSON.parse(lib.RABBIT.decrypt(valueRetrieved,
        lib.utils.encryptionSecret).toString(lib.enc._Utf8));
      expect(data.toString()).to.equal(valueRetrieved.toString());

      lib.removeAll();
    });
  });

  describe('RABBIT encyption, data compression but no secret key', () => {
    it('should encrypt data with RABBIT before storing to localStorage', () => {
      let valueStored, valueRetrieved;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib = new SecureLS({
        encodingType: 'RABBIT',
        isCompression: true,
        encryptionSecret: ''
      });
      lib.ls = mockStorage;
      lib.set(key, data);

      expect(lib.config.encryptionSecret).to.not.equal('mySecretKey123');
      expect(lib.utils.encryptionSecret).to.not.equal('mySecretKey123');

      expect(lib.config.encryptionSecret).to.equal('');
      expect(lib.utils.encryptionSecret).to.equal('');

      // corresponding to [1, 2, 3] => "⪂恢ೠ☎⁪ڰځ᠉쁩ㆠ倖쀡´ِᅀ༁搄㇀ิ欬臬ע" i.e. compressed RABBIT encrypted
      valueStored = lib.LZString.compressToUTF16(lib.RABBIT.encrypt(JSON.stringify(data),
        lib.utils.encryptionSecret).toString());

      expect(mockLS.storage[key]).to.exist;
      expect(mockLS.storage[key]).to.be.a('string');

      // Can't check exact values since CryptoJS encryption is time-dependent
      // expect(mockLS.storage[key]).to.equal(valueStored);

      valueRetrieved = lib.LZString.decompressFromUTF16(valueStored);
      valueRetrieved = JSON.parse(lib.RABBIT.decrypt(valueRetrieved,
        lib.utils.encryptionSecret).toString(lib.enc._Utf8));
      expect(data.toString()).to.equal(valueRetrieved.toString());

      lib.removeAll();
    });
  });

  describe('RC4 encyption and no data compression', () => {
    it('should encrypt data with RC4 before storing to localStorage', () => {
      let valueStored, valueRetrieved;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib = new SecureLS({encodingType: 'RC4', isCompression: false});
      lib.ls = mockStorage;
      lib.set(key, data);

      // corresponding to [1, 2, 3] => "U2FsdGVkX1+kG77vLYAGhcPRdgH5GsQ=" i.e. RC4 encrypted
      valueStored = lib.RC4.encrypt(JSON.stringify(data), lib.utils.encryptionSecret).toString();

      expect(mockLS.storage[key]).to.exist;
      expect(mockLS.storage[key]).to.be.a('string');

      // Can't check exact values since CryptoJS encryption is time-dependent
      // expect(mockLS.storage[key]).to.equal(valueStored);

      valueRetrieved = JSON.parse(lib.RC4.decrypt(valueStored, lib.utils.encryptionSecret).toString(lib.enc._Utf8));
      expect(data.toString()).to.equal(valueRetrieved.toString());

      lib.removeAll();
    });
  });

  describe('RC4 encyption and data compression', () => {
    it('should encrypt data with RC4 before storing to localStorage', () => {
      let valueStored, valueRetrieved;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib = new SecureLS({encodingType: 'RC4', isCompression: true});
      lib.ls = mockStorage;
      lib.set(key, data);

      // corresponding to [1, 2, 3] => "⪂恢ೠ☎⁪ڰځ᠍䁅̘ࡀ⡀⢀丈٠ⶀ㙸໠ވɘའ̀눂 " i.e. compressed RC4 encrypted
      valueStored = lib.LZString.compressToUTF16(
          lib.RC4.encrypt(JSON.stringify(data), lib.utils.encryptionSecret).toString()
      );

      expect(mockLS.storage[key]).to.exist;
      expect(mockLS.storage[key]).to.be.a('string');

      // Can't check exact values since CryptoJS encryption is time-dependent
      // expect(mockLS.storage[key]).to.equal(valueStored);

      valueRetrieved = lib.LZString.decompressFromUTF16(valueStored);
      valueRetrieved = JSON.parse(lib.RC4.decrypt(valueRetrieved, lib.utils.encryptionSecret).toString(lib.enc._Utf8));
      expect(data.toString()).to.equal(valueRetrieved.toString());

      lib.removeAll();
    });
  });

  describe('AES encryption and compression and multiple storages', () => {
    it('should have two parallel storage running at the same time', () => {
      let data1 = [1, 2, 3];
      let data2 = [3, 4, 5];
      let secret1 = 'secret1';
      let secret2 = 'secret2';
      let realm1 = 'realm1';
      let realm2 = 'realm2';
      let key1 = 'key-1';
      let key2 = 'key-2';

      let lib1 = new SecureLS({
        encodingType: 'RC4', isCompression: true, encryptionSecret: secret1, encryptionNamespace: realm1
      });
      let lib2 = new SecureLS({
        encodingType: 'RC4', isCompression: true, encryptionSecret: secret2, encryptionNamespace: realm2
      });

      lib1.ls = mockStorage;
      lib2.ls = mockStorage;

      lib1.set(key1, data1);
      lib2.set(key2, data2);

      expect(lib1.get(key1)).to.eql(data1);
      expect(lib2.get(key2)).to.eql(data2);

      let error = null;

      try {
        lib1.get(key2);
      } catch (e) {
        error = e;
      }
      expect(error).to.not.eql(null);
    });
  });
});
