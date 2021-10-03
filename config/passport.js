
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const keys = require('./keys');

module.exports = function(passport){
    let opts ={};
    //opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
   // opts.jwtFromRequest= ExtractJwt.fromAuthHeaderAsBearerToken(),
    opts.secretOrKey= 'kXp2s5v8y/B?E(G+KbPeShVmYq3t6w9z$C&F)J@McQfTjWnZr4u7x!A%D*G-KaPd';
    
    //opts.secretOrKey = keys.secretOrKey;
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
        User.findById(jwt_payload.id,(err,user)=>{
            if(err){
                return done(err,false);
            }
            if(user){
                return done(null,user);
            }
            else{
                return done(null,false);
            }
        })
    }))
    
}