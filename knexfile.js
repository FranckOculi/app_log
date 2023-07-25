const databasePath = '.db.sqlite'

const config = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: databasePath,
		},
		useNullAsDefault: true,
		migrations: {
			directory: 'database/migrations',
		},
		seeds: {
			directory: 'database/seeds',
		},
	},
}

export default config
