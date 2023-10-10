const express = require('express');
const app = express()

const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require("./config/key");
const {auth} = require('./middleware/auth')
const {User} = require("./models/User");

//클라이언트에서 주는 정보를 서버에서 분석해서 가져올 수 있게 
//application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended: true}));

//application/json 
app.use(bodyparser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify: false     //이거를 써줘야 에러가 없다고 했는데 Mongoose 설정 변경: Mongoose 6 버전부터 이렇게 써줘야함
}).then(()=> console.log('MongoDB Connected...'))   //몽고DB 연결 확인
  .catch(err => console.log(err))                   //몽고DB 연결 에러나면 표시하기

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   });

app.get('/', (req, res) => {
  res.send('Hello World!~~초롱~~^-^ 호호호하하하')
})

app.get('/api/hello',(req,res)=>{
    res.send("안녕하세요~")
})

//기존 코드 
// app.post('/register', (req,res) => {
//     const user = new User(req.body)  

//     user.save((err,userInfo)=>{
//         if(err) return res.json({success: false, err})
//         return res.status(200).json({
//     success:true
//     })
//  })
// })

app.post('/api/users/register', (req,res) => {
    // 회원 가입 할때 필요한 정보들을 client 에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다
    
    const user = new User(req.body); // bodyparser 을 이용해서 클라이언트 정보를 받아서 보여준다

     // 사용자의 역할(role)을 설정
     user.role = req.body.role || 0; // 기본값은 0 (일반 사용자)

    user.save()
        .then(userInfo => {
            res.status(200).json({
                success: true
            });
        })
        .catch(err => {
            res.json({ success: false, err });
        });
});


app.post('/api/users/login', (req, res) => {
  // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email })
      .then(userInfo => {
          if (!userInfo) {
              return res.json({
                  loginSuccess: false,
                  message: "제공된 이메일에 해당하는 유저가 없습니다."
              });
          }
          // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인
          userInfo.comparePassword(req.body.password, (err, isMatch) => {
              if (!isMatch)
                  return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });

              // 비밀번호 까지 맞다면 토큰을 생성하기
              userInfo.generateToken((err, user) => {
                  if (err) return res.status(400).send(err);

                  // 토큰을 저장 , 어디에? 쿠키
                  res.cookie("x_auth", user.token)
                      .status(200)
                      .json({ loginSuccess: true, userId: user._id });
              });
          });
      })
      .catch(err => {
          // 데이터베이스에서 조회하는 과정에서 에러가 발생한 경우 처리
          res.status(500).json({ loginSuccess: false, message: "서버 에러" });
      });
});

//기존코드
// app.post('/api/users/login', (req, res) => {

//   // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
//   User.findOne({ email: req.body.email }, (err, user) =>{

//     if (!user) {
//       return res.json({
//           loginSuccess: false,
//           message: "제공된 이메일에 해당하는 유저가 없습니다."
//       });
//   }

//    // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인
//    user.comparePassword(req.body.password, (err, isMatch) => {
//     if (!isMatch)
//         return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });

//     // 비밀번호 까지 맞다면 토큰을 생성하기
//     user.generateToken((err, user) => {
//         if (err) return res.status(400).send(err);

//         // 토큰을 저장 , 어디에? 쿠키
//         res.cookie("x_auth", user.token)
//             .status(200)
//             .json({ loginSuccess: true, userId: user._id });
//     });
// });
// })
// .catch(err => {
// // 데이터베이스에서 조회하는 과정에서 에러가 발생한 경우 처리
// res.status(500).json({ loginSuccess: false, message: "서버 에러" });
// });
// });
       

// role 1 어드민    role 2 특정 부서 어드민
// role 0 -> 일반유저   role 0이 아니면 관리자 
app.get('/api/users/auth',auth,(req, res)=>{

  //여기 까지 미들웨어를 통과해 왔다는 얘기는 Authentication 이 True 라는 말.
  res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false : true,
      isAuth : true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      image: req.user.image
  })
})

//로그아웃 기능
app.get('/api/users/logout', auth,(req,res)=>{

  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "" }
)
.then(user => {
    if (!user) return res.json({ success: false, err });
    return res.status(200).send({
        success: true
    });
})
.catch(err => {
    // 오류 처리
    console.error(err);
    return res.status(500).send({
        success: false,
        err
    });
});
})


const port = 5000


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})