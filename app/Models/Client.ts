import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Telephone from 'App/Models/Telephone'

export default class Client extends BaseModel {
  @column({ isPrimary: true }) public id: string

  @column() public name: string
  @column() public email: string
  @column() public cpfCnpj: string
  @column({
    // serializeAs: 'birthDate',
    // serialize: (value: DateTime) => value ? value.toFormat('yyyy-MM-dd') : value,
  }) public birth_date: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Telephone)
  public telephones: HasMany<typeof Telephone>
}
