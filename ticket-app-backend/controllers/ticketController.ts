import express from "express";
import { Stripe } from "stripe";
import { db } from "..";

const stripe = new Stripe(
  "sk_test_51Nw8iMKOrrOF1S6xVUqnIL1p2foXykc8phUseuNemiE1UBaH82H79mhLOVGIvABiRjl80QMbxl16yaoYKvLCXQee00U66zENgZ",
  {
    typescript: true,
    apiVersion: "2023-10-16",
  }
);

const buyTicket = async (
  req: express.Request<{}, {}, { eventId: string }, {}>,
  res: express.Response
) => {
  const event = await db.event.findUnique({ where: { id: req.body.eventId } });
  if (!event) return res.status(404).json({ message: "Event not found" });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: event.price*100,
    currency: "pln",
    payment_method_types: ["card", "p24"],
  });

  return res.json({
    paymentIntent: paymentIntent.client_secret,
  });
};

const getTicketById = async (req: express.Request, res: express.Response) => {
  const ticket = await db.ticket.findUnique({ where: { id: req.params.id } });
  return res.status(200).json(ticket);
};

export { buyTicket, getTicketById };
