import express from "express";
import { db } from "..";
import { compare } from "bcrypt";
import jwt from 'jsonwebtoken'

const login = async (
  req: express.Request<{}, {}, { email: string; password: string }, {}>,
  res: express.Response
) => {
  const { email, password } = req.body;

  const user = await db.user.findUnique({ where: { email } });
  if (!user) return res.status(403).json({ message: "Not found." });

  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid)
    return res.status(401).json({ message: "Wrong password." });

  const secretToken = jwt.sign({ ...user }, process.env.JWT_SECRET as string, {
    expiresIn: "10h",
  });

  const { password: unstructuredPassword, ...otherUserInformations } = user;

  return res.json({ otherUserInformations, secretToken });
};

// const getTicketById = async (req: express.Request, res: express.Response) => {};

export { login };
