const {User} = require('../models/User')

let auth = (req, res, next) => {
    // 인증 처리 하는곳

    // 클라이언트 쿠기에서 토큰을 가져온다
    let token = req.cookies.x_auth;

    // 토큰을 복호화 한 후 유저를 찾는다.
    User.findByToken(token)
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


module.exports = {auth};

//기존코드
// let auth = (req, res, next)=>{
//     //인증처리 하는곳 

//     //클라이언트 쿠기에서 토큰을 가져온다
//     let token = req.cookies.x_auth;

//     //토큰을 복호화 한후 유저를 찾는다.
//     User.findByToken(token, (err,user)=> {
//         if(err) throw err;
//         if(!user) return res.json({isAuth: false, error: true})

//         req.token = token;
//         req.user = user;
//         next();
//     })

//     //유저가 있으면 인증 ok

//     //유저가 있으면 인증 no

    

// }