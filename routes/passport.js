const passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy
    , GoogleStrategy = require('passport-google-oauth20').Strategy
    , NaverStrategy = require('passport-naver').Strategy
    , KakaoStrategy = require('passport-kakao').Strategy
const config = require('../config/config')

module.exports = () => {
    passport.serializeUser((user, done) => {
        console.log('serialize')
        done(null, user)
    })

    passport.deserializeUser((obj, done) => {
        console.log('deserialize')
        done(null, obj)
    })

    passport.use(new FacebookStrategy({
        clientID: config.facebook_clientID,
        clientSecret: config.facebook_clientSecret,
        callbackURL: config.facebook_callbackURL,
        profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified', 'displayName']
    },
    function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile._json)
    }))

    passport.use(new GoogleStrategy({
        clientID: config.google_clientID,
        clientSecret: config.google_clientSecret,
        callbackURL: config.google_callbackURL
    },
    function(accessToken, refreshToken, profile, cb) {
        cb(null, profile._json)
    }))

    passport.use(new NaverStrategy({
        clientID: config.naver_clientID,
        clientSecret: config.naver_clientSecret,
        callbackURL: config.naver_callbackURL
    },
    function(accessToken, refreshToken, profile, cb) {
        cb(null, profile._json)
    }))

    /* */

    passport.use(new KakaoStrategy({
        clientID: config.kakao_clientID,
        clientSecret: config.kakao_clientSecret,
        callbackURL: config.kakao_callbackURL
    },
    function(accessToken, refreshToken, profile, cb) {
        cb(null, profile._json)
    }))
}

