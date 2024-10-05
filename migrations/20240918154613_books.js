exports.up = function(knex) {
    return knex.schema.createTable('books', function (table) {
        table.increments('id').primary()
        table.string('name', 256).notNullable()
        table.date('publish_date').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('books')
};
