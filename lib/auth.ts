import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { db } from "./db";
import { User, UserRole } from "./types";

const JWT_SECRET = process.env.JWT_SECRET || "textfix-super-secret-educational-key-2026";
const COOKIE_NAME = "textfix_session";

export interface SessionPayload {
  userId: string;
  email: string;
  role: UserRole;
  name: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function createSessionToken(user: User): string {
  const payload: SessionPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifySessionToken(token: string): SessionPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionPayload;
  } catch {
    return null;
  }
}

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<{ user: User; token: string; isFirstUserAdmin: boolean }> {
  const existingUser = db.getUserByEmail(email);
  if (existingUser) {
    throw new Error("A user with this email address already exists.");
  }

  const allUsers = db.getUsers();
  // CRITICAL REQUIREMENT: First registered user automatically becomes the Super Admin!
  const isFirstUserAdmin = allUsers.length === 0;
  const role: UserRole = isFirstUserAdmin ? "admin" : "user";

  const passwordHash = await hashPassword(password);
  const user = db.createUser({
    name,
    email,
    passwordHash,
    role,
  });

  const token = createSessionToken(user);
  return { user, token, isFirstUserAdmin };
}

export async function loginUser(
  email: string,
  password: string
): Promise<{ user: User; token: string }> {
  const user = db.getUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const isValid = await comparePassword(password, user.passwordHash);
  if (!isValid) {
    throw new Error("Invalid email or password.");
  }

  const token = createSessionToken(user);
  return { user, token };
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = verifySessionToken(token);
    if (!payload) return null;

    const user = db.getUserById(payload.userId);
    return user || null;
  } catch {
    return null;
  }
}

export { COOKIE_NAME };
