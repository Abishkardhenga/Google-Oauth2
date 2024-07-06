const express = require("express");
const cors = require("cors");
const { dbConnect } = require("./Db/connect.js");
const session = require("express-session");
const passport = require("passport");
const userModel = require("./models/user.model.js");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const asyncHandler = require("express-async-handler");

require("dotenv").config();
const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE",
    credentials: true
}));

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    authorizationURL: "https://accounts.google.com/o/oauth2/auth",
    tokenURL: "https://oauth2.googleapis.com/token",
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback",
    scope: ["email", "profile"]
},
    asyncHandler(async function (accessToken, refreshToken, profile, done) {
        console.log("access", accessToken);
        console.log("refreshToken", refreshToken);
        console.log("profile", profile);

        let user = await userModel.findOne({ googleId: profile.id });
        if (user) {
            console.log("User already exists");
            return done(null, user);
        }

        const email = profile.emails?.[0]?.value;
        const image = profile.photos?.[0]?.value;
        const displayName = profile.displayName;

        if (!email) {
            console.log("No email found in profile");
            return done(new Error("No email found in profile"));
        }

        user = new userModel({
            googleId: profile.id,
            email: email,
            image: image,
            displayName: displayName,
        });
        await user.save();
        return done(null, user);
    })
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    try {
        const user = await userModel.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('http://localhost:5173/dashboard');
    });

app.get("/", (req, res) => {
    res.status(200).json({ message: "Home page", success: true });
});

dbConnect();

app.listen(PORT, () => {
    console.log("Server running successfully on port", PORT);
});
