const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken')

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



userSchema.pre('save', function(next) {
    var user = this;

    if (user.isModified('password')) {
        // 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(plainpassword, cb) {
    // plainpassword: 사용자가 입력한 비밀번호
    // this.password: 데이터베이스에 저장된 암호화된 비밀번호
    bcrypt.compare(plainpassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.methods.generateToken = function(cb) {
    var user = this;
    //수정 전 
    //var token = jwt.sign(user._id.toHexString(), 'secretToken');
    var token = jwt.sign({ _id: user._id.toHexString() }, 'secretToken');

    user.token = token;
    return user.save() // 프로미스를 반환하도록 수정
        .then(user => cb(null, user))
        .catch(err => cb(err));
};


//기존코드
// userSchema.statics.findByToken = function(token, cb) {
//     var user = this;
//     // 토큰을 복호화(decode)하여 유저 아이디를 가져옵니다.
//     jwt.verify(token, 'secretToken', function(err, decoded) {
//         //유저 아이디를 이용해서 유저를 찾은 다음
//         //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

//         user.findOne({ "_id": decoded, "token": token }, function(err, user) {
//             if (err) return cb(err);
//             cb(null, user);
//         });
//     });
// };

userSchema.statics.findByToken = function(token) {
    var user = this;
    // 토큰을 복호화(decode)하여 유저 아이디를 가져옵니다.
    try {
        var decoded = jwt.verify(token, 'secretToken');
        return user.findOne({ "_id": decoded, "token": token });
    } catch (err) {
        return Promise.reject(err); // 오류를 반환하도록 수정
    }
};




const User = mongoose.model('User', userSchema);
module.exports = { User };