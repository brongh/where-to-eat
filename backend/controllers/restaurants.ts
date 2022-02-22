import express from "express";

const router = express.Router();

router.post("/", () => {
  console.log("hi");
});

export default router;
