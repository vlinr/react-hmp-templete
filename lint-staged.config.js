module.exports = {
    'package.json': ['npx prettier -w  package.json', 'git add'],
    '*.{tsx,js,ts,jsx}': ['npm run prettier', 'npm run lint:fix', 'git add'],
    '*.{less,css}': ['npm run lint:style', 'git add'],
    // '*.md': ['npm run markdownlint', 'npm run prettier'],
};
