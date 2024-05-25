const User = require("../model/User"); 


class UserService{

    static async findAllUser(){
        try{
            const users = await User.findAll({
              attributes: ["id", "name"],
            });
            return users;
        } catch(err){
            return new Error();
        }
    }

    static async findUser(email){
        try{
            const existingUser = await User.findOne({ where: { email } });
            
            return existingUser;
        } catch(error){
            return new Error();
        }
    }

    static async createNewUser(user){
        try {
          const { name, email, hashedPassword } = user;
          const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
          });
          return newUser;
        } catch (error) {
          throw new Error("Error creating user");
        }
    }
}

module.exports = UserService;