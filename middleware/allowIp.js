import express from "express";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const allowedIp = process.env.allowed_host || "*";

router.use(function (req, res, next) {
    if (allowedIp === "*") {
        console.log(
            `Incoming ip is ${req.ip}, all IP's are allowed because there is no 'allowed_host' variable in .env`
        );
        next();
    } else {
        console.log(
            `Incoming IP is ${req.ip}, allowed IP is ${process.env.allowed_host}`
        );
        if (req.ip === allowedIp) next();
        else throw new Error("Unauthorized");
    }
});

export default router;
