// Packages
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
// Service
import userService from "../services/UserService";

// -------------- Passport Setup---------------
passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: any, done: any) => {
    const user = await userService.findById(id);
    if (!user) done(user, null);
    else done(null, user);
});
//---------------------------------------------

passport.use('local.register', new localStrategy({
    usernameField: 'mobile',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, mobile: string, password: string, done) => {
    // Add New User
    const newUser = await userService.registerProcess(req.body.mobile, password,req.body.name,req.body.age);
    if (newUser === 500) return done(true, null);
    return done(null, newUser);
}));

passport.use('local.login', new localStrategy({
    usernameField: 'mobile',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, mobile: string, password: string, done) => {
    // Select User Where email
    const user = await userService.findOne({mobile});
    // Check user Exist or Incorrect Password
    if (!user || !user.comparePassword(password)) return done(true, null);
    done(null, user);
}));
