const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//비밀번호를 암호할 때 필요한 것.
const saltRounds = 10;

const jwt = require("jsonwebtoken");
const { json } = require("express");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minglength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
  image: {
    type: String,
  },
});

//비밀번호가 수정될 때 암호화
userSchema.pre("save", function (next) {
  //비밀번호 암호화
  //비밀번호가 수정될 때만 암호화
  if (this.isModified("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});
//비밀번호 맞는지 비교
userSchema.methods.comparePassword = function (plainPassword, encodedPassword, callback) {
  //plainPassword 와 암호화된 비밀번호랑 같은지 확인
  bcrypt.compare(plainPassword, encodedPassword, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};
//토큰 생성
userSchema.methods.generateToken = function (user, callback) {
  //jsonwebtoken을 사용해서 토큰생성
  var token = jwt.sign(user._id.toHexString(), "secretToken");
  //user domain의 token컬럼에 token저장
  user.token = token;
  //user domain 디비에 저장
  user.save((err, user) => {
    if (err) return callback(err);
    callback(null, user);
  });
};
//토큰으로 유저 조회
//statics로 메서드를 만든 것은 객체를 선언하고 바로 쓰기 위해서
userSchema.statics.findByToken = function (token, callback) {
  //토큰을 복호화
  jwt.verify(token, "secretToken", function (err, decodedUserId) {
    //유저아이디를 사용해서 유저 조회
    //클라이언트에서 가져온 토큰과 조회된 유저의 토큰이 일치하는지 확인
    User.findOne({ _id: decodedUserId, token: token }, function (err, user) {
      if (err) return callback(err);
      callback(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
