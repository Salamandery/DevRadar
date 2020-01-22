import socketio from "socket.io-client";

const socket = socketio("http://192.168.15.7:3333/", {
  autoConnect: false
});

function subscribeToNewDev(subscribe) {
  socket.on("new-dev", subscribe);
}

function connect(latitude, longitude, techs) {
  socket.io.opts.query = {
    latitude,
    longitude,
    techs
  };

  socket.connect();

  //socket.on("msg", text => {});
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export { connect, disconnect, subscribeToNewDev };
