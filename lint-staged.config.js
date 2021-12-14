module.exports = {
    'package.json': ['npx prettier -w  package.json', 'git add'],
    '*.{tsx,js,ts,jsx}': [
        'npm run lint:fix',
        'npx prettier -w "src/**/*.(tsx|js|ts|jsx)"',
        'git add',
    ],
    '*.{less,scss,css}': [
        'npm run lint:style',
        'npx prettier -w "src/**/*.(less|scss|css)"',
        'git add',
    ],
    // '*.md': ['npm run markdownlint', 'npm run prettier'],
};
