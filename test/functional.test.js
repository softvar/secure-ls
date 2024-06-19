import SecureLS from '../src/index';
import utils from '../src/utils';

let lib;

describe('Functional tests', () => {
  beforeEach(() => {
    lib = new SecureLS();
  });

  afterEach(() => {
    lib.removeAll();
    jest.restoreAllMocks(); // Clear all mocks after each test
  });

  describe('Config test: is Base64 encoding', () => {
    it('should verify encryption type with data encryption', () => {
      lib = new SecureLS();
      expect(lib._isBase64EncryptionType()).toBe(true);
      expect(lib._isDataCompressionEnabled()).toBe(true);
    });

    it('should verify encryption type with no data compression', () => {
      lib = new SecureLS({ isCompression: false });
      expect(lib._isBase64EncryptionType()).toBe(true);
      expect(lib._isDataCompressionEnabled()).toBe(false);
    });
  });

  describe('Config test: is AES encryption', () => {
    it('should verify encryption type with data encryption', () => {
      lib = new SecureLS({ encodingType: 'aes' });
      expect(lib._isAESEncryptionType()).toBe(true);
      expect(lib._isDataCompressionEnabled()).toBe(true);
    });

    it('should verify encryption type with no data compression', () => {
      lib = new SecureLS({ encodingType: 'aes', isCompression: false });
      expect(lib._isAESEncryptionType()).toBe(true);
      expect(lib._isDataCompressionEnabled()).toBe(false);
    });
  });

  describe('Config test: is DES encryption', () => {
    it('should verify encryption type with data encryption', () => {
      lib = new SecureLS({ encodingType: 'des' });
      expect(lib._isDESEncryptionType()).toBe(true);
      expect(lib._isDataCompressionEnabled()).toBe(true);
    });

    it('should verify encryption type with no data compression', () => {
      lib = new SecureLS({ encodingType: 'des', isCompression: false });
      expect(lib._isDESEncryptionType()).toBe(true);
      expect(lib._isDataCompressionEnabled()).toBe(false);
    });
  });

  describe('Config test: is RABBIT encryption', () => {
    it('should verify encryption type with data encryption', () => {
      lib = new SecureLS({ encodingType: 'rabbit' });
      expect(lib._isRabbitEncryptionType()).toBe(true);
      expect(lib._isDataCompressionEnabled()).toBe(true);
    });

    it('should verify encryption type with no data compression', () => {
      lib = new SecureLS({ encodingType: 'rabbit', isCompression: false });
      expect(lib._isRabbitEncryptionType()).toBe(true);
      expect(lib._isDataCompressionEnabled()).toBe(false);
    });
  });

  describe('Config test: is RC4 encryption', () => {
    it('should verify encryption type with data encryption', () => {
      lib = new SecureLS({ encodingType: 'rc4' });
      expect(lib._isRC4EncryptionType()).toBe(true);
      expect(lib._isDataCompressionEnabled()).toBe(true);
    });

    it('should verify encryption type with no data compression', () => {
      lib = new SecureLS({ encodingType: 'rc4', isCompression: false });
      expect(lib._isRC4EncryptionType()).toBe(true);
      expect(lib._isDataCompressionEnabled()).toBe(false);
    });
  });

  describe('processData: method', () => {
    it('should return if no data provided', () => {
      const spyOnLZStringCompress = jest.spyOn(lib.LZString, 'compressToUTF16').mockImplementation(() => {});

      lib.processData();
      expect(spyOnLZStringCompress).not.toHaveBeenCalled();

      spyOnLZStringCompress.mockRestore();
    });

    it('should call AES encrypt if encoding is AES', () => {
      lib = new SecureLS({ encodingType: 'aes' });

      const spyOnLZStringCompress = jest.spyOn(lib.LZString, 'compressToUTF16').mockImplementation(() => {});
      const spyOnAESEncrypt = jest.spyOn(lib.AES, 'encrypt').mockImplementation(() => {});
      const spyOnRABBITEncrypt = jest.spyOn(lib.RABBIT, 'encrypt').mockImplementation(() => {});
      const data = {
        username: 'softvar',
        module: 'secure-ls',
        stars: 10000,
      };

      lib.encryptionSecret = utils.generateSecretKey();
      lib.processData(data);
      expect(spyOnLZStringCompress).toHaveBeenCalled();
      expect(spyOnAESEncrypt).toHaveBeenCalled();
      expect(spyOnRABBITEncrypt).not.toHaveBeenCalled();

      spyOnLZStringCompress.mockRestore();
      spyOnAESEncrypt.mockRestore();
      spyOnRABBITEncrypt.mockRestore();
    });

    it('should call DES encrypt if encoding is DES', () => {
      lib = new SecureLS({ encodingType: 'DES' });

      const spyOnLZStringCompress = jest.spyOn(lib.LZString, 'compressToUTF16').mockImplementation(() => {});
      const spyOnDESEncrypt = jest.spyOn(lib.DES, 'encrypt').mockImplementation(() => {});
      const spyOnRABBITEncrypt = jest.spyOn(lib.RABBIT, 'encrypt').mockImplementation(() => {});
      const data = {
        username: 'softvar',
        module: 'secure-ls',
        stars: 10000,
      };

      lib.encryptionSecret = utils.generateSecretKey();
      lib.processData(data);
      expect(spyOnLZStringCompress).toHaveBeenCalled();
      expect(spyOnDESEncrypt).toHaveBeenCalled();
      expect(spyOnRABBITEncrypt).not.toHaveBeenCalled();

      spyOnLZStringCompress.mockRestore();
      spyOnDESEncrypt.mockRestore();
      spyOnRABBITEncrypt.mockRestore();
    });

    it('should call RABBIT encrypt if encoding is RABBIT', () => {
      lib = new SecureLS({ encodingType: 'RABBIT' });

      const spyOnLZStringCompress = jest.spyOn(lib.LZString, 'compressToUTF16').mockImplementation(() => {});
      const spyOnRABBITEncrypt = jest.spyOn(lib.RABBIT, 'encrypt').mockImplementation(() => {});
      const spyOnAESEncrypt = jest.spyOn(lib.AES, 'encrypt').mockImplementation(() => {});
      const data = {
        username: 'softvar',
        module: 'secure-ls',
        stars: 10000,
      };

      lib.encryptionSecret = utils.generateSecretKey();
      lib.processData(data);
      expect(spyOnLZStringCompress).toHaveBeenCalled();
      expect(spyOnRABBITEncrypt).toHaveBeenCalled();
      expect(spyOnAESEncrypt).not.toHaveBeenCalled();

      spyOnLZStringCompress.mockRestore();
      spyOnRABBITEncrypt.mockRestore();
      spyOnAESEncrypt.mockRestore();
    });

    it('should call RC4 encrypt if encoding is RC4', () => {
      lib = new SecureLS({ encodingType: 'RC4' });

      const spyOnLZStringCompress = jest.spyOn(lib.LZString, 'compressToUTF16').mockImplementation(() => {});
      const spyOnRC4Encrypt = jest.spyOn(lib.RC4, 'encrypt').mockImplementation(() => {});
      const spyOnRABBITEncrypt = jest.spyOn(lib.RABBIT, 'encrypt').mockImplementation(() => {});
      const data = {
        username: 'softvar',
        module: 'secure-ls',
        stars: 10000,
      };

      lib.encryptionSecret = utils.generateSecretKey();
      lib.processData(data);
      expect(spyOnLZStringCompress).toHaveBeenCalled();
      expect(spyOnRC4Encrypt).toHaveBeenCalled();
      expect(spyOnRABBITEncrypt).not.toHaveBeenCalled();

      spyOnLZStringCompress.mockRestore();
      spyOnRC4Encrypt.mockRestore();
      spyOnRABBITEncrypt.mockRestore();
    });

    it('should not call LZString compress if compression OFF', () => {
      lib = new SecureLS({ encodingType: 'aes', isCompression: false });

      const spyOnLZStringCompress = jest.spyOn(lib.LZString, 'compressToUTF16').mockImplementation(() => {});
      const data = {
        username: 'softvar',
        module: 'secure-ls',
        stars: 10000,
      };

      lib.encryptionSecret = utils.generateSecretKey();
      lib.processData(data);
      expect(spyOnLZStringCompress).not.toHaveBeenCalled();

      spyOnLZStringCompress.mockRestore();
    });

    it('should call LZString compress if compression in ON', () => {
      lib = new SecureLS({ encodingType: 'aes', isCompression: true });

      const spyOnLZStringCompress = jest.spyOn(lib.LZString, 'compressToUTF16').mockImplementation(() => {});
      const data = {
        username: 'softvar',
        module: 'secure-ls',
        stars: 10000,
      };

      lib.encryptionSecret = utils.generateSecretKey();
      lib.processData(data);
      expect(spyOnLZStringCompress).toHaveBeenCalled();

      spyOnLZStringCompress.mockRestore();
    });
  });
});
