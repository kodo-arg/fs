import cors from "cors";
import helmet from "helmet";
import express from "express";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import routes from "./routes";

const app = express();

// Middlewares básicos
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGINS,
    credentials: true, // Importante para cookies
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Middleware para cookies
app.use(cookieParser());

// Middleware para sesiones
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
    },
  })
);

// Middleware para autenticación
app.use(passport.initialize());
app.use(passport.session());

// Rutas principales
app.use("/api/v1", routes);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
  if (!res.headersSent) {
    res.status(404).json({
      success: false,
      message: "Ruta no encontrada",
      error: "NOT_FOUND",
      path: req.path,
    });
  }
});

export default app;
