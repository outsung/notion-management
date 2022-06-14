import { getToken } from "next-auth/jwt";
import {
  createMiddlewareDecorator,
  NextFunction,
} from "@storyofams/next-api-decorators";
import { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "../helpers/api/auth/getUser";
import { NextApiRequestWithUser } from "../types/common";

export const JwtAuthGuard = createMiddlewareDecorator(
  async (
    req: NextApiRequestWithUser,
    res: NextApiResponse,
    next: NextFunction
  ) => {
    const user = await getUser({ req });

    req.user = user;

    user
      ? next()
      : res.status(401).json({
          result: false,
          data: { message: "Unauthorized" },
        });
  }
);
