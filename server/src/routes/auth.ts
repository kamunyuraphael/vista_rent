import { Router } from "express";
import { UserModel, hashPassword, verifyPassword } from "../models/User.js";
import { signToken } from "../middleware/auth.js";

export function createAuthRouter(jwtSecret: string) {
  const router = Router();

  // POST /api/auth/register
  router.post("/register", async (req, res) => {
    const { name, email, password, phone } = req.body ?? {};

    if (!name || !email || !password) {
      return res.status(400).json({ error: "name, email, and password are required" });
    }
    if (typeof password !== "string" || password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters" });
    }

    const existing = await UserModel.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: "An account with that email already exists" });
    }

    const { hash, salt } = hashPassword(password);
    const user = await UserModel.create({
      name,
      email: email.toLowerCase(),
      phone,
      passwordHash: hash,
      passwordSalt: salt,
    });

    const token = signToken({ sub: user.id, email: user.email }, jwtSecret);
    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  });

  // POST /api/auth/login
  router.post("/login", async (req, res) => {
    const { email, password } = req.body ?? {};
    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user || !verifyPassword(password, user.passwordSalt, user.passwordHash)) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = signToken({ sub: user.id, email: user.email }, jwtSecret);
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  });

  return router;
}
