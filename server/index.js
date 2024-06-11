// require('dotenv').config()
// const express=require('express')
// const cors=require('cors')
// const routes=require('./Routes/routes')
// require('./db/connection')

// const projectApp=express()
// projectApp.use(cors())


// projectApp.use(express.json())
// projectApp.use(routes)
// const PORT=8000 

// projectApp.listen(PORT,()=>{
//     console.log(`Server started at Port Number ${PORT}`);
// })


require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routes = require('./Routes/routes')
require("./db/connection")
const session = require("express-session")
const passport = require('passport');
const OAuth2Strategy = require("passport-google-oauth2").Strategy;


const clientid = process.env.GOOGLE__clientId;
const clientsecret = process.env.GOOGLE__ClientSecretkey;

const users = require('./models/userModel')
const projectApp = express()
projectApp.use(cors({
  origin: "http://localhost:3000",
  // methods: "GET,POST,PUT,DELETE",
  credentials: true
}))

projectApp.use(session({
  secret: "11gtt4535trfefegr",
  resave: false,
  saveUninitialized: true
}))
projectApp.use(passport.initialize());
projectApp.use(passport.session());


passport.use(
  new OAuth2Strategy(
    {
      clientID: clientid,
      clientSecret: clientsecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"]
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("profile", profile);
      try {
        // Check if the user already exists based on email
        let user = await users.findOne({ email: profile.emails[0].value });
        if (!user) {
          // If user doesn't exist, create a new user
          user = new users({
            username: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
            // Generate a random password or handle as needed
            password: profile.password
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
})

passport.deserializeUser((user, done) => {
  done(null, user);
})
//initial google auoth login

projectApp.use(express.json())
projectApp.use(routes)

projectApp.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }))
projectApp.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: "http://localhost:3000/home",
  failureRedirect: "http://localhost:3000/login"
}))

projectApp.get("/login/success", async (req, res) => {
  console.log("reqqqq", req.userdata);
  if (req.user) {
    res.status(200).json({ message: "user login", user: req.user })
  } else {
    res.status(400).json({ message: "not authorised" })
  }
})

projectApp.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect("http://localhost:3000/login")

  })

})

const PORT = 8000 || process.env.PORT

projectApp.listen(PORT, () => {
  console.log(`Server Started At Port Number ${PORT}`);
})