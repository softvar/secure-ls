import SecureLS from '../src/index';
import utils from '../src/utils';

let lib;

describe('Utils tests', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    lib = new SecureLS();
  });

  afterEach(() => {
    console.warn.mockRestore();
    lib.removeAll();
  });

  describe('method: is', () => {
    test('return true if key is present', () => {
      const response = utils.is('new-key');
      expect(response).toBe(true);
    });

    test('return false if key is not present', () => {
      const response = utils.is();
      expect(response).toBe(false);
    });
  });

  describe('method: warn', () => {
    test('warn with default warning msg if no reason provided', () => {
      utils.warn();
      expect(console.warn).toHaveBeenCalled();
      expect(console.warn).toHaveBeenCalledWith('Unexpected output');
    });

    test('warn with undefined warning msg if wrong reason provided', () => {
      utils.warn('wrong');
      expect(console.warn).toHaveBeenCalled();
      expect(console.warn).not.toHaveBeenCalledWith('Unexpected output');
    });

    test('warn with warning msg as per reason provided', () => {
      utils.warn('keyNotProvided');
      expect(console.warn).toHaveBeenCalled();
      expect(console.warn).toHaveBeenCalledWith('Secure LS: Key not provided. Aborting operation!');
    });
  });

  describe('method: generateSecretKey', () => {
    test('validate PBKDF2 key generated', () => {
      const encryptionKey = utils.generateSecretKey();
      expect(typeof encryptionKey).toBe('string');
      expect(encryptionKey.length).toBeGreaterThan(30);
    });
  });

  describe('method: getObjectFromKey', () => {
    test('if no data provided, return empty object', () => {
      const response = utils.getObjectFromKey();
      expect(response).toEqual({});
    });

    test('if data provided is empty array, return empty object', () => {
      const response = utils.getObjectFromKey([]);
      expect(response).toEqual({});
    });

    test('should return obj matching the key provided', () => {
      const data = [
        { k: 'name', test: 'case1' },
        { k: 'stars', test: 'case2' },
      ];
      const response = utils.getObjectFromKey(data, 'name');
      expect(response).toBe(data[0]);
    });
  });

  describe('method: extractKeyNames', () => {
    test('should return just the `k` values', () => {
      const data = {
        keys: [
          { k: 'name', test: 'case1' },
          { k: 'stars', test: 'case2' },
        ],
      };
      const response = utils.extractKeyNames(data);
      expect(Array.isArray(response)).toBe(true);
      expect(response).toContain('name');
      expect(response).not.toContain('test');
    });
  });

  describe('method: isKeyPresent', () => {
    test('should return the boolean based on key presence', () => {
      const allKeys = [
        { k: 'name', test: 'case1' },
        { k: 'stars', test: 'case2' },
      ];
      expect(utils.isKeyPresent(allKeys, 'name')).toBe(true);
      expect(utils.isKeyPresent(allKeys, 'wrong-key')).toBe(false);
    });
  });

  describe('method: removeFromKeysList', () => {
    test('should remove object from array if key matches', () => {
      const allKeys = [
        { k: 'name', test: 'case1' },
        { k: 'stars', test: 'case2' },
      ];

      expect(allKeys.length).toBe(2);
      utils.removeFromKeysList(allKeys, 'name');
      expect(allKeys.length).toBe(1);
      utils.removeFromKeysList(allKeys, 'wrong-key');
      expect(allKeys.length).toBe(1);
      utils.removeFromKeysList(allKeys, 'stars');
      expect(allKeys.length).toBe(0);
    });
  });
});
