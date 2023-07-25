import logRepository from '../repositories/LogRepository.js'

export const createLogService = async ({ type, message, stack, email }) => {
	let error

	const newLog = {
		email,
		domain:
			email.substring(email.indexOf('@') + 1, email.lastIndexOf('.')) || '',
		type,
		message,
		stack,
		createdAt: Date.now(),
	}

	const log = await logRepository.createLog(newLog).catch(err => {
		error = { error: 'unable to create log', status: 500, data: null }
	})

	if (error) return error

	return { error: null, status: null, data: log }
}

export const getLogService = async (query, pagination) => {
	let error

	const logs = await logRepository.getLogs(query, pagination).catch(err => {
		error = {
			error: 'Erreur dans la recherche des logs',
			status: 500,
			data: [],
		}
	})

	if (error) return error

	if (!Array.isArray(logs.data)) return { error: null, status: null, data: [] }

	const newLogs = logs.data.map(e => {
		const date = e.createdAt
		let options = {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		}
		const newDate = new Date(date).toLocaleDateString('fr-FR', options)
		e.createdAt = newDate
		return e
	})

	return {
		error: null,
		status: null,
		data: { logs: newLogs, pagination: logs.pagination },
	}
}
