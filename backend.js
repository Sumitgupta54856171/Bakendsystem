const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { register, login } = require("./controller/sign");
dotenv.config();
const User = require("./router/User");
const Account = require("./router/Account");
const Admin = require("./router/Admin");
const path = require("path");
const cookieParser = require("cookie-parser");
const db = require("./config/mongodb");
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);
app.use('/user',User);
app.use('/account',Account);
app.use('/admin',Admin);
app.use(express.static(path.join(__dirname,'/views')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
  
    // Admin-specific room mein join karo
    socket.on('joinAdmin', () => {
      socket.join('adminRoom');
      console.log('Admin joined adminRoom');
    });
  
    // Disconnect handle karo
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
app.post('/login',login);
app.post('/register',register);
server.listen(3000, () => {
    console.log("Server started on port 3000");
    db();
});
module.exports = {app,io};
