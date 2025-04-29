// jest.config.js
const config = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src/tests'],
  transform: {
    "^.+\\.js$": "babel-jest"
  }
};

export default config