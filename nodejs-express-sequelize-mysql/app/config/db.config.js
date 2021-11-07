module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Vincent@1996103123",
    DB: "tutorials",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}