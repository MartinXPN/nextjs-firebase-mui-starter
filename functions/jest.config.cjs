/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    testTimeout: 20000,     // Firebase connection can take long to be established
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
    transform: {}
};
