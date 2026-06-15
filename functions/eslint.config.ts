import {FlatCompat} from '@eslint/eslintrc';
import js from '@eslint/js';

const compat = new FlatCompat({
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        files: ['**/*.{js,cjs,mjs,ts,tsx}'],
    },
    {
        ignores: [
            '*.spec.ts',
            '*.test.ts',
            'world.js',
            'coverage/**',
            'test/**',
            'generators/**',
            'lib/**',
            '**/lib/**',
            'eslint.config.ts',
            'jest.config.ts',
            'tsdown.config.ts',
        ],
    },
    ...compat.config({
        env: {
            es6: true,
            node: true,
        },
        extends: [
            'eslint:recommended',
            'plugin:import/errors',
            'plugin:import/warnings',
            'plugin:import/typescript',
            'google',
            'plugin:@typescript-eslint/recommended',
            'plugin:react/recommended',
        ],
        settings: {
            'import/resolver': {
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },
            },
            'react': {
                version: 'detect',
            },
        },
        parser: '@typescript-eslint/parser',
        parserOptions: {
            project: 'tsconfig.json',
            sourceType: 'module',
            ecmaVersion: 'latest',
            ecmaFeatures: {
                jsx: true,
            },
        },
        plugins: [
            '@typescript-eslint',
            'import',
            'react',
        ],
        rules: {
            'brace-style': ['error', 'stroustrup'],
            'curly': ['error', 'multi', 'consistent'],
            'quotes': ['error', 'single'],
            'new-cap': ['error', {capIsNew: false}],    // for react-email components
            'import/no-unresolved': 0,
            'indent': ['error', 4],
            'max-len': ['error', 120, {ignoreComments: true}],
            'no-multi-spaces': ['error', {ignoreEOLComments: true}],
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            'valid-jsdoc': 'off',
            'require-jsdoc': 'off',
        },
        overrides: [{
            files: ['**/*.tsx'],
            rules: {
                'indent': 'off',
            },
        }],
    }),
];
