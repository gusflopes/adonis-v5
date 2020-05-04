import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Telephone from 'App/Models/Telephone'
import Address from './Address'

export default class Client extends BaseModel {
  @column({ isPrimary: true }) public id: string

  @column() public name: string
  @column() public email: string
  @column() public cpfCnpj: string
  @column.date({
    // serializeAs: 'birth_date',
    // *** Remember to change both Model and Validator if using different format ***
    serialize: (value: DateTime) => value ? value.toFormat('yyyy-MM-dd') : value,
  }) public birthDate: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Telephone)
  public telephones: HasMany<typeof Telephone>

  @hasOne(() => Address)
  public address: HasOne<typeof Address>
}
