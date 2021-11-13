const express = require("express")
const fs = require("fs")
const hpp = require("hpp")
const cors = require("cors")
const helmet = require("helmet")
const https = require("https")
const http = require("http")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")

const { env } = require("../config/config")
const { NotFoundHandler } = require("./lib/middlewares/not-found")
const { errorHandlerMiddleware } = require("./lib/middlewares/error-handler")

const userRoute = require("./services/user/user.route")
const channelRoute = require("./services/channel/channel.route")
const directRoute = require("./services/direct/direct.route")
const firendRoute = require("./services/friend/friend.route")
const mentionRoute = require("./services/mention/mention.route")
const serverRoute = require("./services/server/server.route")

class Server {
	constructor(config) {
		this.config = config
		this.app = express()
		this.setMiddleware()
		this.setRoute()
		this.setErrorHandler()
	}

	setMiddleware() {
		//* disable "x-powered-by" header
		this.app.disable("x-powered-by")

		if (env === "prod") {
			//* logger middleware
			this.app.use(morgan("combined"))

			//* security middleware
			this.app.use(hpp())
			this.app.use(helmet())
			this.app.use(cors({ origin: "site-url", credentials: true }))
		} else {
			this.app.use(morgan("dev"))
			this.app.use(cors({ origin: true, credentials: true }))
		}

		//* json middleware, urlencoded
		this.app.use(express.json())
		this.app.use(express.urlencoded({ extended: true }))

		//* cookie-parser
		this.app.use(cookieParser(this.config.cookieParser))
	}

	setRoute() {
		//* server landing page
		this.app.get("/", (req, res) => {
			res.status(200).json({ message: "hello world!!" })
		})

		this.app.use(userRoute)
		this.app.use(channelRoute)
		this.app.use(directRoute)
		this.app.use(firendRoute)
		this.app.use(mentionRoute)
		this.app.use(serverRoute)
	}

	setErrorHandler() {
		//* 404 middleware
		this.app.use(NotFoundHandler)

		//* 500 middleware
		this.app.use(errorHandlerMiddleware)
	}
}

function createServer(config) {
	const app = new Server(config).app
	if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
		const privateKey = fs.readFileSync("./key.pem", "utf8")
		const certificate = fs.readFileSync("./cert.pem", "utf8")
		const credentials = { key: privateKey, cert: certificate }

		return https.createServer(credentials, app)
	}
	return http.createServer(app)
}

module.exports = { createServer }
