import SecureLS from '../src/index';
import mockLS from './mock/ls';

let lib;
let mockStorage;

describe('LocalStorage API Tests ->', () => {
  beforeEach(() => {
    mockStorage = mockLS.storageMock();

    lib = new SecureLS();
    lib.storage = mockStorage;
  });

  afterEach(() => {
    lib.removeAll();
  });

  describe('setItem method', () => {
    it('should set the value on key', () => {
      const data = [1, 2, 3];
      const key = 'key-1';

      lib.set(key, data);

      expect(mockStorage.storage[key]).toBeDefined();
      expect(typeof mockStorage.storage[key]).toBe('string');
    });
  });

  describe('getItem method', () => {
    it('should return the value stored', () => {
      const data = [1, 2, 3];
      const key = 'key-1';

      lib.set(key, data);

      expect(mockStorage.storage[key]).toBeDefined();
      expect(typeof mockStorage.storage[key]).toBe('string');

      const value = lib.get(key);

      expect(Array.isArray(value)).toBe(true);
      expect(value.length).toBe(3);
      expect(value.toString()).toBe(data.toString());
    });
  });

  describe('removeItem method', () => {
    it('should remove the key-value, if stored', () => {
      const data = [1, 2, 3];
      const key1 = 'key-1';
      const key2 = 'key-2';

      lib.set(key1, data);
      lib.set(key2, data);

      lib.remove(key1);
      let value1 = lib.get(key1);
      expect(mockStorage.storage[key1]).toBeUndefined();
      expect(Array.isArray(value1)).toBe(false);

      let value2 = lib.get(key2);
      expect(mockStorage.storage[key2]).toBeDefined();
      expect(Array.isArray(value2)).toBe(true);

      lib.remove(key2);
      value1 = lib.get(key1);
      expect(mockStorage.storage[key1]).toBeUndefined();
      expect(Array.isArray(value1)).toBe(false);

      value2 = lib.get(key2);
      expect(mockStorage.storage[key2]).toBeUndefined();
      expect(Array.isArray(value2)).toBe(false);
    });
  });

  describe('setItem, getItem and removeItem in one go', () => {
    it('should set, get and remove', () => {
      const data = [1, 2, 3];
      const key1 = 'key-1';
      const key2 = 'key-2';

      lib.set(key1, data);
      expect(mockStorage.storage[key1]).toBeDefined();
      expect(typeof mockStorage.storage[key1]).toBe('string');

      lib.set(key2, data);
      expect(mockStorage.storage[key2]).toBeDefined();
      expect(typeof mockStorage.storage[key2]).toBe('string');

      let value1 = lib.get(key1);
      expect(Array.isArray(value1)).toBe(true);
      expect(value1.length).toBe(3);
      expect(value1.toString()).toBe(data.toString());

      let value2 = lib.get(key2);
      expect(Array.isArray(value2)).toBe(true);
      expect(value2.length).toBe(3);
      expect(value2.toString()).toBe(data.toString());

      lib.remove(key1);
      value1 = lib.get(key1);
      expect(mockStorage.storage[key1]).toBeUndefined();
      expect(Array.isArray(value1)).toBe(false);

      value2 = lib.get(key2);
      expect(Array.isArray(value2)).toBe(true);
      expect(value2.length).toBe(3);
      expect(value2.toString()).toBe(data.toString());

      lib.remove(key2);
      value1 = lib.get(key1);
      expect(mockStorage.storage[key1]).toBeUndefined();
      expect(Array.isArray(value1)).toBe(false);

      value2 = lib.get(key2);
      expect(mockStorage.storage[key2]).toBeUndefined();
      expect(Array.isArray(value2)).toBe(false);
    });
  });
});
