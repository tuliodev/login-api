import path from 'path'

module.exports = {
    client: 'pg',
    version: '7.2',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: '123',
        database: 'postgres'
    },

    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    }
}