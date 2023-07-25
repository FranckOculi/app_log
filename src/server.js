import App from './app.js'

// Run the server!
const start = async () => {
	try {
		await App.listen({ port: 4001 })
	} catch (err) {
		App.log.error(err)
		process.exit(1)
	}
}
start()
