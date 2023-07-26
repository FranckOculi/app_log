import fastify from 'fastify'
import cors from '@fastify/cors'
import fastifyView from '@fastify/view'
import fastifyStatic from '@fastify/static'
import ejs from 'ejs'
import logRoutes from './routes/logRoutes.js'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const app = fastify({
	logger: true,
})
const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))

// cors
app.register(cors, {
	origin: true,
	// origin: configuration.app_url,
	// allowedHeaders: [
	//   'Origin',
	//   'X-Requested-With',
	//   'Accept',
	//   'Content-Type',
	//   'Authorization',
	// ],
	// methods: ['GET', 'PUT', 'POST', 'DELETE'],
})

// templating
app.register(fastifyView, {
	engine: {
		ejs,
	},
})

// public
app.register(fastifyStatic, {
	root: join(rootDir, 'public'),
})

// Routes managers
app.register(logRoutes, { prefix: '/log' })
app.setNotFoundHandler((_, res) => res.view('src/views/notFound.ejs'))

export default app
