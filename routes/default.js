import express from "express";
import fetch from "node-fetch";
import allowIp from "../middleware/allowIp.js";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
dotenv.config();

const reqLimit = process.env.request_limit || 2;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: reqLimit,
    message: "Too many requests, cooldown is 15 minutes.",
});

const router = express.Router();

router.use(allowIp);

router.use(
    "/getPriceHistory/:startDate/:endDate",
    limiter,
    async (req, res, next) => {
        const { startDate, endDate } = req.params;
        try {
            const response = await fetch(
                `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`
            );
            const responseJson = await response.json();
            for (let date in responseJson.bpi) {
                responseJson.bpi[date] *= 1000;
            }
            res.json(responseJson);
        } catch (err) {
            err.message = "Bad request or API is down";
            next(err);
        }
    }
);

export default router;
