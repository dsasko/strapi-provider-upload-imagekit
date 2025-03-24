module.exports = {
    'extends': 'eslint:recommended',
    'env': {
        'node': true,
        'es6': true,
    },
    'parserOptions': {
        'ecmaVersion': 'latest',
    },
    'rules': {
        'indent': ['error', 4],
        'quotes': ['error', 'single'],
        'comma-dangle': ['error', {
            'arrays': 'always-multiline',
            'objects': 'always-multiline',
            'imports': 'always-multiline',
            'exports': 'always-multiline',
            'functions': 'always-multiline',
        }],
        'no-unused-vars': [
            'error',
            {
                'argsIgnorePattern': '^_',
                'varsIgnorePattern': '^_',
                'caughtErrorsIgnorePattern': '^_',
            },
        ],
    },
};
