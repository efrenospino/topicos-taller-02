module.exports = {
    mongodbMemoryServerOptions: {
        instance: {
            dbName: 'jest' // Test database name
        },
        binary: {
            version: '4.2.8',
            skipMD5: true
        },
        autoStart: false
    }
};