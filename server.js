import restify from "restify";
import corsMiddleware from "restify-cors-middleware";
import routes from "./routes/routes.js";
// import morgan from "morgan";
import log4js from "log4js";
/* Create Log
_____________________________*/
const logger = log4js.getLogger();
logger.level = "debug";

/* PORT 
______________________*/
const PORT = process.env.PORT || 5000;

/* Create Server 
____________________________*/

const server = restify.createServer({
  name: "Blog Website Version 2"
});

/* Cors MiddleWare
______________________________*/
const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ["http://localhost:5000/", "http://localhost:3000"],
  allowHeaders: ["API-Token", "Authorization"],
  exposeHeaders: ["API-Token-Expiry"]
});

server.pre(cors.preflight);
server.use(cors.actual);

/* API Routes
______________________________*/
routes.applyRoutes(server, "/api");

/*  Parser Plugins 
________________________*/
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

/* Logger Plugins 
___________________________*/
// server.use(morgan("combined", {}));

/* Listening on PORT 
_____________________________*/

server.listen(PORT, () => logger.info(`Listening on PORT: ${PORT}`));

module.exports = server;
