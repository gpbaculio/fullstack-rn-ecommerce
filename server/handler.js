const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");

require("dotenv").config();

const schema = require("./src/schema");

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true }, (e) => {
  if (e) {
    console.log(e);
  } else {
    console.log("Connected to MongoDB");
  }
});

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(
  "/graphql",
  cors(),
  graphqlHTTP(() => ({
    schema,
    pretty: true,
    graphiql: true,
  }))
);

module.exports = app;

module.exports.handler = serverless(app);
