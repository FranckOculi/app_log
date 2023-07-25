import { database } from '../config/connection.js'

class LogRepository {
	table = 'logs'

	createLog = async function Promise(data) {
		try {
			const stmt_insert = database.prepare(
				`INSERT INTO ${this.table} (email, domain, type, message, stack, createdAt) VALUES(@email, @domain, @type, @message, @stack, @createdAt)`
			)

			const response_insert = stmt_insert.run({
				email: data.email,
				domain: data.domain,
				type: data.type,
				message: data.message,
				stack: data.stack,
				createdAt: data.createdAt,
			})

			const response_data = this.findById(response_insert.lastInsertRowid)

			return response_data
		} catch (err) {
			throw new Error(err)
		}
	}

	getLogs = async function Promise(query, pagination) {
		try {
			const per_page = pagination.per_page || 25
			const page = pagination.current_page || 1

			if (page < 1) page = 1
			const offset = (page - 1) * per_page

			let conditions = []
			const addCondition = (key, value) => {
				if (value) {
					if (conditions.length === 0)
						conditions.push(`WHERE ${key} LIKE @${key}`)
					else conditions.push(` AND ${key} LIKE @${key}`)
				}
			}

			const params = Object.entries(query)
			params.forEach(([key, value]) => addCondition(key, value))

			const data_stmt = database.prepare(
				`SELECT email, domain, type, message, stack, createdAt FROM ${
					this.table
				} ${conditions.join(
					''
				)} ORDER BY createdAt DESC LIMIT ${per_page} OFFSET ${offset}`
			)

			const count_stmt = database.prepare(
				`SELECT COUNT(*) count FROM ${this.table}`
			)

			const total = count_stmt.get()
			const data = data_stmt.all({
				email: `%${query.email}%`,
				domain: `%${query.domain}%`,
			})

			const response = {
				pagination: {
					total: total.count,
					per_page,
					last_page: Math.ceil(total.count / per_page),
					page,
				},
				data,
			}

			return response
		} catch (err) {
			throw new Error(err)
		}
	}

	findById = async function Promise(id) {
		try {
			const stmt = database.prepare(
				`SELECT id, email, domain, type, message, stack, createdAt FROM ${this.table} WHERE id = ?`
			)

			const response = stmt.get(id)
			return response
		} catch (err) {
			throw new Error(err)
		}
	}
}

export default new LogRepository()
