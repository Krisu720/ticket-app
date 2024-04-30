import { db } from "..";
import { buyTicket, getTicketById } from "../controllers/ticketController";
// import { verifySession } from "../middleware";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  const tickets = await db.ticket.findMany({ include: { event: true } });
  return res.status(200).json(tickets);
});

router.post("/buy", buyTicket);

router.get("/:id", getTicketById);

export default router;
