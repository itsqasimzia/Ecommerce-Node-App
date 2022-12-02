const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;
async function ConnectDb() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");
  } catch (error) {
    console.log("Db Error", error);
  }
}

module.exports = { ConnectDb };
