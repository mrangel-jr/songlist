const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = mongoose.model('user');

//SerializedUser
passport.serializeUser((user,done) => {
    done(null,user.id);
});

//CounterPart 'serializedUser'
passport.deserializeUser((id,done) => {
    User.findById(id, (err, user) => {
        done(err,user);
    })
});

passport.use(new LocalStrategy({usernameField: 'email'}, (email,password,done) => {
    User.findOne({email: email.toLowerCase()}, (err,user) => {
        if (err) { return done(err); }
        if(!user) { return done(null, false, 'Invalid Credentials'); }
        user.comparePassword(password, (err, isMatch) => {
            if (err) { return done(err); }
            if (isMatch) {
                return done(null,user);
            }
            return done(null, false, 'Invalid Credentials');
        })
    })
}));

//Signup
function signup({email, password,req}) {
    const songs = [];
    const user =  new User({email,password,songs});
    return User.findOne({email})
    .then(existingUser => {
        if (existingUser) {throw new Error('Email in use'); }
        return user.save();
    })
    .then(user => {
        return new Promise((resolve,reject) => {
            req.logIn(user, (err) => {
                if (err) { reject(err); }
                resolve(user);
            });
        });
    });
}


//Login
function login({email,password,req}) {
    return new Promise((resolve,reject) => {
        passport.authenticate('local',(err,user) => {
            if(!user) { return reject('Invalid Credentials'); }
            req.login(user,() => resolve(user));
        })({body: { email,password } });
    });
}

module.exports = {signup , login};