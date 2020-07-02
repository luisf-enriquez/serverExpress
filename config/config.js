require('dotenv').config();
module.exports = {
	server: {
		url_base: process.env.url_base || 'https://dev-api.neumobot.com',
		puerto: process.env.port || 8080,
		corsOrigins: process.env.corsOrigins || '*'
	},
	parametros: {
		nombre: process.env.modulo || 'Prueba Server',
		databaseURL:
		process.env.databaseURL || 'https://ndcea-e0fa8.firebaseio.com/',
		entorno: process.env.entorno || 'local',

	},
	consultas: {
		puerto_server_android: '/controlador_datos',
		puerto_planes_de_trabajo: '/planes_de_trabajo',
		puerto_programas_marcaciones: '/programas_marcaciones',
		puerto_agendamiento: '/agendamiento',
		puerto_generacion_textos: '/generacion_textos',
	},
	firebase: {
		type: process.env.type || 'service_account',
		project_id: process.env.project_id || 'ndcea-e0fa8',
		private_key_id:
		process.env.private_key_id || 'e8dbe246d47e18fbb35f264167da3919d7798258',
		private_key: (
			process.env.private_key ||
			'-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCtTJJxqFhJ5sTC\nwOPOcf7iiV5pJD5l8q9xp2pokmpL7zC8pmD6DJrEBjN6ux5KYPntSTgx3swJezr9\n17Y/voJx98/il9+CE5N5MXdYaD6M8HNL9jTZLkop/a9XVDENUMQPYSdAj0sVPRYM\nPPNcL4sSq831KVPRO0MAaadJTh09NM0yYGX/dnji1/IoZoBbwBDwRskvQrICpX8D\n3nQzkHIgI3Kf7LRjZUXqpN8QhfA3YCqs8oOe8u44laDn45G6+mEskiCmoJxJvYyv\nURXvyvOHq9JWtOuAw8o8CphrIvaLqkYCGfBvdIKnvRI0tUssiTtAEEGot0KKGzOS\nRruEHCUpAgMBAAECggEAA1mRvR5ex92Xm8Ikb9cBRnoW9/D/lHM//pzuBXkgZ+Ox\nl/v0BPFdw9Xw2c7902c+KDQ8S1korYg9yC61cv7+QNtkSoIwC7DQLs1iJrSBJ7Kg\nL+2MRk8gQjaJVKanz2o/wqJYorqtCLXmaV8mPyJwzZrCP5pzEyjSRJLw7Q2pqrIE\nmlLWRk49KP3jNifoANN8PYRgNfK1qU29t1eHagwpKH64jIUTv2UXv7ZlRCit1XHN\nN35cOD6s3078BQxfc/v3LObomFbHXRmGjzwYM4+PCJo4HMqO3VUNzndCvyTEloCh\n5rq4yT1FsIAe48FGJK4wpW/GfHI4ksJFbgL0frj27wKBgQDg34lkqyR2q/KEY3Lh\nMMJzvwaI1xZ2wXvL1hfmZ2v894iPy7jjnYrKjQuak+Wf3+QgT7QmtuGcr/a2vZ//\ncXJiuePAOhS72uxyX+enN2A2YA+qfXDBkEJlBjsP0tV4MYv/roJ60escQOCSWMIr\nCefIsEXPG0oJpsaqiyK4nnrhzwKBgQDFSX0x7yS//LAbNiAl369cy9FU23j/zpqf\ny9Gmb4IDHv8+L+uvzlbdrrzfEOVKn/hAqeq6AocKEYY6fBgF8FR3HZ9sZc1gaCur\nUP9SBwpUCo+EGHLhPztHmgcybX4l0hMlambSnPPPDp//xDTBGaNeXKWmrXtL4zF4\nXdsPQVkfhwKBgQC5KPbNkGoO2Rhw0B5ItEh43AL6a/iQQlK4DYpSajgt7HhixsFv\nkko07Bxw5HS/xq/ltxtEgXOV/AHuiIcU44nnJt8Uaf6mi+YDa1qogl1TiJd9r5pH\nl4xD+PRq3BRvyoRXPI8tqGmqMvV3K2R94cMbqaFhnjvBZLTSuowVblEKWwKBgQC8\njqFukT8Rk4QJbfDJ4gFr8o1OyjjaXO+h3J6ysQ6UxxJysEBVliOl2rU/iZlseno9\n62ihgXrpX5hn22TmgC1qb1CIvL/O7aEXKuHr1zjC3BkQyoE50UJqC8fnJYkUwrRz\n5T8C+ul3M2YugKtfB48ByBC2vkYCYNFOVn3hFbcFjwKBgQCDl1z7/Pf4cV3Ir/Ym\n8T8hm+a31JmYn1grHy0wu4He+MDT7+3vqhID7MJ5EUf3YBTLtM6VBJ3hskLFxvjI\n9gMMMZK0HHJNzFt3i+uE4NAwzXH6pZOuI1T8YhmfEffO7chCrzvPj/6mA3+xZo3n\nC02fazUYUPJgFrm1kT//m8U0TQ==\n-----END PRIVATE KEY-----\n'
		).replace(/\\n/g, '\n'),
		client_email:
			process.env.client_email ||
			'firebase-adminsdk-88zpf@ndcea-e0fa8.iam.gserviceaccount.com',
		client_id: process.env.client_id || '100739756422866997468',
		auth_uri:
			process.env.auth_uri || 'https://accounts.google.com/o/oauth2/auth',
		token_uri: process.env.token_uri || 'https://oauth2.googleapis.com/token',
		auth_provider_x509_cert_url:
			process.env.auth_provider_x509_cert_url ||
			'https://www.googleapis.com/oauth2/v1/certs',
		client_x509_cert_url:
			process.env.client_x509_cert_url ||
			'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-88zpf%40ndcea-e0fa8.iam.gserviceaccount.com'
	},
	storage: {
		bucket: process.env.bucketDocumentos || 'archivos-test',
	},
};
