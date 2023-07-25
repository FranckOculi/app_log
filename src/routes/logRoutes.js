import { getLog, postLog } from '../controllers/logController.js'

async function logRoutes(fastify) {
	fastify.route({
		method: 'POST',
		url: '/',
		handler: postLog,
	})

	fastify.route({
		method: 'GET',
		url: '/',
		handler: getLog,
	})
}

export default logRoutes
