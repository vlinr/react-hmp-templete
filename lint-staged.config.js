module.exports = {
    'package.json': ['npx prettier -w  package.json'],
    '*.tsx,*.js,*.ts,*.jsx': ['npm run lint:fix', 'npx prettier -w "src/**/*.(tsx|js|ts|jsx)"'],
    '*.css,*.less,*.scss': ['npm run lint:style', 'npx prettier -w "src/**/*.(less|scss|css)"'],
    // '*.md': ['npm run markdownlint', 'npm run prettier'],
};
