module.exports = {
    // extends: ['@commitlint/config-conventional'],
    formatter: '@commitlint/format',
    rules: {
        'type-enum': [
            2,
            'always',
            ['upd', 'feat', 'fix', 'refactor', 'docs', 'chore', 'style', 'revert', 'build', 'perf'],
        ],
        'type-case': [0],
        'type-empty': [0],
        'scope-empty': [0],
        'scope-case': [0],
        'subject-full-stop': [0, 'never'],
        'subject-case': [0, 'never'],
        'header-max-length': [2, 'always', 72],
    },
};
