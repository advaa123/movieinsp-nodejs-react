const { users, nameOfApi } = require("./important");

module.exports = function (io) {
  const commands = require("./commands")(io);

  io.on("connection", (socket) => {
    users.add(socket.id);
    console.log("user connected");

    let welcomeMessage = [
      `Hello and welcome to ${nameOfApi}!`,
      `${users.size} users are currently using our API.`,
      `Please make requests typing words like...`,
    ];

    let interval = 1000;
    let promise = Promise.resolve();

    welcomeMessage.forEach(function (msg) {
      promise = promise
        .then(() => {
          io.to(socket.id).emit("server typing", "typing");
          return new Promise(function (resolve) {
            setTimeout(resolve, interval);
          });
        })
        .then(() => {
          io.to(socket.id).emit("server chat message", msg);
          io.to(socket.id).emit("server typing", "stopped");
          return new Promise(function (resolve) {
            setTimeout(resolve, interval / 2);
          });
        });
    });

    promise.then(() => {
      commands["show commands"](socket);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
      users.delete(socket.id);
    });

    const cleanKeys = (obj) =>
      Object.keys(obj).reduce((acc, key) => {
        acc[key.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "")] = key;
        return acc;
      }, {});

    socket.on("user chat message", (msg) => {
      io.to(socket.id).emit("user chat message", msg);

      const cleanCommands = cleanKeys(commands);
      msg = msg.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "");

      if (msg in cleanCommands) {
        commands[cleanCommands[msg]](socket);
      }
    });
  });
};
