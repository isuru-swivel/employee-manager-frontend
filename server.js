const express = require("express");
const next = require("next");
const pino = require("pino");
const pinoHttp = require("pino-http");
const pinoPretty = require("pino-pretty");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });

const logger = pino(
  {
    level: "info",
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  },
  pinoPretty()
);

const handler = app.getRequestHandler();
const server = express();
server.use((req, res, next) => {
  logger.info("HTTP request", { url: req.url });
  next();
});
server.use(handler);
const loggerMiddleware = pinoHttp({
  logger,
  customLogLevel: (res, err) => {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return "warn";
    } else if (res.statusCode >= 500 || err) {
      return "error";
    }
    return "info";
  },
  autoLogging: {
    ignorePaths: ["/favicon.ico", "/_next"],
  },
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

app.prepare().then(() => {
  server.use(loggerMiddleware);
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
