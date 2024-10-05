exports.up = function(knex) {
    return knex.schema.createTable('authors_books', function (table) {
        table.increments('id').primary();
        table.integer('author_id').unsigned().notNullable();
        table.integer('book_id').unsigned().notNullable();

        table.foreign('author_id').references('id').inTable('authors').onDelete('CASCADE');
        table.foreign('book_id').references('id').inTable('books').onDelete('CASCADE');

        table.unique(['author_id', 'book_id']);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('authors_books');
};