import express from "express";
import http from "http";
import socketIO from "socket.io";
import morgan from "morgan";
import router from "./routes";
import cors from "cors";
import connectDB from "./config/database";

const app = express();
const server = http.createServer(app);
const io = new socketIO.Server(server, {
  cors: {
    origin: "*",
  },
});

connectDB();

app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS","PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "X-User-Id",
      "X-Project-Id",
      "X-Drilling-Id",
      "Accept",
      "Origin",
      "Access-Control-Allow-Headers",
      "Access-Control-Request-Headers",
      "Access-Control-Allow-Origin",
    ],
  })
);
app.use(express.json());

app.use("/api/1.0", router);

io.on("connection", (socket) => {
  const { userId, chatId } = socket.handshake.query;
  const user = userId;

  if (!user || !chatId) {
    socket.disconnect();
    return;
  }

  socket.join(`chat-${chatId}`);
  console.log(`Usuario ${userId} conectado al chat ${chatId}.`);
  socket.on("send-message", (message) => {
    io.to(`chat-${chatId}`).emit("new-message", message);
  });
});

export { app, server, io };
