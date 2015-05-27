var path = require('path');

var settings = {
    path: path.normalize(path.join(__dirname, '..')),
    port: 8080,
    database: {
        protocol: "mysql",
        query: {
            pool: true
        },
        host: "127.0.0.1",
        database: "TimFin",
        user: "root",
        password: "password",
        connectionString: function () {
            return "mysql://" + this.user + ":" + this.password + "@" + this.host + "/" + this.database;
        }
    }
};

module.exports = settings;