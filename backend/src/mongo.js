const mongoose = require("mongoose");
const fs = require("fs");

const {
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
  MONGO_DATABASE,
  MONGO_HOSTNAME,
  NODE_ENV,
} = process.env;

let mongoURL;
let DB_PASSWORD;

if (NODE_ENV === "production") {
  DB_PASSWORD = fs.readFileSync(MONGO_INITDB_ROOT_PASSWORD, "utf-8");
} else {
  DB_PASSWORD = MONGO_INITDB_ROOT_PASSWORD;
}

const mongoAuth = `${MONGO_INITDB_ROOT_USERNAME}:${DB_PASSWORD.trim()}`;
mongoURL = `mongodb://${mongoAuth}@${MONGO_HOSTNAME}/${MONGO_DATABASE}`;

const connectDB = () => {
  return mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    auth: { authSource: "admin" },
  });
};

module.exports = connectDB;
