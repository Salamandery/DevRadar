const socketio = require("socket.io");
const parseStringAsArray = require("./src/utils/parseStringAsArray");
const calculateDistance = require("./src/utils/calculateDistance");
const con = [];
let io;

exports.setupWebsocket = server => {
  io = socketio(server);

  io.on("connection", socket => {
    console.log(socket.id);
    const { latitude, longitude, techs } = socket.handshake.query;

    con.push({
      id: socket.id,
      coordinates: { latitude: Number(latitude), longitude: Number(longitude) },
      techs: parseStringAsArray(techs)
    });
    /* setTimeout(() => {
      socket.emit('msg', );
    }, 3000); */
  });
};

exports.findConnections = (coordinates, techs) => {
  return con.filter(connection => {
    return (
      calculateDistance(coordinates, connection.coordinates) < 10 &&
      connection.techs.some(item => techs.includes(item))
    );
  });
};

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
}
