import { getToken } from "next-auth/jwt";
import {
  createMiddlewareDecorator,
  NextFunction,
} from "@storyofams/next-api-decorators";
import { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "../helpers/api/auth/getUser";
import { NextApiRequestWithToken } from "../types/common";
import { HttpException } from "../exceptions";

export const GoogleAuthGuard = createMiddlewareDecorator(
  async (
    req: NextApiRequestWithToken,
    res: NextApiResponse,
    next: NextFunction
  ) => {
    req.token = req.headers.authorization;

    if (!req.token) throw new HttpException("INVALID_TOKEN");

    next();
  }
);
