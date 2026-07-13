import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthPayload {
  sub: string; // user id
  email: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export function signToken(payload: AuthPayload, secret: string) {
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

/** Rejects the request if no valid Bearer token is present. */
export function requireAuth(secret: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({ error: "Missing or malformed Authorization header" });
    }

    try {
      req.user = jwt.verify(token, secret) as AuthPayload;
      next();
    } catch {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };
}

/** Attaches req.user if a valid token is present, but never rejects — for guest-friendly routes. */
export function attachUserIfPresent(secret: string) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
    if (token) {
      try {
        req.user = jwt.verify(token, secret) as AuthPayload;
      } catch {
        // ignore invalid token on optional-auth routes
      }
    }
    next();
  };
}
