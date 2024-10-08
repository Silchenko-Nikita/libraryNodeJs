exports.up = function(knex) {
    return knex.schema.createTable('employees', function (table) {
        table.increments('id').primary()
        table.string('first_name', 32).notNullable()
        table.string('last_name', 32).notNullable()
        table.date('birthdate').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('employees')
};
