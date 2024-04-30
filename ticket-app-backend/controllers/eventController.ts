import { db } from "..";
import express from "express";

const getEvents = async (
  req: express.Request,
  res: express.Response
) => {
  const events = await db.event.findMany({});
  return res.status(200).json(events);
};

const getEventById = async (
  req: express.Request,
  res: express.Response
) => {
  const event = await db.event.findUnique({ where: { id: req.params.id } });
  return res.status(200).json(event);
};

export default { getEvents, getEventById };