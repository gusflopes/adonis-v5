import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Client from 'App/Models/Client'

export default class Telephone extends BaseModel {
  @column({ isPrimary: true }) public id: string

  @column() public clientId: string
  @column() public ddd: string
  @column() public number: string
  @column() public primary: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>
}
