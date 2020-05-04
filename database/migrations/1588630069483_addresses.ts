import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Addresses extends BaseSchema {
  protected tableName = 'addresses'

  public async up () {
    await this.db.rawQuery('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').exec()
    this.schema.createTable(this.tableName, async (table) => {
      table.uuid('id').unique().primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.uuid('client_id').notNullable()
      table.string('zipcode').notNullable()
      table.string('street').notNullable()
      table.string('number').notNullable()
      table.string('street2').nullable()
      table.string('neighborhood').notNullable()
      table.string('city').notNullable()
      table.string('state', 2).notNullable()
      table.string('ibge_code')

      table.foreign('client_id').references('id').inTable('clients').onDelete('cascade').onUpdate('cascade')

      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
