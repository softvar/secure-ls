// Storage Mock
let mockLS = {
  storage: {}
};

mockLS.storageMock = function () {
  return {
    setItem: (key, value) => {
      this.storage[key] = value || '';
    },
    getItem: (key) => {
      return this.storage[key] || null;
    },
    removeItem: (key) => {
      delete this.storage[key];
    },
    get length() {
      return Object.keys(this.storage).length;
    },
    key: (i) => {
      let keys = Object.keys(this.storage);

      return keys[i] || null;
    }
  };
};
module.exports = mockLS;
