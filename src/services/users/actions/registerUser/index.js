const User = require('./model/user.model');
const registerSchema = require('./userCreate.schema')
const validate = require('./middleware/validate');
require('dotenv').config();
let { connectDB } = require('./utils/mongoDBConnect/index');

async function main(params) {
 try {
   await connectDB();
   validate(registerSchema, params.create);
   
   const user = new User(
     {
         username: params.create.username,
         password: params.create.password
     }
   );
   const savedUser = await user.save();
   return { user: savedUser };
 } catch (err) {
   console.log(err);
   throw err;
 }
}

exports.main = main;