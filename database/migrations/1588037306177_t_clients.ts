import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TClients extends BaseSchema {
  protected tableName = 'clients'

  public async up () {
    await this.db.rawQuery('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').exec()
    this.schema.createTable(this.tableName, async (table) => {
      table.uuid('id').unique().primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

      table.string('name').notNullable(),
      table.string('email'),
      table.string('cpf_cnpj'),
      table.string('birth_date'),

      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
