require("dotenv").config();

//importing modules
const express = require("express");
const cors = require("cors");
const sequelize = require("./utils/db");
const http = require("http");
const socketIo = require("socket.io");

//importing the route
const router = require("./router/MainRouter");
const socketHandler = require("./router/SocketRoute");

//importing models
const User = require("./model/User");
const List = require("./model/ToDoList");
const SharedList = require("./model/SharedList");

//instantiating the application
const app = express();

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use(router);

//defining the relation between the user and todo-list
User.hasMany(List, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
List.belongsTo(User, {
  foreginKey: "userId",
  onDelete: "CASCADE",
});
User.hasMany(SharedList, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
SharedList.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});


socketHandler(io);

const port = process.env.PORT || 3000;
//listening on port
async function initiate() {
  try {
    await sequelize.sync();
    console.log("db connected successfully");
    server.listen(port, () => {
      console.log(`Server is running at ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
initiate();
