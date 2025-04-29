/** @type {import('jest').Config} */
const config = {
    setupFiles: ['./jest.setup.js'],
    verbose: true,
    moduleNameMapper: {
        '\\.css$': 'identity-obj-proxy',
    },
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    testEnvironment: 'jest-environment-jsdom',
    transformIgnorePatterns: ['/node_modules/'],

};

export default config
