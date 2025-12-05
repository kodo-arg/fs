import passport from "passport";
import { Strategy as SteamStrategy } from "passport-steam";
import { buscarOCrearUsuarioPorSteam } from "../modules/auth/auth.service";

passport.serializeUser(function (user: any, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id: number, done) {
  const prisma = (await import("./database")).default;
  const user = await prisma.usuario.findUnique({ where: { id } });
  done(null, user);
});

passport.use(
  new SteamStrategy(
    {
      returnURL: process.env.STEAM_RETURN_URL,
      realm: process.env.STEAM_REALM,
      apiKey: process.env.STEAM_API_KEY,
    },
    async function (identifier: string, profile: any, done: any) {
      try {
        const steamId = profile.id; // SteamID64
        const user = await buscarOCrearUsuarioPorSteam(steamId, {
          username: profile.displayName,
          avatar_url: profile._json?.avatarfull,
        });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
