import sinon from 'sinon';
import SecureLS from '../dist/secure-ls.js';

describe('root - LocalStorage Tests->', () => {
  let lib;

  beforeEach(() => {
    global.localStorage = {
      setItem: sinon.spy(),
      getItem: sinon.spy(),
      removeItem: sinon.spy(),
      clear: sinon.spy()
    };
    lib = new SecureLS();
  });

  describe('setItem method', () => {
    it('set should call setItem on localStorage', () => {
      const data = [1, 2, 3];
      const key = 'key-1';

      lib.set(key, data);
      sinon.assert.calledWith(global.localStorage.setItem, key);
    });
  });

  describe('getItem method', () => {
    it('get should call getItem on localStorage', () => {
      const key = 'key-1';

      lib.get(key);
      sinon.assert.calledWith(global.localStorage.getItem, key);
    });
  });

  describe('removeItem method', () => {
    it('remove should call removeItem on localStorage', () => {
      const key = 'key-1';

      lib.remove(key);
      sinon.assert.calledWith(global.localStorage.removeItem, key);
    });
  });

  describe('clear method', () => {
    it('clear should call clear on localStorage', () => {
      lib.clear();
      sinon.assert.calledWith(global.localStorage.clear);
    });
  });
});
