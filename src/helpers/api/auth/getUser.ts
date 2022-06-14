import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { NextApiRequestWithUser } from "../../../types/common";

export async function getUser({ req }: { req: NextApiRequestWithUser }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return null;

  return typeof token.user === "object" && "email" in token.user
    ? (token.user as { email: string })
    : null;
}
