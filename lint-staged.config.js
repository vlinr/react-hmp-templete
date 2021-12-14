module.exports = {
    'package.json': ['npm run prettier'],
    '*.tsx,*.js,*.ts,*.jsx': ['npm run lint:fix', 'npm run prettier'],
    '*.css,*.less,*.scss': ['npm run stylelint', 'npm run prettier'],
    '*.md': ['npm run markdownlint', 'npm run prettier'],
  };