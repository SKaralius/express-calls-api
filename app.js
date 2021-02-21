import express from "express";
import def from "./routes/default.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.port || 8080;
const host = process.env.host || "0.0.0.0";

const app = express();
const router = express.Router();

app.use((req, res, next) => {
    console.log(`Incoming request`);
    next();
});

router.use(def);
app.use("/api", router);

const server = app.listen(port, host, () =>
    console.log(`Listening on host ${host} and port ${server.address().port}`)
);
