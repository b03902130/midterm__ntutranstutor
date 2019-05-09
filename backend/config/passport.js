var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: "884234383717-ld5dehngne5hnigsqesg3de0pkiv8122.apps.googleusercontent.com",
			clientSecret: "3ZXSNdg9PxFzHZttMLSDetBC",
			callbackURL: "http://linux1.csie.ntu.edu.tw:1994/auth/google/callback"
		},
		function(accessToken, refreshToken, profile, done) {
			var userData = {
				email: profile.emails[0].value,
				name: profile.displayName,
				token: accessToken
			};
			done(null, userData);
		}
	)
);
