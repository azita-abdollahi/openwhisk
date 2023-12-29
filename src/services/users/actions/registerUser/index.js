const User = require('./model/user.model');
const userRegisterSchema = require('./userCreate.schema')
const validate  = require('./middleware/validate');

async function main(params) {
  try {
    validate(userRegisterSchema, params.create);
    
    const user = new User(
      {
          name: params.create.name,
          password: params.create.password
      }
    );
    await user.save();
    return { user };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

exports.main = main;