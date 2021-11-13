/*eslint-disable no-useless-escape*/
const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
const passwordRegex = /^[a-z0-9_]{8,15}$/
const nickRegex = /^[a-zA-Z]\w*$/
/*eslint-enable no-useless-escape*/

const emailValidator = (email) => emailRegex.test(email)
const passwordValidator = (password) => passwordRegex.test(password)
const nickValidator = (nick) => nickRegex.test(nick)
const validator = (email, password) => {
	if (!email || !password) {
		return { message: "유효하지 않은 body 데이터입니다." }
	}

	if (!emailValidator(email)) {
		return { message: "이메일 양식을 맞춰주세요." }
	}

	if (!passwordValidator(password)) {
		return { message: "비밀번호 양식을 맞춰주세요." }
	}

	return false
}

module.exports = {
	emailValidator,
	passwordValidator,
	nickValidator,
	validator,
}
