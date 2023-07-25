import knex from 'knex'
import knexConfiguration from '../../knexfile.js'
import Database from 'better-sqlite3'

export const database = new Database(
	knexConfiguration.development.connection.filename
)
export const databaseMigration = knex(knexConfiguration.development)
