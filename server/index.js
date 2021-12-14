const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config/key");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./model/user");
const { auth } = require("./model/middleware/auth");
const port = 5000;

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected!");
  })
  .catch((err) => {
    console.log(err);
  });

//데이터 타입을 분석하는 역할
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//회원가입
app.post("/api/users/register", (req, res) => {
  //회원가입에 필요한 정보들을 client에서 가져오면
  //데이터베이스에 전송
  const user = new User(req.body);
  user.save((err, userData) => {
    console.log(err);
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      registerSuccess: true,
    });
  });
});
//로그인 기능
app.post("/api/users/login", (req, res) => {
  //요청된 이메일을 디비에 있는지 확인
  console.log(req.body);
  User.findOne({ email: req.body.email }, (err, user) => {
    console.log(err);
    console.log(user);
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    //있다면 비밀번호 같은지 확인
    user.comparePassword(req.body.password, user.password, (err, isMatch) => {
      if (!isMatch) return res.json({ loginSucess: false, message: "비밀번호 오류" });

      //비밀번호가 맞다면 유저의 토큰을 생성
      user.generateToken(user, (err, user) => {
        if (err) return res.status(400).send(err);
        //토큰을 저장한다. 쿠키, 로컬스토리지, 세션 등등
        res.cookie("x_auth", user.token).status(200).json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});
//auth
app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});
//로그아웃(auth를 넣는 이유는 로그인된 상태에서 진행하는 것이기 떄문)
app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});
app.listen(port, () => console.log(`Example app listening on port ${port}`));
