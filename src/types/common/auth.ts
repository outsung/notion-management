import { NextApiRequest } from "next";

export type NextApiRequestWithUser = NextApiRequest & {
  user: { email: string };
};

export type NextApiRequestWithToken = NextApiRequest & {
  token: string;
};
