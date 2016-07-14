import chai from 'chai';
import SecureLS from '../dist/secure-ls.js';
import mockLS from './mock/ls';

const expect = chai.expect;
chai.expect();

describe('LocalSorage API Tests ->', () => {
  let lib;

  beforeEach(function() {
    let mockStorage = mockLS.storageMock();

    lib = new SecureLS();
    lib.ls = mockStorage;
  });

  afterEach(function() {
    lib.removeAll();
  });

  describe('setItem method', () => {
    it('should set the value on key', () => {
      let data = [1, 2, 3];
      let key = 'key-1';

      lib.set(key, data);

      expect(mockLS.storage[key]).to.exist;
      expect(mockLS.storage[key]).to.be.a('string');
    });
  });

  describe('getItem method', () => {
    it('should return the value stored', () => {
      let value;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib.set(key, data);

      expect(mockLS.storage[key]).to.exist;
      expect(mockLS.storage[key]).to.be.a('string');

      value = lib.get(key);

      expect(value).to.be.an('array');
      expect(value.length).to.equal(3);
      expect(value.toString()).to.equal(data.toString());
    });
  });

  describe('removeItem method', () => {
    it('should remove the key-value, if stored', () => {
      let value1, value2;
      let data = [1, 2, 3];
      let key1 = 'key-1', key2 = 'key-2';

      lib.set(key1, data);
      lib.set(key2, data);

      lib.remove(key1);
      value1 = lib.get(key1);
      expect(mockLS.storage[key1]).to.not.exist;
      expect(value1).to.not.be.an('array');

      value2 = lib.get(key2);
      expect(mockLS.storage[key2]).to.exist;
      expect(value2).to.be.an('array');

      lib.remove(key2);
      value1 = lib.get(key1);
      expect(mockLS.storage[key1]).to.not.exist;
      expect(value1).to.not.be.an('array');

      value2 = lib.get(key2);
      expect(mockLS.storage[key2]).to.not.exist;
      expect(value2).to.not.be.an('array');
    });
  });

  describe('setItem, getItem and removeItem in one go', () => {
    it('should set, get and remove', () => {
      let value1, value2;
      let data = [1, 2, 3];
      let key1 = 'key-1', key2 = 'key-2';

      lib.set(key1, data);
      expect(mockLS.storage[key1]).to.exist;
      expect(mockLS.storage[key1]).to.be.a('string');

      lib.set(key2, data);
      expect(mockLS.storage[key2]).to.exist;
      expect(mockLS.storage[key2]).to.be.a('string');

      value1 = lib.get(key1);
      expect(value1).to.be.an('array');
      expect(value1.length).to.equal(3);
      expect(value1.toString()).to.equal(data.toString());

      value2 = lib.get(key2);
      expect(value2).to.be.an('array');
      expect(value2.length).to.equal(3);
      expect(value2.toString()).to.equal(data.toString());

      lib.remove(key1);
      value1 = lib.get(key1);
      expect(mockLS.storage[key1]).to.not.exist;
      expect(value1).to.not.be.an('array');

      value2 = lib.get(key2);
      expect(value2).to.be.an('array');
      expect(value2.length).to.equal(3);
      expect(value2.toString()).to.equal(data.toString());

      lib.remove(key2);
      value1 = lib.get(key1);
      expect(mockLS.storage[key1]).to.not.exist;
      expect(value1).to.not.be.an('array');

      value2 = lib.get(key2);
      expect(mockLS.storage[key2]).to.not.exist;
      expect(value2).to.not.be.an('array');
    });
  });
});
