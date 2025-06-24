const passport = require('passport');
const config = require('../config/googleConfig');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Funcionario = require('../models/Funcionario');

const passportOptions = {
  clientID: config.clientId,
  clientSecret: config.clientSecret,
  callbackURL: config.callbackURL,
};

passport.use(new GoogleStrategy(passportOptions,
  async function (accessToken, refreshToken, profile, done) {
    try {
      let funcionario = await Funcionario.findOne({ where: { googleId: profile.id } });

      if (!funcionario) {
        funcionario = await Funcionario.create({
          name: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value,
          cargo: 'Funcionario', 
          salario: 0, 
          datacontrato: new Date(), 
        });
      }

      return done(null, funcionario);
    } catch (err) {
      return done(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const funcionario = await Funcionario.findByPk(id);
    done(null, funcionario);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
