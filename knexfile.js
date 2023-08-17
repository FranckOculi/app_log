const config = {
	development: {
		client: process.env.DB_CLIENT_DEV,
		connection: {
			filename: process.env.DB_PATH_DEV,
		},
		useNullAsDefault: true,
		migrations: {
			directory: 'database/migrations',
		},
		seeds: {
			directory: 'database/seeds',
		},
	},
	production: {
		client: process.env.DB_CLIENT,
		connection: {
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
		},
		useNullAsDefault: true,
		migrations: {
			directory: 'database/migrations',
		},
	},
}

export default config
