import express from "express";
import fetch from "node-fetch";
import allowIp from "../middleware/allowIp.js";

const router = express.Router();

router.use(allowIp);

router.use("/getPriceHistory/:startDate/:endDate", async (req, res, next) => {
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
});

export default router;
