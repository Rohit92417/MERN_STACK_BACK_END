const router =require("express").Router()
const passport =require("passport")
router.get("/login",(req,res)=>{
    res.render("login.ejs")
})

//auth with google
router.get("/google",passport.authenticate('google',{
    scope: ['email','profile']
}))

//callback route for google to redirect to
router.get("/google/callback",passport.authenticate('google'),(req,res)=>{
    res.redirect("/profile")
})

//auth logout
router.get("/logout",(req,res)=>{
    req.logout();
    res.redirect('/')
})


module.exports = router