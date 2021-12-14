const { User } = require("../user");

let auth = function (req, res, next) {
  //인증 처리를 하는 곳

  //클라이언트 쿠키에서 토큰 가져오기
  let token = req.cookies.x_auth;

  //토큰을 복호화한 후 유저 조회
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    //토큰이 없으면 권한이 없는 것.
    if (!user) return res.json({ isAuth: false, error: true });
    req.token = token;
    req.user = user;

    next();
  });
  //유저가 있으면 인증 완료

  //없으면 인증 실패
};
module.exports = { auth };
