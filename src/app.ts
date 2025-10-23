import express from "express";
import dotenv from "dotenv";
import { query } from "./config/db";
import phonesRouter from "./routers/phones-router";
import { errorHandler } from "./middlewares/error-handler";
import rechargesRouter from "./routers/recharges-router";
import summaryRouter from "./routers/summary-router";

dotenv.config();
const app = express();
app.use(express.json());

app.get("/", (_req, res) => res.send({ status: "ok" }));

app.get("/health/db", async (_req, res, next) => {
    try {
        const now = await query<{ now: string }>("SELECT NOW()");
        const carriers = await query<{ count: string }>("SELECT COUNT(*)::text AS count FROM carriers");
        res.send({
        dbTime: now.rows[0].now,
        carriers: Number(carriers.rows[0].count)
        });
    } catch (err) {
        next(err);
    }
});

app.use("/phones", phonesRouter);
app.use("/recharges", rechargesRouter);
app.use("/summary", summaryRouter)

app.use(errorHandler);

export default app;
