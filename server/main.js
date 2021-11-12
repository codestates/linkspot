const { Server } = require("socket.io")

const { createServer } = require("./src/linkspot")
const { config } = require("./config/config")
require("./db")

function main(config = {}) {
	const server = createServer(config)
	server.listen(config.port, () => {
		console.log(`Running at port ${config.port}`)
	})
}

//* start server
main(config)
