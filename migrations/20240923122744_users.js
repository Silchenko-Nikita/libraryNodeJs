exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id').primary()
        table.string('nickname', 32).notNullable().unique()
        table.string('password').notNullable()
        table.string('first_name', 32)
        table.string('last_name', 32)
        table.date('birthdate')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};