const express = require("express");
var router = express.Router();
const Account = require("../../models/account");
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();

router.post("/signin", (req, res) => {
  // 비밀번호 데이터 타입 검사 (문자열인지 아닌지)
  if (typeof req.body.password !== "string") {
    return res.status(401).json({
      success: false,
      errorMsg: "비밀번호가 맞지 않습니다."
    });
  }

  // Model.findOne 메소드로 username 이 같은 DB 검색 (첫번째 인자 : Query)
  Account.findOne({ username: req.body.username }, (err, account) => {
    if (err) throw err;
    // 검색 결과가 존재하지 않는 경우
    if (!account) {
      return res.status(401).json({
        success: false,
        errorMsg: "등록되지 않은 ID입니다."
      });
    }

    // 유저검색 결과가 있으면 검사 salt값으로 해쉬
    // const validate =
    hasher({ password: req.body.password, salt: account.salt }, function(
      err,
      pass,
      salt,
      hash
    ) {
      // 입력한 비밀번호를 이용해 만든 해쉬와 DB에 저장된 비밀번호가 같을 경우
      if (hash === account.password) {
        console.log(" >>> req.session");
        console.log(req.session);

        req.session.loginInfo = {
          _id: account._id,
          username: account.username
        };

        req.session.save(err => {
          console.log(">> session 저장 >>");
          console.log(req.session);
          console.log(">> req check  >>");
          console.log(req);
          if (!err) {
            return res.json({
              success: true
            });
          } else {
            return res.json({
              success: false
            });
          }
        });
      } else {
        return res.status(401).json({
          success: false,
          errorMsg: "비밀번호가 맞지 않습니다."
        });
      }
    });
  });
});

/*
    GET CURRENT USER INFO GET /api/authentication/getInfo
*/
router.get("/loginInfo", (req, res) => {
  // console.log(" >>>> req >>> /loginInfo");
  // console.log(req);
  console.log(">> 0");
  console.log(" >>>>>>> req.session >>> /loginInfo");
  console.log(req.session);
  // console.log(" >>>>>>> req.session.loginInfo >>> /loginInfo");
  // console.log(req.session.loginInfo);

  if (typeof req.session.loginInfo === "undefined") {
    console.log(">> 1");
    return res.status(401).json({
      success: false,
      error: "로그인 정보가 없습니다."
    });
  }
  console.log(">> 2");
  res.json({ loginInfo: req.session.loginInfo });
});

/*
    LOGOUT: POST /api/account/logout
*/
router.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) throw err;
  });
  return res.json({ sucess: true });
});

module.exports = router;
