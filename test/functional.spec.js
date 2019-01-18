import chai from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import SecureLS from '../dist/secure-ls.js';

chai.expect();
chai.use(sinonChai);

const expect = chai.expect;
let lib;

describe('Functional tests', () => {
  beforeEach(() => {
    sinon.spy(console, 'warn');
    lib = new SecureLS();
  });

  afterEach(() => {
    console.warn.restore();
    lib.removeAll();
  });

  describe('Config test: is Base64 encoding', () => {
    it('should verify encryption type with data encryption', () => {
      lib = new SecureLS();
      expect(lib._isBase64EncryptionType()).to.equal(true);
      expect(lib._isDataCompressionEnabled()).to.equal(true);
    });
    it('should verify encryption type with no data compression', () => {
      lib = new SecureLS({isCompression: false});
      expect(lib._isBase64EncryptionType()).to.equal(true);
      expect(lib._isDataCompressionEnabled()).to.equal(false);
    });
  });

  describe('Config test: show password usage warnings', () => {
    it('should verify encryption type with data encryption', () => {
      lib = new SecureLS({encodingType: 'aes'});
      expect(console.warn.calledWith(`Secure LS: If no encryption namespace is provided, only
one password per domain and local storage will be usable!`)).to.be.ok;
      expect(console.warn.calledWith(`Secure LS: You are using an insecure password!
Choose a strong password to encrypt your data!`)).to.be.ok;
    });
  });

  describe('Config test: is AES encryption', () => {
    it('should verify encryption type with data encryption', () => {
      lib = new SecureLS({encodingType: 'aes', encryptionSecret: 'some', encryptionNamespace: 'some'});
      expect(lib._isAESEncryptionType()).to.equal(true);
      expect(lib._isDataCompressionEnabled()).to.equal(true);
    });
    it('should verify encryption type with no data compression', () => {
      lib = new SecureLS({
        encodingType: 'aes', isCompression: false, encryptionSecret: 'some', encryptionNamespace: 'some'
      });
      expect(lib._isAESEncryptionType()).to.equal(true);
      expect(lib._isDataCompressionEnabled()).to.equal(false);
    });
  });

  describe('Config test: is DES encryption', () => {
    it('should verify encryption type with data encryption', () => {
      lib = new SecureLS({encodingType: 'des', encryptionSecret: 'some', encryptionNamespace: 'some'});
      expect(lib._isDESEncryptionType()).to.equal(true);
      expect(lib._isDataCompressionEnabled()).to.equal(true);
    });
    it('should verify encryption type with no data compression', () => {
      lib = new SecureLS({
        encodingType: 'des', isCompression: false, encryptionSecret: 'some', encryptionNamespace: 'some'
      });
      expect(lib._isDESEncryptionType()).to.equal(true);
      expect(lib._isDataCompressionEnabled()).to.equal(false);
    });
  });

  describe('Config test: is RABBIT encryption', () => {
    it('should verify encryption type with data encryption', () => {
      lib = new SecureLS({encodingType: 'rabbit', encryptionSecret: 'some', encryptionNamespace: 'some'});
      expect(lib._isRabbitEncryptionType()).to.equal(true);
      expect(lib._isDataCompressionEnabled()).to.equal(true);
    });
    it('should verify encryption type with no data compression', () => {
      lib = new SecureLS({
        encodingType: 'rabbit', isCompression: false, encryptionSecret: 'some', encryptionNamespace: 'some'
      });
      expect(lib._isRabbitEncryptionType()).to.equal(true);
      expect(lib._isDataCompressionEnabled()).to.equal(false);
    });
  });

  describe('Config test: is RC4 encryption', () => {
    it('should verify encryption type with data encryption', () => {
      lib = new SecureLS({encodingType: 'rc4', encryptionSecret: 'some', encryptionNamespace: 'some'});
      expect(lib._isRC4EncryptionType()).to.equal(true);
      expect(lib._isDataCompressionEnabled()).to.equal(true);
    });
    it('should verify encryption type with no data compression', () => {
      lib = new SecureLS({
        encodingType: 'rc4', isCompression: false, encryptionSecret: 'some', encryptionNamespace: 'some'
      });
      expect(lib._isRC4EncryptionType()).to.equal(true);
      expect(lib._isDataCompressionEnabled()).to.equal(false);
    });
  });

  describe('processData: method', () => {
    it('should return if no data provided', () => {
      let spyOnLZStringCompress = sinon.spy(lib.LZString, 'compressToUTF16');

      lib.processData();
      expect(spyOnLZStringCompress).to.not.been.called;

      spyOnLZStringCompress.restore();
    });

    it('should call AES encrypt if encoding is AES', () => {
      lib = new SecureLS({encodingType: 'aes', encryptionSecret: 'some', encryptionNamespace: 'some'});

      let spyOnLZStringCompress = sinon.spy(lib.LZString, 'compressToUTF16');
      let spyOnAESEncrypt = sinon.spy(lib.AES, 'encrypt');
      let spyOnRABBITEncrypt = sinon.spy(lib.RABBIT, 'encrypt');
      let data = {
        username: 'softvar',
        module: 'secure-ls',
        age: 1
      };

      lib.processData(data);
      expect(spyOnLZStringCompress).to.been.called;
      expect(spyOnAESEncrypt).to.been.called;
      expect(spyOnRABBITEncrypt).to.not.been.called;

      spyOnLZStringCompress.restore();
      spyOnAESEncrypt.restore();
      spyOnRABBITEncrypt.restore();
    });

    it('should call DES encrypt if encoding is DES', () => {
      lib = new SecureLS({encodingType: 'DES', encryptionSecret: 'some', encryptionNamespace: 'some'});

      let spyOnLZStringCompress = sinon.spy(lib.LZString, 'compressToUTF16');
      let spyOnDESEncrypt = sinon.spy(lib.DES, 'encrypt');
      let spyOnRABBITEncrypt = sinon.spy(lib.RABBIT, 'encrypt');
      let data = {
        username: 'softvar',
        module: 'secure-ls',
        age: 1
      };

      lib.processData(data);
      expect(spyOnLZStringCompress).to.been.called;
      expect(spyOnDESEncrypt).to.been.called;
      expect(spyOnRABBITEncrypt).to.not.been.called;

      spyOnLZStringCompress.restore();
      spyOnDESEncrypt.restore();
      spyOnRABBITEncrypt.restore();
    });

    it('should call RABBIT encrypt if encoding is RABBIT', () => {
      lib = new SecureLS({encodingType: 'RABBIT', encryptionSecret: 'some', encryptionNamespace: 'some'});

      let spyOnLZStringCompress = sinon.spy(lib.LZString, 'compressToUTF16');
      let spyOnRABBITEncrypt = sinon.spy(lib.RABBIT, 'encrypt');
      let spyOnAESEncrypt = sinon.spy(lib.AES, 'encrypt');
      let data = {
        username: 'softvar',
        module: 'secure-ls',
        age: 1
      };

      lib.processData(data);
      expect(spyOnLZStringCompress).to.been.called;
      expect(spyOnRABBITEncrypt).to.been.called;
      expect(spyOnAESEncrypt).to.not.been.called;

      spyOnLZStringCompress.restore();
      spyOnRABBITEncrypt.restore();
      spyOnAESEncrypt.restore();
    });

    it('should call RC4 encrypt if encoding is RC4', () => {
      lib = new SecureLS({encodingType: 'RC4', encryptionSecret: 'some', encryptionNamespace: 'some'});

      let spyOnLZStringCompress = sinon.spy(lib.LZString, 'compressToUTF16');
      let spyOnRC4Encrypt = sinon.spy(lib.RC4, 'encrypt');
      let spyOnRABBITEncrypt = sinon.spy(lib.RABBIT, 'encrypt');
      let data = {
        username: 'softvar',
        module: 'secure-ls',
        age: 1
      };

      lib.processData(data);
      expect(spyOnLZStringCompress).to.been.called;
      expect(spyOnRC4Encrypt).to.been.called;
      expect(spyOnRABBITEncrypt).to.not.been.called;

      spyOnLZStringCompress.restore();
      spyOnRC4Encrypt.restore();
      spyOnRABBITEncrypt.restore();
    });

    it('should not call LZString compress if compression OFF', () => {
      lib = new SecureLS({
        encodingType: 'aes', isCompression: false, encryptionSecret: 'some', encryptionNamespace: 'some'
      });

      let spyOnLZStringCompress = sinon.spy(lib.LZString, 'compressToUTF16');
      let data = {
        username: 'softvar',
        module: 'secure-ls',
        age: 1
      };

      lib.processData(data);
      expect(spyOnLZStringCompress).to.not.been.called;

      spyOnLZStringCompress.restore();
    });

    it('should call LZString compress if compression in ON', () => {
      lib = new SecureLS({
        encodingType: 'aes', isCompression: true, encryptionSecret: 'some', encryptionNamespace: 'some'
      });

      let spyOnLZStringCompress = sinon.spy(lib.LZString, 'compressToUTF16');
      let data = {
        username: 'softvar',
        module: 'secure-ls',
        age: 1
      };

      lib.processData(data);
      expect(spyOnLZStringCompress).to.been.called;

      spyOnLZStringCompress.restore();
    });
  });

});
