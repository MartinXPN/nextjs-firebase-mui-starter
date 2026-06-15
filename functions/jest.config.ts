import type {JestConfigWithTsJest} from 'ts-jest';

const config: JestConfigWithTsJest = {
    testTimeout: 20000,     // Firebase connection can take long to be established
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
    transform: {},
};

export default config;
