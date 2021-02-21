import express from "express";
import def from "./routes/default.js";

const port = process.env.port || 5000;

const app = express();
const router = express.Router();

app.use((req, res, next) => {
    console.log(`Incoming request`);
    next();
});

router.use(def);
app.use("/api", router);

const server = app.listen(port, () =>
    console.log(`Listening on port ${server.address().port}`)
);
