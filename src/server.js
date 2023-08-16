import App from './app.js'

// Run the server!
const start = () => {
	const { SERVER_HOST, SERVER_PORT } = process.env

	try {
		App.listen({ host: SERVER_HOST, port: SERVER_PORT })
	} catch (err) {
		App.log.error(err)
		process.exit(1)
	}
}
start()
