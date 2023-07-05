import { Request, Response } from "express";
import User from "../interfaces/user.interface";
import bcryptjs from 'bcryptjs';

const userDb: User[] = [];
let nextId: number = 1;

export function getUserById(userId: number): User | undefined {
  const index = userDb.findIndex(x => x.id === userId);
  if (index >= 0) {
      return userDb[index];
  }
}

export function getUserByUsername(username: string): User | undefined {
  const index = userDb.findIndex(x => x.username === username);
  if (index >= 0) {
      return userDb[index];
  }
}

export const createUser = async (req: Request, res: Response) => {
  if (getUserByUsername(req.body.username)) {
    return res.status(400).json({
      code: 'USER_ALREADY_EXISTS',
    });
  }

  const salt = bcryptjs.genSaltSync();
  const password = bcryptjs.hashSync(req.body.password, salt);

  const user: User = {
    id: nextId++,
    username: req.body.username,
    password,
  };

  userDb.push(user);

  res.json({
    id: user.id,
    username: user.username,
  });
};
