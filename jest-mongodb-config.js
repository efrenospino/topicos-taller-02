module.exports = {
    mongodbMemoryServerOptions: {
        instance: {
            dbName: 'jest' // Test database name
        },
        binary: {
            version: '4.2.8', // My mongodb version
            skipMD5: true
        },
        autoStart: false
    }
};