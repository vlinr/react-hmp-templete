module.exports = {
    'test': {
        '/api': {
            target: 'https://www.baidu.com/',
            headers: {
                name: 'test'
            }
        },
    },
    'release': {
        '/api': {
            target: 'https://www.baidu.com/test/',
            headers: {
                name: 'release'
            }
        }
    },
    '/api': {
        target: 'https://www.baidu.com/test/',
        headers: {
            name: 'default'
        }
    }
}