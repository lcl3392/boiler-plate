const express = require('express')
const app = express()
const port = 5000


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://chfhd3399:abcd1234@youtube01.db3tye3.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify: false     
    //이거를 써줘야 에러가 없다고 했는데 Mongoose 설정 변경: Mongoose 6 버전부터 이렇게 써줘야함
}).then(()=> console.log('MongoDB Connected...'))   //몽고DB 연결 확인
  .catch(err => console.log(err))                   //몽고DB 연결 에러나면 표시하기

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요 조금 피곤해욤')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})