// https://docs.expo.dev/guides/using-eslint/

// REACT
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactNative from 'eslint-plugin-react-native';

// EXPO
import expo from 'eslint-config-expo/flat.js';

// ESLINT
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

/** @type {import("eslint").FlatConfigItem[]} */
export default [
    ...expo,

    js.configs.recommended,

    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser,
            parserOptions: {
                ecmaFeatures: { jsx: true },
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            globals: {
                __DEV__: 'readonly',
                JSX: 'readonly',
                process: 'readonly',
                require: 'readonly',
                fetch: 'readonly',
                console: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
                NodeJS: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            react,
            'react-native': reactNative,
            'react-hooks': reactHooks
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx'],
            },
            'import/resolver': {
                typescript: {
                    project: './tsconfig.json',
                    alwaysTryTypes: true,
                },
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },
            },
        },
        rules: {
            'import/no-unresolved': 'error',
            'import/namespace': 'error',
            'import/no-duplicates': 'error',
            
            // ESLint base
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
            'comma-spacing': ['error', { before: false, after: true }],
            'key-spacing': ['error', { beforeColon: false, afterColon: true }],
            'keyword-spacing': ['error', { before: true, after: true }],
            'space-before-blocks': 'error',
            'space-infix-ops': 'error',
            'no-multiple-empty-lines': ['error', { max: 1 }],
            'no-trailing-spaces': 'error',
            'no-unused-vars': 'off',
            'object-curly-spacing': ['error', 'always'],
            'brace-style': ['error', 'stroustrup'],
            'eqeqeq': ['warn', 'always'],
            'eol-last': ['error', 'always'],

            // React
            'react/prop-types': 'off',

            // React Native
            'react-native/no-inline-styles': 'off',
            'react-native/split-platform-components': 'off',
            'react-native/sort-styles': 'off',
            'react-native/no-color-literals': 'off',
            'react-native/no-raw-text': 'off',

            // TypeScript
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-require-imports': 'warn',

            // Import sort items inside { ... }
            'sort-imports': [
                'warn',
                {
                    ignoreCase: true,
                    ignoreDeclarationSort: true, // let import/order handle sorting lines
                    memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
                }
            ]
        }
    }
];
