// Dependencies
const express = require("express");
const dotenv = require("dotenv").config();
const authRouter = require("./src/routes/auth")
const profileRouter = require("./src/routes/profile")
const passportSetup = require("./src/config/passport")
const cookiesSession = require("cookie-session");
const mongoose = require("./src/config/connetion");
const passport = require("passport")
const app = express();


app.use(express.json())
app.use(cookiesSession({maxAge:24*60*60*1000,
keys:[process.env.SECRET_KEY]
}));

//initialize passport
app.use(passport.initialize())
app.use(passport.session())

//set up routes
app.use("/auth",authRouter)
app.use("/profile",profileRouter)
app.set("view engine",'ejs');

app.get("/",(req,res)=>{
    res.render("home",{user:req.user})
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is ruuning on ${PORT}`);
});
