import knex, { type Knex } from 'knex'

let cachedConnection: Knex | undefined

export const getDB = (): Knex => {
  if (cachedConnection === undefined) {
    cachedConnection = knex({
      client: 'mysql',
      connection: {
        host: process.env.DB_HOST ?? 'localhost',
        port: parseInt(process.env.DB_PORT ?? '3306'),
        user: process.env.DB_USER ?? 'stamps',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_SCHEMA ?? 'stamps'
      }
    })
  }

  return cachedConnection
}
