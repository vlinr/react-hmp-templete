const login = {
    'POST /api/login': (request, response) => {
        let { password, username } = request.body;
        if (!password || !username)
            for (const key in request.body) {
                const userInfo = JSON.parse(key);
                password = userInfo.password;
                username = userInfo.username;
            }
        if (password === 'admin' && username === 'admin') {
            return response.json({
                status: 'ok',
                code: 0,
                token: "ANJKDS-DSALKKM-DSAKLJ-DSABJ-DSANJK-DSAKJKL",
                msg: '登录成功',
                data: {
                    id: 1,
                    name: 'Administrator',
                    sex: 1
                }
            });
        } else {
            // return response.status(403).json({
            //   status: 'error',
            //   msg:'账号密码错误',
            //   data:{

            //   },
            //   code: 403
            // });
            return response.json({
                status: 'error',
                msg: '账号密码错误',
                data: {

                },
                code: 403
            });
        }
    }
}
module.exports = login;