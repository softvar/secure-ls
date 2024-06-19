import SecureLS from '../src/index';
import mockLS from './mock/ls';
import enc from '../src/enc-utf8';

let mockStorage;
let lib;
let Base64, AES, DES, RABBIT, RC4, LZString;

describe('Encryption / Decryption Tests', () => {
  beforeEach(() => {
    mockStorage = mockLS.storageMock();
    lib = new SecureLS();
    lib.storage = mockStorage;

    ({ Base64, AES, DES, RABBIT, RC4, LZString } = lib);
  });

  afterEach(() => {
    lib.removeAll();
  });

  describe('Base64 encoded and no data compression', () => {
    it('should Base64 encode data before storing to localStorage', () => {
      let valueStored;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib = new SecureLS({ isCompression: false });
      lib.storage = mockStorage;
      lib.set(key, data);

      valueStored = Base64.encode(JSON.stringify(data));

      expect(mockStorage.storage[key]).toBeDefined();
      expect(typeof mockStorage.storage[key]).toBe('string');
      expect(mockStorage.storage[key]).toEqual(valueStored);
    });
  });

  describe('Base64 encoded and data compression', () => {
    it('should Base64 encode data before storing to localStorage', () => {
      let valueStored;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib = new SecureLS();
      lib.storage = mockStorage;
      lib.set(key, data);

      valueStored = LZString.compressToUTF16(Base64.encode(JSON.stringify(data)));

      expect(mockStorage.storage[key]).toBeDefined();
      expect(typeof mockStorage.storage[key]).toBe('string');
      expect(mockStorage.storage[key]).toEqual(valueStored);
    });
  });

  describe('AES encryption and no data compression', () => {
    it('should encrypt data with AES before storing to localStorage', () => {
      let valueStored, valueRetrieved;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib = new SecureLS({ encodingType: 'aes', isCompression: false });
      lib.storage = mockStorage;
      lib.set(key, data);

      valueStored = AES.encrypt(JSON.stringify(data), lib.encryptionSecret).toString();

      expect(mockStorage.storage[key]).toBeDefined();
      expect(typeof mockStorage.storage[key]).toBe('string');

      valueRetrieved = JSON.parse(AES.decrypt(valueStored, lib.encryptionSecret).toString(enc._Utf8));
      expect(data.toString()).toEqual(valueRetrieved.toString());
    });
  });

  describe('AES encryption and data compression', () => {
    it('should encrypt data with AES before storing to localStorage', () => {
      let valueStored, valueRetrieved;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib = new SecureLS({ encodingType: 'aes', isCompression: true });
      lib.storage = mockStorage;
      lib.set(key, data);

      valueStored = LZString.compressToUTF16(AES.encrypt(JSON.stringify(data), lib.encryptionSecret).toString());

      expect(mockStorage.storage[key]).toBeDefined();
      expect(typeof mockStorage.storage[key]).toBe('string');

      valueRetrieved = JSON.parse(
        AES.decrypt(LZString.decompressFromUTF16(valueStored), lib.encryptionSecret).toString(enc._Utf8),
      );
      expect(data.toString()).toEqual(valueRetrieved.toString());
    });
  });

  describe('AES encryption, data compression, and custom secret key', () => {
    it('should encrypt data with AES with custom key before storing to localStorage', () => {
      let valueStored, valueRetrieved;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib = new SecureLS({
        encodingType: 'aes',
        isCompression: true,
        encryptionSecret: 'mySecretKey123',
      });
      lib.storage = mockStorage;
      lib.set(key, data);

      expect(lib.config.encryptionSecret).toEqual('mySecretKey123');
      expect(lib.encryptionSecret).toEqual('mySecretKey123');

      valueStored = LZString.compressToUTF16(AES.encrypt(JSON.stringify(data), lib.encryptionSecret).toString());

      expect(mockStorage.storage[key]).toBeDefined();
      expect(typeof mockStorage.storage[key]).toBe('string');

      valueRetrieved = JSON.parse(
        AES.decrypt(LZString.decompressFromUTF16(valueStored), lib.encryptionSecret).toString(enc._Utf8),
      );
      expect(data.toString()).toEqual(valueRetrieved.toString());
    });
  });

  describe('DES encryption and no data compression', () => {
    it('should encrypt data with DES before storing to localStorage', () => {
      let valueStored, valueRetrieved;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib = new SecureLS({ encodingType: 'DES', isCompression: false });
      lib.storage = mockStorage;
      lib.set(key, data);

      valueStored = DES.encrypt(JSON.stringify(data), lib.encryptionSecret).toString();

      expect(mockStorage.storage[key]).toBeDefined();
      expect(typeof mockStorage.storage[key]).toBe('string');

      valueRetrieved = JSON.parse(DES.decrypt(valueStored, lib.encryptionSecret).toString(enc._Utf8));
      expect(data.toString()).toEqual(valueRetrieved.toString());
    });
  });

  describe('DES encryption, no data compression, and custom secret key', () => {
    it('should encrypt data with DES before storing to localStorage', () => {
      let valueStored, valueRetrieved;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib = new SecureLS({
        encodingType: 'DES',
        isCompression: false,
        encryptionSecret: 'mySecretKey123',
      });
      lib.storage = mockStorage;
      lib.set(key, data);

      expect(lib.config.encryptionSecret).toEqual('mySecretKey123');
      expect(lib.encryptionSecret).toEqual('mySecretKey123');

      valueStored = DES.encrypt(JSON.stringify(data), lib.encryptionSecret).toString();

      expect(mockStorage.storage[key]).toBeDefined();
      expect(typeof mockStorage.storage[key]).toBe('string');

      valueRetrieved = JSON.parse(DES.decrypt(valueStored, lib.encryptionSecret).toString(enc._Utf8));
      expect(data.toString()).toEqual(valueRetrieved.toString());
    });
  });

  describe('DES encryption and data compression', () => {
    it('should encrypt data with DES before storing to localStorage', () => {
      let valueStored, valueRetrieved;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib = new SecureLS({ encodingType: 'DES', isCompression: true });
      lib.storage = mockStorage;
      lib.set(key, data);

      valueStored = LZString.compressToUTF16(DES.encrypt(JSON.stringify(data), lib.encryptionSecret).toString());

      expect(mockStorage.storage[key]).toBeDefined();
      expect(typeof mockStorage.storage[key]).toBe('string');

      valueRetrieved = JSON.parse(
        DES.decrypt(LZString.decompressFromUTF16(valueStored), lib.encryptionSecret).toString(enc._Utf8),
      );
      expect(data.toString()).toEqual(valueRetrieved.toString());
    });
  });

  describe('RABBIT encryption and no data compression', () => {
    it('should encrypt data with RABBIT before storing to localStorage', () => {
      let valueStored, valueRetrieved;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib = new SecureLS({ encodingType: 'RABBIT', isCompression: false });
      lib.storage = mockStorage;
      lib.set(key, data);

      valueStored = RABBIT.encrypt(JSON.stringify(data), lib.encryptionSecret).toString();

      expect(mockStorage.storage[key]).toBeDefined();
      expect(typeof mockStorage.storage[key]).toBe('string');

      valueRetrieved = JSON.parse(RABBIT.decrypt(valueStored, lib.encryptionSecret).toString(enc._Utf8));
      expect(data.toString()).toEqual(valueRetrieved.toString());
    });
  });

  describe('RABBIT encryption and data compression', () => {
    it('should encrypt data with RABBIT before storing to localStorage', () => {
      let valueStored, valueRetrieved;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib = new SecureLS({ encodingType: 'RABBIT', isCompression: true });
      lib.storage = mockStorage;
      lib.set(key, data);

      valueStored = LZString.compressToUTF16(RABBIT.encrypt(JSON.stringify(data), lib.encryptionSecret).toString());

      expect(mockStorage.storage[key]).toBeDefined();
      expect(typeof mockStorage.storage[key]).toBe('string');

      valueRetrieved = JSON.parse(
        RABBIT.decrypt(LZString.decompressFromUTF16(valueStored), lib.encryptionSecret).toString(enc._Utf8),
      );
      expect(data.toString()).toEqual(valueRetrieved.toString());
    });
  });

  describe('RABBIT encryption and no data compression', () => {
    it('should encrypt data with RABBIT before storing to localStorage', () => {
      let lib;
      const data = [1, 2, 3];
      const key = 'key-1';

      lib = new SecureLS({ encodingType: 'RABBIT', isCompression: false });
      lib.storage = mockStorage;
      lib.set(key, data);

      // Encrypt data using RABBIT algorithm
      const valueStored = RABBIT.encrypt(JSON.stringify(data), lib.encryptionSecret).toString();

      // Assertions
      expect(mockStorage.storage[key]).toBeDefined();
      expect(typeof mockStorage.storage[key]).toBe('string');

      const decryptedData = JSON.parse(RABBIT.decrypt(valueStored, lib.encryptionSecret).toString(enc._Utf8));
      expect(data.toString()).toEqual(decryptedData.toString());
    });
  });

  describe('RABBIT encryption and data compression', () => {
    it('should encrypt data with RABBIT and compress before storing to localStorage', () => {
      let lib;
      const data = [1, 2, 3];
      const key = 'key-1';

      lib = new SecureLS({ encodingType: 'RABBIT', isCompression: true });
      lib.storage = mockStorage;
      lib.set(key, data);

      // Encrypt and compress data using RABBIT algorithm
      const encryptedData = RABBIT.encrypt(JSON.stringify(data), lib.encryptionSecret).toString();
      const valueStored = LZString.compressToUTF16(encryptedData);

      // Assertions
      expect(mockStorage.storage[key]).toBeDefined();
      expect(typeof mockStorage.storage[key]).toBe('string');

      const decompressedData = RABBIT.decrypt(LZString.decompressFromUTF16(valueStored), lib.encryptionSecret).toString(
        enc._Utf8,
      );
      const decryptedData = JSON.parse(decompressedData);
      expect(data.toString()).toEqual(decryptedData.toString());
    });
  });

  describe('RABBIT encryption, data compression but no secret key', () => {
    it('should encrypt data and store', () => {
      let lib;
      const data = [1, 2, 3];
      const key = 'key-1';

      lib = new SecureLS({
        encodingType: 'RABBIT',
        isCompression: true,
        encryptionSecret: undefined,
      });
      lib.storage = mockStorage;
      lib.set(key, data);

      const encryptedData = RABBIT.encrypt(JSON.stringify(data), lib.encryptionSecret).toString();
      const valueStored = LZString.compressToUTF16(encryptedData);

      // Without encryption secret, data should not be encrypted
      expect(mockStorage.storage[key]).toBeDefined();
      expect(typeof mockStorage.storage[key]).toBe('string');

      const decompressedData = RABBIT.decrypt(LZString.decompressFromUTF16(valueStored), lib.encryptionSecret).toString(
        enc._Utf8,
      );
      const decryptedData = JSON.parse(decompressedData);
      expect(data.toString()).toEqual(decryptedData.toString());
    });
  });

  describe('RC4 encryption and no data compression', () => {
    it('should encrypt data with RC4 before storing to localStorage', () => {
      let lib;
      const data = [1, 2, 3];
      const key = 'key-1';

      lib = new SecureLS({ encodingType: 'RC4', isCompression: false });
      lib.storage = mockStorage;
      lib.set(key, data);

      // Encrypt data using RC4 algorithm
      const valueStored = RC4.encrypt(JSON.stringify(data), lib.encryptionSecret).toString();

      // Assertions
      expect(mockStorage.storage[key]).toBeDefined();
      expect(typeof mockStorage.storage[key]).toBe('string');

      const decryptedData = JSON.parse(RC4.decrypt(valueStored, lib.encryptionSecret).toString(enc._Utf8));
      expect(data.toString()).toEqual(decryptedData.toString());
    });
  });

  describe('RC4 encryption and data compression', () => {
    it('should encrypt data with RC4 and compress before storing to localStorage', () => {
      let lib;
      const data = [1, 2, 3];
      const key = 'key-1';

      lib = new SecureLS({ encodingType: 'RC4', isCompression: true });
      lib.storage = mockStorage;
      lib.set(key, data);

      // Encrypt and compress data using RC4 algorithm
      const encryptedData = RC4.encrypt(JSON.stringify(data), lib.encryptionSecret).toString();
      const valueStored = LZString.compressToUTF16(encryptedData);

      // Assertions
      expect(mockStorage.storage[key]).toBeDefined();
      expect(typeof mockStorage.storage[key]).toBe('string');

      const decompressedData = RC4.decrypt(LZString.decompressFromUTF16(valueStored), lib.encryptionSecret).toString(
        enc._Utf8,
      );
      const decryptedData = JSON.parse(decompressedData);
      expect(data.toString()).toEqual(decryptedData.toString());
    });
  });

  describe('AES encryption and compression and multiple storages', () => {
    it('should manage two parallel storages with different encryption settings', () => {
      const data1 = [1, 2, 3];
      const data2 = [3, 4, 5];
      const secret1 = 'secret1';
      const secret2 = 'secret2';
      const realm1 = 'realm1';
      const realm2 = 'realm2';
      const key1 = 'key-1';
      const key2 = 'key-2';

      const lib1 = new SecureLS({
        encodingType: 'RC4',
        isCompression: true,
        encryptionSecret: secret1,
        encryptionNamespace: realm1,
      });
      const lib2 = new SecureLS({
        encodingType: 'RC4',
        isCompression: true,
        encryptionSecret: secret2,
        encryptionNamespace: realm2,
      });

      lib1.ls = mockStorage;
      lib2.ls = mockStorage;

      lib1.set(key1, data1);
      lib2.set(key2, data2);

      // Assertions
      expect(lib1.get(key1)).toEqual(data1);
      expect(lib2.get(key2)).toEqual(data2);

      let error = null;
      try {
        lib1.get(key2);
      } catch (e) {
        error = e;
      }
      expect(error).not.toBeNull();

      lib1.removeAll();
      lib2.removeAll();
    });
  });
});
