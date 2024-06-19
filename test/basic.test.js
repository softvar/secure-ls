import SecureLS from '../src/index';

let lib;

var localStorageMock = (function () {
  var store = {};
  return {
    getItem: function (key) {
      return store[key];
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
    removeItem: function (key) {
      delete store[key];
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Basic suites', () => {
  beforeAll(() => {});

  describe('instance creation', () => {
    lib = new SecureLS();

    test('should check correct instance creation', () => {
      expect(lib).toBeInstanceOf(SecureLS);
    });

    test('should return the name', () => {
      expect(lib._name).toBe('secure-ls');
    });
  });

  describe('constructor', () => {
    lib = new SecureLS();

    test('should be called on instance creation', () => {
      expect(lib._name).toBeDefined();
      expect(lib.Base64).toBeDefined();
      expect(lib.LZString).toBeDefined();
      expect(lib.AES).toBeDefined();
      expect(lib.DES).toBeDefined();
      expect(lib.RABBIT).toBeDefined();
      expect(lib.RC4).toBeDefined();
      expect(lib.enc).toBeDefined();
      expect(lib.storage).toBeDefined();
      expect(lib.config).toBeDefined();
      expect(lib.config).toBeInstanceOf(Object);
      expect(lib.config).toHaveProperty('encodingType');
      expect(lib.config).toHaveProperty('isCompression');
    });

    test('should call init method', () => {
      const spy = jest.spyOn(lib, 'init');

      // mock as if new instance is created but actually not
      // Can't expect otherwise Object reference would be lost
      expect(spy).not.toHaveBeenCalled();
      lib.init();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore(); // Reset spy after test
    });
  });
});
