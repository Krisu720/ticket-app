import express from "express";
import eventController from "../controllers/eventController";
const router = express.Router();

router.get("/", eventController.getEvents);

router.get("/:id", eventController.getEventById);

export default router;
