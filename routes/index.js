const router = require('express').Router()
const passport = require('passport')
const passportSaver = require('./passport')
const sMember = require('../databases/sns_member')

let data

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/auth/facebook', passport.authenticate('facebook', { scope: [ 'email', 'basic_info', 'user_photos'], profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified', 'displayName']}))

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
function(req, res) {
    data = {type: 'facebook', id: req.user.id, email: req.user.email, name : req.user.name }
    res.redirect('/login_success')
})

router.get('/login_success', ensureAuthenticated, async(req, res) =>{
    try {
        if(await sMember.findOne({id : req.user.id })) {
            return res.json({'result' : '로그인에 성공하셨습니다'})
        }
        const user = await sMember.create(data)
        return res.json({'result' : '회원가입에 성공했습니다.'})
    } catch (err) {
        const { message } = err
        res.status(400).json({"result" : message})
    }
})

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        data = {type: 'google', id: req.user.id, email: req.user.url, name : req.user.displayName}
        res.redirect('/login_success')
})

router.get('/auth/naver', passport.authenticate('naver', { scope: ['profile'] }))
router.get('/auth/naver/callback',
    passport.authenticate('naver', { failureRedirect: '/' }),
    function(req, res) {
        data = {type: 'naver', id: req.user.id, email: req.user.email, name: req.user.nickname}
        res.redirect('/login_success')
})

router.get('/auth/kakao', passport.authenticate('kakao', { scope: ['profile'] }))
router.get('/auth/kakao/callback',
    passport.authenticate('kakao', { failureRedirect: '/' }),
    function(req, res) {
        data = {type: 'kakao', id: req.user.id, email: 'null', name: req.user.properties.nickname}
        res.redirect('/login_success')
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
})

function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {return next()}
    res.redirect('/')
}

module.exports = router