const mongoose = require("mongoose");
const fs = require("fs");
const User = require("./models/user");

const {
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
  MONGO_DATABASE,
  MONGO_HOSTNAME,
  NODE_ENV,
} = process.env;

let isProduction = NODE_ENV === "production";
let mongoURL;
let DB_PASSWORD;

if (isProduction) {
  DB_PASSWORD = fs.readFileSync(MONGO_INITDB_ROOT_PASSWORD, "utf-8");
} else {
  DB_PASSWORD = MONGO_INITDB_ROOT_PASSWORD;
}

const mongoAuth = `${MONGO_INITDB_ROOT_USERNAME}:${DB_PASSWORD.trim()}`;
mongoURL = `mongodb://${mongoAuth}@${MONGO_HOSTNAME}/${MONGO_DATABASE}`;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      auth: { authSource: "admin" },
    });

    if (isProduction) {
      console.log("Database connected");
      return;
    }

    const { INIT_USER, INIT_EMAIL, INIT_PASSWORD } = process.env;

    let user = {
      name: INIT_USER,
      email: INIT_EMAIL,
      password: INIT_PASSWORD,
    };
    const query = await User.findOne({ email: INIT_EMAIL })
    if (!query) {
      await User.create(user);
    }
    console.log("Database connected with user:", user);
  } catch (err) {
    throw err;
  }
};

module.exports = connectDB;
