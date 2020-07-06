//Logger activation modes:
// verbose -  all messages will be displayed
// null - No messages will be displayed
const logger = (text, mode) => {
  if (logger.mode === "verbose") {
    switch (mode) {
      case "error":
        console.log("\x1b[31m", "[Error] ", text);
        break;

      default:
        console.log("\x1b[33m%s\x1b[0m", "[Log] ", text);
        break;
    }
  }
};

logger.mode = null;
module.exports = logger;
