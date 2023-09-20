const express = require('express')
const app = express()
const port = 5000
const bodyparser = require('body-parser');

const config = require("./config/key");

const {User} = require("./models/User");

//클라이언트에서 주는 정보를 서버에서 분석해서 가져올 수 있게 
//application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended: true}));

//application/json 
app.use(bodyparser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify: false     //이거를 써줘야 에러가 없다고 했는데 Mongoose 설정 변경: Mongoose 6 버전부터 이렇게 써줘야함
}).then(()=> console.log('MongoDB Connected...'))   //몽고DB 연결 확인
  .catch(err => console.log(err))                   //몽고DB 연결 에러나면 표시하기



app.get('/', (req, res) => {
  res.send('Hello World!~~초롱~~^-^ 호호호')
})

//과거 코드 
// app.post('/register', (req,res) => {
//     const user = new User(req.body)  

//     user.save((err,userInfo)=>{
//         if(err) return res.json({success: false, err})
//         return res.status(200).json({
//     success:true
//     })
//  })
// })

app.post('/register', (req,res) => {
    // 회원 가입 할때 필요한 정보들을 client 에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다
    
    const user = new User(req.body); // bodyparser 을 이용해서 클라이언트 정보를 받아서 보여준다

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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})