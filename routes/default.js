import express from "express";
import fetch from "node-fetch";
import allowIp from "../middleware/allowIp.js";

const router = express.Router();

router.use(allowIp);

router.use("/getPriceHistory/:startDate/:endDate", async (req, res) => {
    const { startDate, endDate } = req.params;
    // TODO: Error handling, what if params are not dates?
    const response = await fetch(
        `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`
    );
    // TODO: catch errors in response
    const responseJson = await response.json();
    for (let date in responseJson.bpi) {
        responseJson.bpi[date] *= 1000;
    }
    res.json(responseJson);
});

export default router;
