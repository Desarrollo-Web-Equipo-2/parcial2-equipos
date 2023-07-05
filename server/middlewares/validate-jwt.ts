import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { getUserById } from "../controllers/user.controller";

async function validateJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({
      code: 'INVALID_TOKEN',
    });
  }
  
  try {
    const { uid }: any = jwt.verify(token, process.env.JWT_SECRET || '');

    const user = getUserById(Number(uid));
    if(!user){
      return res.status(401).json({
        code: 'INVALID_TOKEN',
      });
    }

    (req as any).userId = user.id;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      code: 'INVALID_TOKEN',
    });
  }
};

export default validateJWT;