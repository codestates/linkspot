const { NotFoundError } = require("../errors")

exports.NotFoundHandler = (req, res, next) => {
	throw new NotFoundError("페이지를 찾을 수 없습니다.")
}
