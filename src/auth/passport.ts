import passport from "passport"
import { Strategy, ExtractJwt } from "passport-jwt"
import { User } from "../db/models/models"
import { JwtPayload } from "jsonwebtoken"

passport.use(new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "GM"
}, async function (jwt_payload: JwtPayload, done) {
  try {
    const { sub } = jwt_payload
    const user = await User.findByPk(sub)

    return done(user, true)

  } catch (e) {
    return done(e, false)
  }
}))