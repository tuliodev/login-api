import Knex from 'knex'

export async function up (knex: Knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('user', 30).notNullable()
        table.string('email', 30).notNullable()
        table.string('password').notNullable()
        table.string('passwordConfirmation').notNullable()

        table.timestamps(true, true)
    })
}

export async function down (knex: Knex) {
    return knex.schema.dropTable('users')
}