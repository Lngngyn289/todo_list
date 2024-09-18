const mongoose = require('mongoose');
async function connect(){
  try {
    await mongoose.connect(process.env.MONGOCONNECT);
    console.log("success");
  } catch (error) {
    console.log("fail");
  }
}

module.exports = { connect };