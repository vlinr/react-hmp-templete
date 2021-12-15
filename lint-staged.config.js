module.exports = {
    'package.json': ['npx prettier -w  package.json', 'git add'],
    '*.{tsx,js,ts,jsx}': [
        'npx prettier -w "src/**/*.(tsx|js|ts|jsx)"',
        'npm run lint:fix',
        'git add',
    ],
    '*.{less,scss,css}': [
        'npx prettier -w "src/**/*.(less|scss|css)"',
        'npm run lint:style',
        'git add',
    ],
    // '*.md': ['npm run markdownlint', 'npm run prettier'],
};
