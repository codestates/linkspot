const { NotFoundError } = require("../errors")

const NotFoundHandler = (req, res, next) => {
	throw new NotFoundError("페이지를 찾을 수 없습니다.")
}

module.exports = NotFoundHandler
