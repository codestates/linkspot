const { User } = require("../models");

const getRandomInt = (max) => {
	return Math.floor(Math.random() * max);
};

const userNumberGenerator = async (username) => {
	// 수정사항: 테스트 용으로 중복 아이디 갯수 제한을 조절하는 코드 추가
	const max = 9999;
	const user = await User.find({ username: username });
	const excpetList = user.map((el) => el.userNumber).sort((a, b) => b - a);
	const input = max - excpetList.length;
	if (input === 0) return false;

	const num = getRandomInt(input);
	const list = Array(max)
		.fill(1)
		.map((el, idx) => el + idx);
	excpetList.forEach((el) => list.splice(el - 1, 1));
	return list[num];
};

module.exports = { userNumberGenerator };
