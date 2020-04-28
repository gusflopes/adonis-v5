import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Telephones extends BaseSchema {
  protected tableName = 'telephones'

  public async up () {
    await this.db.rawQuery('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').exec()
    this.schema.createTable(this.tableName, async (table) => {
      table.uuid('id').unique().primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.uuid('client_id').notNullable(),

      table.string('ddd').notNullable(),
      table.string('number'),
      table.boolean('primary'),

      table.foreign('client_id').references('id').inTable('clients').onDelete('cascade').onUpdate('cascade'),

      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
