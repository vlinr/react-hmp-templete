module.exports = {
    test: [
        {
            context: ['/a', '/b'], // api
            target: 'https://www.test.com', // 域名
            headers: {
                // header配置
                name: 'default',
            },
            cors: true,
            timeout: 5000,
        },
        {
            context: '/api', // 可以不为数组，就是单个
            target: 'https://www.test1.com',
            headers: {
                name: 'default',
            },
        },
    ],
    release: [
        {
            context: ['/a', '/b'],
            target: 'https://www.test.com',
            headers: {
                name: 'default',
            },
        },
        {
            context: '/api',
            target: 'https://www.test1.com',
            headers: {
                name: 'default',
            },
        },
    ],
    '': [
        {
            context: ['/a', '/b'],
            target: 'https://www.test.com',
            headers: {
                name: 'default',
            },
        },
        {
            context: '/api',
            target: 'http://www.test.com/abc/efg',
            headers: {
                name: 'default',
            },
        },
    ],
};
