import express from "express";

import { default as restaurants } from "./restaurants";

const router = express.Router();

router.get("/", () => console.log("test"));
router.use("/restaurants", restaurants);

export default router;
