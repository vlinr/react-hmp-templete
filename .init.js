const fs = require('fs');
const path = require('path');
(()=>{
    let result = fs.existsSync(path.join(__dirname,'.husky'));
    if(!result){
        const exec = require('child_process').exec;
        const husky = "npx husky add .husky/commit-msg 'npx commitlint --edit $1' && npx husky add .husky/pre-commit 'npx lint-staged'";
        const cmd = `husky install && ${husky}`;
        exec(cmd,(err,stdout)=>{
            if(err){
                console.error(err);
            }else{
                console.log(`${stdout}`);
            }
        });
    }
})();