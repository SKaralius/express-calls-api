import express from "express";

const router = express.Router();

router.use("/getPriceHistory", async (req, res) => {
    res.send("Hello world");
});

export default router;
