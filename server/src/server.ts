import {config} from "./config.js";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import nocache from "nocache";
import {thingRouter} from "./endpoints/thing/thing.router";
import {setRequestContext} from "./util/express/request-context.middleware";
import {errorHandler} from "./util/express/error.middleware";
import {notFoundHandler} from "./util/express/not-found.middleware";

const app = express();

app.use(express.json());
app.use(setRequestContext);
app.use(express.static('public'))

app.use(
  helmet({
    hsts: {
      maxAge: 31536000,
    },
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        "default-src": ["'none'"],
        "frame-ancestors": ["'none'"],
      },
    },
    frameguard: {
      action: "deny",
    },
  })
);

app.use((req, res, next) => {
  res.contentType("application/json; charset=utf-8");
  next();
});
app.use(nocache());

app.use(
  cors({
    origin: config.clientUrl,
    allowedHeaders: ["Authorization", "Content-Type"],
    maxAge: 86400,
  })
)

const apiRouter = express.Router();
apiRouter.use("/thing", thingRouter);
app.use('/api', apiRouter);

app.use(errorHandler);
app.use(notFoundHandler);

const start = async (): Promise<void> => {
  try {
    const port = 8000;
    app.listen(port, () => {
      console.log("Server started on port " + port);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
