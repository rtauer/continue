import * as log4js from "log4js";

log4js.configure({
    appenders: {
      out: { type: "stdout" },
      app: { type: "file", filename: "./info.log" },
    },
    categories: {
      default: { appenders: ["out", "app"], level: "debug" },
    },
  });

  export const Logger = log4js.getLogger();