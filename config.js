const config = {
    port: process.env.PORT || 8080,
    db: process.env.DB_URL || 'mongodb://localhost:27017/node_test',
    test_port: 4242,
    test_db: 'mongodb://localhost:27017/node_test_test'
}
module.exports = config;