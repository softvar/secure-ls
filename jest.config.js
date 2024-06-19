module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  // This is for handling extensions, if needed
  moduleFileExtensions: ['js', 'jsx', 'json', 'node', 'mjs'],
  // This might be required if you want to ignore some files
  transformIgnorePatterns: ['/node_modules/'],
  testEnvironment: 'jest-environment-jsdom',
};
