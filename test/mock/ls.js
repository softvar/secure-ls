// Storage Mock
const mockLS = {
  storageMock: function () {
    const storage = {};

    return {
      storage,
      setItem: (key, value) => {
        storage[key] = value || '';
      },
      getItem: (key) => {
        return storage[key] || null;
      },
      removeItem: (key) => {
        delete storage[key];
      },
    };
  },
};

module.exports = mockLS;
