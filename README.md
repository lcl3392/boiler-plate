# 로그인-회원가입-로그아웃 기능구현
- Node.js와 Express를 사용하여 작성된 웹 서버
- 사용자 정보를 MongoDB에 저장하고 회원가입, 로그인, 로그아웃  관련된 기능을 구현
***

## 구현 화면
- LandingPage
 ![회원가입_1](https://github.com/lcl3392/boiler-plate/assets/133613544/ccd82eb6-5728-4631-a9a1-c596f3a00727)

- LoginPage
![회원가입_2](https://github.com/lcl3392/boiler-plate/assets/133613544/81218783-7af4-4b6f-a250-a9845020978a)

- RegisterPage
![회원가입_3](https://github.com/lcl3392/boiler-plate/assets/133613544/6db5ca73-769b-4b50-923d-d6507a1ec5a0)

***

## 노션 code 자세한 설명 정리내용
- https://scythe-booklet-0cc.notion.site/c3f51a807ea342b5a914e7b295519d3e?pvs=4

***
   
## code 설명

### Client 부분
- User 리듀서 정의
  + user_reducer.js 파일에서 가져온 LOGIN_USER 및 REGISTER_USER 액션 타입을 사용하여 user 리듀서를 정의합니다.state는 리덕스 상태를 나타냅니다. 처음에 null로 초기화됩니다.action은 디스패치된 액션 객체를 나타냅니다.
- 리듀서 동작 설명
  + LOGIN_USER 액션이 디스패치되면, 현재 상태를 복제하고 loginSuccess 필드를 새로운 action.payload 값으로 업데이트하여 새로운 상태를 반환합니다.
  + REGISTER_USER 액션이 디스패치되면, 현재 상태를 복제하고 register 필드를 새로운 action.payload 값으로 업데이트하여 새로운 상태를 반환합니다.
```
import {
LOGIN_USER,
REGISTER_USER
} from '../_actions/types';

export default function(state = null, action) {
switch (action.type) {
case LOGIN_USER:
return { ...state, loginSuccess: action.payload }

    case REGISTER_USER:
        return { ...state, register: action.payload }

    default:
        return state;
 }
}
```
***

- 리듀서 모듈 결합
 + combineReducers 함수를 사용하여 여러 리듀서 모듈을 결합한 rootReducer를 생성합니다.
 + user 리듀서를 결합, combineReducers를 사용하면 여러 리듀서를 한 리듀서로 조합할 수 있습니다.
```
import { combineReducers } from "redux";
import user from './user_reducer';

const rootReducer = combineReducers({
user
})

export default rootReducer;
```
***

- 액션 타입 정의
 + 사용자 로그인 및 회원가입 액션의 타입을 정의합니다.
```
export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";
```
***

- 로그인 액션 생성자 함수
  + loginUser 함수는 사용자 로그인을 처리하는데 사용됩니다. axios.post를 통해 서버의 /api/users/login 엔드포인트로 POST 요청을 보냅니다.
  + 서버로부터 받은 응답 데이터를 payload로 하는 LOGIN_USER 타입의 액션 객체를 반환합니다.
```

export function loginUser(dataToSubmit){
const request = axios.post('/api/users/login', dataToSubmit)
.then(response => response.data);

return {
    type: LOGIN_USER,
    payload: request
};
}
```
***

- 회원가입 액션 생성자 함수
  + registerUser 함수는 사용자 회원가입을 처리하는데 사용됩니다. axios.post를 통해 서버의 /api/users/register 엔드포인트로 POST 요청을 보냅니다.
  + 서버로부터 받은 응답 데이터를 payload로 하는 REGISTER_USER 타입의 액션 객체를 반환합니다.
```
export function registerUser(dataToSubmit){
const request = axios.post('/api/users/register', dataToSubmit)
.then(response => response.data);

return {
    type: REGISTER_USER,
    payload: request
};
}
```
***

 ### React 컴포넌트인 "LoginPage"를 정의하고, 
 사용자가 이메일과 비밀번호를 입력하여 로그인하는 기능을 구현합니다.
  1. useState를 사용하여 상태 관리
     + useState 훅을 사용하여 컴포넌트의 상태를 관리합니다. 이 컴포넌트에서는 Email과 Password라는 두 가지 상태를 관리합니다.
     + Email 상태는 사용자가 이메일 입력 필드에 입력한 값을 저장하며, setEmail 함수를 사용하여 업데이트할 수 있습니다.
     + 비슷하게, Password 상태는 사용자가 비밀번호 입력 필드에 입력한 값을 저장하며, setPassword 함수를 사용하여 업데이트할 수 있습니다.
  2. 이벤트 핸들러 함수
     + onEmailHandler 함수: 이메일 입력 필드의 값이 변경될 때 호출됩니다. event.currentTarget.value를 사용하여 입력 필드의 현재 값으로 Email 상태를 업데이트합니다.
     + onPasswordHandler 함수: 비밀번호 입력 필드의 값이 변경될 때 호출됩니다. event.currentTarget.value를 사용하여 입력 필드의 현재 값으로 Password 상태를 업데이트합니다.
  3. 폼 제출 핸들러 함수
     + onSubmitHandler 함수: 사용자가 폼을 제출할 때 호출되며, 폼 제출을 처리하는 로직을 포함합니다.
     + event.preventDefault()를 사용하여 폼의 기본 동작(페이지 새로고침)을 막습니다.
     + 사용자가 입력한 이메일과 비밀번호를 가지고 있는 body 객체를 생성합니다.
  4. Redux 액션 디스패치
     + dispatch 함수를 사용하여 Redux 스토어에 액션을 디스패치합니다. 여기서는 loginUser 액션을 디스패치합니다.
     + loginUser 액션은 서버로 사용자 정보를 전송하고, 로그인 성공 여부에 따라 다른 페이지로 이동합니다.
     + then 메서드를 사용하여 loginUser 액션의 결과를 처리합니다. 만약 로그인에 성공하면 navigate 함수를 사용하여 '/boiler-plate'로 이동하고, 그렇지 않으면 알림을 표시합니다.
 ```
function LoginPage(props) {
const dispatch = useDispatch();
const navigate = useNavigate();

const [Email,setEmail] = useState("")
const [Password,setPassword] = useState("")

const onEmailHandler = (event) => {
setEmail(event.currentTarget.value)
}

const onPasswordHandler = (event) => {
setPassword(event.currentTarget.value)
}

const onSubmitHandler = (event) => {
event.preventDefault();

let body = {
  email: Email,
  password: Password
}

dispatch(loginUser(body))
  .then(response => {                    //렌딩페이지로 이동
    if (response.payload.loginSuccess) {
      navigate('/boiler-plate');
    } else {
      alert('아이디와 패스워드를 입력해주세요.');
    }
})
}
```

***

### Server 부분

- 필수 패키지 및 모듈 불러오기
```
const express = require('express');            //Express.js: 웹 애플리케이션 및 라우팅을 위한 프레임워크.
const app = express();                         //Express 애플리케이션 객체를 생성
const bodyparser = require('body-parser');     //body-parser: 클라이언트에서 전송된 JSON 형식의 데이터를 서버에서 파싱하기 위한 미들웨어.
const cookieParser = require('cookie-parser'); //cookie-parser: 쿠키를 파싱하는 미들웨어.
const config = require("./config/key");        //config: 애플리케이션 설정 정보를 포함한 모듈.
const { auth } = require('./middleware/auth'); //auth: 사용자 인증 관련 미들웨어.
const { User } = require("./models/User");     // User: 사용자 정보를 다루는 모델.
const mongoose = require('mongoose');          //Mongoose 모듈을 가져옵니다
```
***

- MongoDB 연결 설정
  + MongoDB에 연결하는 설정을 수행합니다. config.mongoURI에 MongoDB 연결 문자열이 포함되어 있어야 합니다.
```
mongoose.connect(config.mongoURI, {
useNewUrlParser: true,
useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));
```
***

- 사용자 회원가입
   + 클라이언트에서 POST 요청으로 사용자 정보를 전송하여 회원가입을 처리합니다. 새로운 사용자 정보를 MongoDB에 저장하고 회원가입 성공 여부를 반환합니다.
```
app.post('/api/users/register', (req, res) => {
// 클라이언트에서 전송된 사용자 정보를 기반으로 새 사용자 생성 및 저장
const user = new User(req.body);
// 사용자 역할(role)을 설정
user.role = req.body.role || 0; // 기본값은 0 (일반 사용자)
// MongoDB에 저장
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
```
***

- 사용자 로그인
   + 클라이언트에서 POST 요청으로 이메일과 비밀번호를 전송하여 로그인을 처리합니다. 이메일이 데이터베이스에 있고 비밀번호가 일치하면 토큰을 생성하고 쿠키로 반환합니다.
```
app.post('/api/users/login', (req, res) => {
// 요청된 이메일을 데이터베이스에서 검색하여 사용자 확인
User.findOne({ email: req.body.email })
.then(userInfo => {
// 사용자가 존재하지 않으면 실패 응답 반환
if (!userInfo) {
return res.json({
loginSuccess: false,
message: "제공된 이메일에 해당하는 유저가 없습니다."
});
}
// 비밀번호 검증 후 토큰 생성 및 반환
userInfo.comparePassword(req.body.password, (err, isMatch) => {
if (!isMatch)
return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });
userInfo.generateToken((err, user) => {
if (err) return res.status(400).send(err);
res.cookie("x_auth", user.token)
.status(200)
.json({ loginSuccess: true, userId: user._id });
});
});
})
.catch(err => {
res.status(500).json({ loginSuccess: false, message: "서버 에러" });
});
});
```
***

- 사용자 권한 확인
   + /api/users/auth 경로에 접근할 때 사용자가 인증되어 있으면 사용자 정보를 반환합니다.
```
app.get('/api/users/auth', auth, (req, res) => {
// 미들웨어를 통과한 경우, 사용자 인증 정보 반환
res.status(200).json({
_id: req.user._id,
isAdmin: req.user.role === 0 ? false : true,
isAuth: true,
email: req.user.email,
name: req.user.name,
lastname: req.user.lastname,
role: req.user.role,
image: req.user.image
});
});
```
***

- 사용자 로그아웃
   + 사용자 로그아웃 요청을 처리하고 토큰을 삭제합니다.
```
app.get('/api/users/logout', auth, (req, res) => {
// 로그아웃 시 토큰을 삭제
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
res.status(500).json({ success: false, err });
});
});
```
***

- 서버를 5000번 포트에서 리스닝
  + 서버를 시작하고 클라이언트 요청을 수신할 준비를 마치는 역할을 합니다. 서버가 시작되면 해당 포트에서 클라이언트의 요청을 처리하기 위해 대기하게 됩니다.
```
const port = 5000;

app.listen(port, () => {
console.log(`Example app listening on port ${port}`);
});
```
***

### (사용자 데이터베이스 모델을 정의 비밀번호 암호화, 토큰 생성 및 검증 기능을 추가 사용자 관리)
- 사용자 스키마 정의
  + userSchema는 사용자 정보를 저장하는 스키마를 정의합니다. 이 스키마에는 사용자 이름, 이메일, 비밀번호, 성(성의 최대 길이는 50), 역할(role), 이미지 정보, 토큰, 토큰의 유효 기간 등이 포함됩니다.
```
const userSchema = mongoose.Schema({
name: {
type: String,
maxlength: 50
},
email: {
type: String,
trim: true,
unique: 1
},
password: {
type: String,
minlength: 5
},
lastname: {
type: String,
maxlength: 50
},
role: {
type: Number,
default: 0
},
image: String,
token: {
type: String
},
tokenExp: {
type: Number
}
});
```
***

- 비밀번호 암호화
  + 사용자가 비밀번호를 변경하거나 새로 등록할 때, 비밀번호를 암호화합니다. bcrypt를 사용하여 비밀번호를 해싱하고 암호화된 비밀번호를 user.password에 저장합니다.
```
userSchema.pre('save', function(next) { ... });
```
- 비밀번호 비교 메서드
  + 사용자가 제출한 평문 비밀번호와 데이터베이스에 저장된 암호화된 비밀번호를 비교하는 메서드입니다. compare 메서드를 사용하여 입력된 비밀번호를 암호화된 비밀번호와 비교하고 비교 결과를 콜백 함수에 반환합니다.
```
userSchema.methods.comparePassword = function(plainpassword, cb) { ... };
```
- 토큰 생성 메서드
  + 사용자에게 토큰을 생성하여 할당하고 해당 토큰을 저장합니다. 이 토큰은 사용자 인증에 사용됩니다.
```
userSchema.methods.generateToken = function(cb) { ... };
```
- 토큰 검증 메서드
  + 주어진 토큰을 검증하고 토큰에 대응하는 사용자를 반환하는 메서드입니다. 클라이언트의 요청에서 토큰을 사용하여 사용자 인증을 수행할 때 사용됩니다.
```
userSchema.statics.findByToken = function(token) { ... };
```
- Mongoose 모델 생성 및 내보내기
  + userSchema를 기반으로 User 모델을 생성하고, 이 모델을 내보내어 다른 부분에서 사용할 수 있도록 합니다. 이 모델을 사용하여 MongoDB에 사용자 정보를 저장하고 관리합니다.
```
const User = mongoose.model('User', userSchema);
module.exports = { User };
```
***

### (사용자 인증을 처리하는 미들웨어 함수를 정의)
- 클라이언트로부터 받은 토큰을 사용하여 사용자를 인증하고, 인증된 사용자의 정보를 요청 객체(req)에 추가하는 역할을 합니다.
  + 클라이언트로부터 쿠키(x_auth)를 통해 전달된 토큰을 token 변수에 저장합니다.
  + User.findByToken(token)를 사용하여 토큰을 복호화하고, 이 토큰과 일치하는 사용자를 데이터베이스에서 찾습니다.
  + 사용자를 찾으면 then 블록에서 isAuth를 true로 설정하고, req.token에 토큰을, req.user에 사용자 정보를 추가합니다.
  + 사용자를 찾지 못하면 isAuth를 false로 설정하고, error를 true로 설정한 응답을 반환합니다.
```
const {User} = require('../models/User')

let auth = (req, res, next) => {    // 인증 처리 하는곳

    let token = req.cookies.x_auth; // 클라이언트 쿠기에서 토큰을 가져온다

    User.findByToken(token)         // 토큰을 복호화 한 후 유저를 찾는다.
        .then(user => {
            if (!user) return res.json({ isAuth: false, error: true });

            req.token = token;
            req.user = user;
            next();
        })
        .catch(err => {
            throw err;
        });
};

module.exports = {auth};  //미들웨어 내보내기
```


