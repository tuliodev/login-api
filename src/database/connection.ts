import knex from 'knex'

const connection = knex({
    client: 'pg',
    version: '7.2',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: '123',
        database: 'postgres'
    }
})

export default connection 