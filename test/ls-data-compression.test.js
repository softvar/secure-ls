import SecureLS from '../src/index';
import mockLS from './mock/ls';

let lib;

describe('Data Compression Tests', () => {
  let mockStorage = mockLS.storageMock();

  beforeEach(() => {
    mockStorage = mockLS.storageMock();
    lib = new SecureLS();
    lib.storage = mockStorage;
  });

  afterEach(() => {
    lib.removeAll();
    jest.restoreAllMocks(); // Clear all mocks after each test
  });

  describe('no data compression but Base64 encoded', () => {
    test('should not compress data before storing to localStorage', () => {
      let valueStored;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib = new SecureLS({ isCompression: false });
      lib.storage = mockStorage;
      lib.set(key, data);

      // corresponding to [1, 2, 3] => WzEsMiwzXQ== i.e. Base64 encoded
      valueStored = lib.LZString.compressToUTF16(lib.Base64.encode(JSON.stringify(data)));

      expect(mockStorage.storage[key]).toBeDefined();
      expect(typeof mockStorage.storage[key]).toBe('string');
      // important
      expect(mockStorage.storage[key]).not.toEqual(valueStored);
    });
  });

  describe('no data compression and no encoding', () => {
    test('should not compress data before storing to localStorage', () => {
      let valueStored;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib = new SecureLS({ encodingType: '', isCompression: false });
      lib.storage = mockStorage;
      lib.set(key, data);

      // corresponding to [1, 2, 3] => "[1, 2, 3]"
      valueStored = JSON.stringify(data);

      expect(mockStorage.storage[key]).toBeDefined();
      expect(typeof mockStorage.storage[key]).toBe('string');
      // important
      expect(mockStorage.storage[key]).toEqual(valueStored);
    });
  });

  describe('data compression', () => {
    test('should compress data before storing to localStorage', () => {
      let valueStored;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib.set(key, data);

      // corresponding to [1, 2, 3] => 㪂ೠ눉惮 脔ொꀀ
      valueStored = lib.LZString.compressToUTF16(lib.Base64.encode(JSON.stringify(data)));

      expect(mockStorage.storage[key]).toBeDefined();
      expect(typeof mockStorage.storage[key]).toBe('string');
      // important
      expect(mockStorage.storage[key]).toEqual(valueStored);
    });

    test('should compress data before storing to localStorage', () => {
      let valueStored;
      let data = {
        username: 'softvar',
        contact: 1234567890,
        hobbies: ['x', 'y', 'z'],
      };
      let key = 'key-1';

      lib.set(key, data);

      // corresponding to [1, 2, 3] => ⦄ࣀ옄쁪‑腬ؠᜁ栙䂒ͥ쀻äʹ좀鑠ፀ൜Ұـ愰ʴ䘁堀斠ᵄ뽜鰃�ଠ՚䰀ι〈怜䀧ፚ저�舀郰Y馮ހ㎱्蠀
      valueStored = lib.LZString.compressToUTF16(lib.Base64.encode(JSON.stringify(data)));

      expect(mockStorage.storage[key]).toBeDefined();
      expect(typeof mockStorage.storage[key]).toBe('string');
      // important
      expect(mockStorage.storage[key]).toEqual(valueStored);
    });
  });
});
