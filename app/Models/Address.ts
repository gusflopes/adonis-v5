import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Client from 'App/Models/Client'

export default class Address extends BaseModel {
  @column({ isPrimary: true }) public id: string
  @column() public clientId: string

  @column() public zipcode: string
  @column() public street: string
  @column() public number: string
  @column({columnName: 'street2'}) public street2: string
  @column() public neighborhood: string
  @column() public city: string
  @column() public state: string
  @column() public ibgeCode: string | undefined

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Client, {foreignKey: 'clientId'})
  public client: BelongsTo<typeof Client>
}
