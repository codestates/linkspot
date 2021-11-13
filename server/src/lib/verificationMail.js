const mailgun = require("mailgun-js")
const fs = require("fs")
const Handlebars = require("handlebars")
const path = require("path")

const { clientUrl, apiKey, domain } = require("../../config/mailgun.config")

const mg = mailgun({ apiKey, domain })
const source = fs.readFileSync(path.join(__dirname, "../../views/main.handlebars"), "utf8")
const template = Handlebars.compile(source)

const sendVerificationEmail = (nick, email, token) => {
	const mail = {
		from: "no-reply@linkspot.site",
		to: email,
		subject: `LinkSpot용 이메일 주소 인증`,
		html: template({ user_nick: nick, url: `${clientUrl}${token}` }),
	}

	mg.messages().send(mail)
}

module.exports = sendVerificationEmail
