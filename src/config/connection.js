import knex from 'knex'
import knexConfiguration from '../../knexfile.js'
import dotenv from 'dotenv'

dotenv.config()

const environment = process.env.NODE_ENV || 'development'

export const database = knex(knexConfiguration[environment])
