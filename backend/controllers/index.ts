import express from "express";

const router = express.Router();

router.get("/", () => console.log("test"));

export default router;
