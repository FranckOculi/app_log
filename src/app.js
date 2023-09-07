import fastify from "fastify";
import cors from "@fastify/cors";
import logRoutes from "./routes/logRoutes.js";

const app = fastify({
  logger: true,
});

// cors
app.register(cors, {
  origin: true,
  // origin: configuration.app_url,
  // allowedHeaders: [
  //   'Origin',
  //   'X-Requested-With',
  //   'Accept',
  //   'Content-Type',
  //   'Authorization',
  // ],
  // methods: ['GET', 'PUT', 'POST', 'DELETE'],
});

// Routes managers
app.register(logRoutes, { prefix: "/log" });

export default app;
