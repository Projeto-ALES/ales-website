import mongoose from "mongoose";

const {
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
  MONGO_DATABASE,
  MONGO_HOSTNAME,
} = process.env;

// TODO: migrate db url to configuration file
const mongoAuth = `${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}`;

const mongoUrl = `mongodb://${mongoAuth}@${MONGO_HOSTNAME}/${MONGO_DATABASE}?authSource=admin`;
mongoose
  .connect(mongoUrl, { useNewUrlParser: true })
  .catch(err => console.error(err));

module.exports = mongoose;
