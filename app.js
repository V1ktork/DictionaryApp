const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dictionaryRouter = require("./api/routes/dictionary");
const userRouter = require("./api/routes/user");

mongoose.connect(
  "mongodb+srv://someuser:someuser@node-db-x6awj.gcp.mongodb.net/dictionary?retryWrites=true&w=majority",
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
);

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use("/dictionary", dictionaryRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
  const error = new Error("Запрашиваемая страница не найдена.");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
