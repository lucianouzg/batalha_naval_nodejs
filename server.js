const express = require("express");
// const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const port = 3000;

// app.use(express.static(path.join(__dirname, "public")));
// app.set("views", path.join(__dirname, "public"));
// app.engine("html", require("ejs").renderFile);
// app.set("view engine", "html");

// app.use("/", (req, res) => {
//   // res.render("index.html");
//   res.send("olá mundo, eu sou o back");
//   return res;
// });

let messages = [];

io.on("connection", (socket) => {
  console.log(`Socket conectando: ${socket.id}`);

  socket.emit("previousMessages", messages);

  socket.on("sendMessage", (data) => {
    messages.push(data);
    socket.broadcast.emit("receivedMessage", data);
  });

  socket.on("disconnect", function () {
    console.log(`Socket desconectando: ${socket.id}`);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
