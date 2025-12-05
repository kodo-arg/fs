import dotenv from "dotenv";
import "./config/passport";
dotenv.config();
import app from "./app";

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Manejo de errores del servidor
server.on("error", (error: any) => {
  console.error("Server error occurred:", error);
});
