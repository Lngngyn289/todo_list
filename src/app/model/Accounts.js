const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
const generateRandomString = require('../../util/generateRandomString')


const Accounts = new Schema({
  fullName: {type: String, required: true},
  userName: {type: String, required: true},
  password: {type: String, required: true},
  token: {
    type: String,
    default: generateRandomString.generate(20),
  },
  avatar: String,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});

Accounts.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true
})


module.exports = mongoose.model('Accounts',Accounts);