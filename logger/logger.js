const { format, createLogger, transports } = require("winston");

const myformat = format.cli({
  colors: {
    info: "blue",
    error: "red",
    warn: "yellow",
  },
});

const logger = createLogger({
  transports: [new transports.Console()],
  format: myformat,
});

module.exports = logger;
