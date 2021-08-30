const express = require('express')
const session = require('express-session')
const passport = require('passport')
const app = express()
app.use(session({secret:'msg'}))
app.use(passport.initialize())
app.use(passport.session())

const auth = require('./auth')
app.get('/',(req,res)=>{
    res.send('<a href="/auth/google">Authenticate using google</a>')
})

function isLoggedIn(req,res,next){
    req.user?next():res.sendStatus(401)
}

app.get('/auth/google',
passport.authenticate('google',{scope:['email','profile']})
)

app.get('/google/callback',
passport.authenticate('google',{
    successRedirect:'/protected',
    failureRedirect:'/auth/failiure'
}))

app.get('/auth/failiure',(req,res)=>{
    res.send('something wrong')
})

app.get('/protected',isLoggedIn,(req,res)=>{
    res.send(`Hello ${req.user.displayName}`)
})

app.get('/logout',(req,res)=>{
    req.logout()
    req.session.destroy()
    res.send("goodbye!!")
})
app.listen(3000,()=>console.log("server stated at port 3000"))