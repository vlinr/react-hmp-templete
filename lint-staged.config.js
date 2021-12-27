module.exports = {
    'package.json': ['npx prettier -w  package.json', 'git add'],
    '*.{tsx,js,ts,jsx}': ['npm run lint:fix', 'npm run prettier', 'git add'],
    '*.{less,css}': ['npm run lint:style', 'npm run prettier', 'git add'],
    // '*': ['npx standard-version --preset gitmoji-config'],
    // '*.md': ['npm run markdownlint', 'npm run prettier'],
};
