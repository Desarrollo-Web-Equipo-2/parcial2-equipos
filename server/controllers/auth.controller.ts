import { Response, Request } from "express";
import bcryptjs from 'bcryptjs';
import generateJWT from '../helpers/generate-jwt';
// import jwt from 'jsonwebtoken';

import { getUserByUsername } from "./user.controller";

export async function login(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = getUserByUsername(username);

    if (!user) {
        return res.status(401).json({
            code: 'INVALID_USERNAME_PASSWORD_PAIR',
        });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
        return res.status(401).json({
            code: 'INVALID_USERNAME_PASSWORD_PAIR',
        });
    }

    const token = await generateJWT(user.id.toString());

    res.json({
        id: user.id,
        username: user.username,
        token,
    });
};
