require("dotenv").config();

//importing modules
const express =require("express");
const cors = require("cors");
const sequelize = require("./utils/db");

//importing middleware
const {verify} = require("./middleware/verifyToken");

//importing routes
const authRouter = require("./router/authRouter");
const listRouter = require("./router/listRouter");

//iimporting models
const User = require("./model/userModel");
const List = require("./model/listModel");

//instantiating the application
const app = express();

app.use(cors());
app.use(express.json());


//defining the relation between the user and todo-list
User.hasMany(List, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
List.belongsTo(User, {
    foreginKey: "userId",
    onDelete: "CASCADE",
})



//initializing the route endpoint
app.use("/sign", authRouter);
app.use("/list", verify, listRouter);


const port = process.env.PORT  || 3000;
//listening on port
async function initiate(){
    try{
        await sequelize.sync();
        console.log("db connected successfully");
        app.listen(port, ()=>{
            console.log(`Server is running at ${port}`);
        });
    } catch(error){
        console.log(error);
    }
}
initiate();



//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNjUyNDM3NH0.bcUwtjLJPL9s5kzGVCa - JVpQ1A8LA3Moyi5RolSkgTM

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcxNjUyNDQzMH0.vshXvyYtd3vAiirlwdjfm1xbO09DIDkrIl3Ab_7Iz9U