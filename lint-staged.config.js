module.exports = {
    'package.json': ['npx prettier --config .prettierrc --write package.json'],
    '*.tsx,*.js,*.ts,*.jsx': ['npm run lint:fix', 'npx prettier --config .prettierrc --write \"src/**/*.(tsx|js|ts|jsx)\"'],
    '*.css,*.less,*.scss': ['npm run stylelint', 'npx prettier --config .prettierrc --write \"src/**/*.(less|scss|css)\"'],
    // '*.md': ['npm run markdownlint', 'npm run prettier'],
  };