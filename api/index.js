const express = require("express");
const mongoose = require("mongoose");
const routes = require('./src/routes');

const app = express();

mongoose.connect(
  "mongodb+srv://atomiccodes:atomiccodes@cluster0-kswpk.mongodb.net/stack10?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);

app.use(express.json());
app.use(routes);

app.listen(80, () => {
  console.log("Rodando");
});
