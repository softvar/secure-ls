import SecureLS from '../src/index';

let lib;

describe('Standard SecureLS API Tests ->', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    lib = new SecureLS();
  });

  afterEach(() => {
    console.warn.mockRestore();
    lib.removeAll();
  });

  describe('secure-ls: set method', () => {
    it('should warn if no key is provided', () => {
      expect(console.warn).not.toHaveBeenCalled();
      lib.set();
      expect(console.warn).toHaveBeenCalled();
    });

    it('should add key to list of stored keys', () => {
      const spyProcessData = jest.spyOn(lib, 'processData');
      const spySetData = jest.spyOn(lib, 'setDataToLocalStorage');

      lib.set('test123');

      expect(lib.allKeys).toBeDefined();
      expect(Array.isArray(lib.allKeys)).toBe(true);
      expect(lib.allKeys.length).toBe(1);

      expect(spyProcessData).toHaveBeenCalled();
      expect(spySetData).toHaveBeenCalled();
    });
  });

  describe('secure-ls: get method', () => {
    it('should warn if no key is provided', () => {
      expect(console.warn).not.toHaveBeenCalled();
      lib.get();
      expect(console.warn).toHaveBeenCalled();
    });

    it('should add key to list of stored keys', () => {
      const spyGetData = jest.spyOn(lib, 'getDataFromLocalStorage');

      lib.get('test123');
      expect(spyGetData).toHaveBeenCalled();
    });
  });

  describe('secure-ls: getAllKeys method', () => {
    it('should return [] if nothing set', () => {
      const keys = lib.getAllKeys();
      expect(Array.isArray(keys)).toBe(true);
      expect(keys.length).toBe(0);
    });

    it('should return keys when there are', () => {
      let keys = lib.getAllKeys();
      expect(keys.length).toBe(0);

      lib.set('key-1');

      keys = lib.getAllKeys();
      expect(Array.isArray(keys)).toBe(true);
      expect(keys.length).toBe(1);

      lib.set('key-2');

      keys = lib.getAllKeys();
      expect(Array.isArray(keys)).toBe(true);
      expect(keys.length).toBe(2);
    });
  });

  describe('secure-ls: remove method', () => {
    it('should warn if no key is provided', () => {
      expect(console.warn).not.toHaveBeenCalled();
      lib.remove();
      expect(console.warn).toHaveBeenCalled();
    });

    it('should warn if key is metakey and keys are there', () => {
      lib.set('key-1');
      lib.remove('_secure__ls__metadata');
      expect(console.warn).toHaveBeenCalled();
    });

    it('should not warn if key is metadata and no other keys present', () => {
      lib.remove('_secure__ls__metadata');
      expect(console.warn).not.toHaveBeenCalled();
    });

    it('should decrement counter', () => {
      lib.set('key-1', {});
      lib.set('key-2', []);
      expect(lib.allKeys.length).toBe(2);

      lib.remove();
      expect(console.warn).toHaveBeenCalled();

      lib.remove('key-2');
      expect(lib.allKeys.length).toBe(1);

      lib.remove('key-2');
      expect(lib.allKeys.length).toBe(1);

      lib.remove('key-1');
      expect(lib.allKeys.length).toBe(0);
    });

    it('should update the list of stored keys', () => {
      const spySetMetaData = jest.spyOn(lib, 'setMetaData');
      lib.set('key-1');
      lib.remove('key-1');
      expect(spySetMetaData).toHaveBeenCalled();
    });
  });

  describe('secure-ls: removeAll method', () => {
    it('verify allKeys length on removal', () => {
      const spyGetAllKeys = jest.spyOn(lib, 'getAllKeys');
      lib.set('key-1', { data: 'data' });
      lib.set('key-2', [1, 2, 3]);

      expect(lib.allKeys.length).toBe(2);

      lib.removeAll();

      expect(spyGetAllKeys).toHaveBeenCalled();
      expect(lib.allKeys.length).toBe(0);
    });
  });

  describe('secure-ls: clear method', () => {
    it('verify allKeys length on removal', () => {
      lib.set('key-1', { data: 'data' });
      lib.set('key-2', [1, 2, 3]);

      expect(lib.allKeys.length).toBe(2);

      lib.clear();
      expect(lib.allKeys.length).toBe(0);
    });
  });
});
