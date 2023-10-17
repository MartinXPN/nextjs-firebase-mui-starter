module.exports = {
    root: true,
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
            }
        }
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        }
    },
    ignorePatterns: [
        '/lib/**/*', // Ignore built files.
        '**/lib/**/*',
    ],
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
    },
};
