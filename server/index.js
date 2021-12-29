const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config/key");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

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

//백엔드에서 요청 주소를 express가 제공하는 router로 관리
app.use("/api/users", require("./routes/users"));
app.use("/api/product", require("./routes/product"));

app.listen(port, () => console.log(`Example app listening on port ${port}`));
