const fs = require('fs');
const path = require('path');
(() => {
    let result = fs.existsSync(path.join(__dirname, '.husky'));
    if (!result) {
        fs.mkdir('.husky', (err) => {
            if (!err) {
                const exec = require('child_process').exec;
                const husky =
                    "npx husky add .husky/commit-msg 'npx commitlint --edit $1' && npx husky add .husky/pre-commit 'npx lint-staged' && npx husky add .husky/pre-push 'npx standard-version --preset gitmoji-config'";
                const cmd = `npx husky install && ${husky}`;
                exec(cmd, (err, stdout) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(`${stdout}`);
                    }
                });
            }
        });
    }
})();
