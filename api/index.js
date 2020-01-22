const express = require("express");
const mongoose = require("mongoose");
const routes = require('./src/routes');
const { setupWebsocket } = require('./websocket');
const http = require('http');
const cors = require("cors");

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(
  "mongodb+srv://atomiccodes:atomiccodes@cluster0-kswpk.mongodb.net/stack10?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333, () => {
  console.log("Rodando");
});
