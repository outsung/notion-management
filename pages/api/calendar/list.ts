import { getToken } from "next-auth/jwt";
import {
  Body,
  createHandler,
  Get,
  Post,
  ValidationPipe,
  Req,
  Header,
  ParseBooleanPipe,
  Request,
  Res,
} from "@storyofams/next-api-decorators";

import * as CalendarService from "../../../src/services/calendar.service";
import { JwtAuthGuard } from "../../../src/middlewares/JwtAuthGuard";
import * as M from "../../../src/models";
import type { NextApiResponse } from "next";
import type { NextApiRequestWithUser } from "../../../src/types/common";
import { HttpException } from "../../../src/exceptions";
class CalendarHandler {
  @Get()
  @JwtAuthGuard()
  async list(@Req() req: NextApiRequestWithUser, @Res() res: NextApiResponse) {
    // console.log("[LOG] localhost:3000/api/calendar/list req.user: ", req.user);

    const user = await M.user.findOneByUniqueFiled("insung9546@gmail.com");

    if (!user) throw new HttpException("INVALID_TOKEN");

    console.log(
      "[LOG] localhost:3000/api/calendar/list user.findOneByUniqueFiled: ",
      user
    );

    const googleAuth = await M.googleAuth.findOneByUniqueFiled(user._id);

    console.log(
      "[LOG] localhost:3000/api/calendar/list googleAuth.findOneByUniqueFiled: ",
      googleAuth
      // "accessToken" in googleAuth && googleAuth.accessToken.rich_text[0]
    );

    // TODO export google token validation
    if (!googleAuth || !googleAuth._id || !googleAuth.accessToken)
      throw new HttpException("NOT_FOUND_TOKEN");

    // 이거 가지고 리스트 요청
    // googleAuth.accessToken;

    return [] as const;
  }
}

export default createHandler(CalendarHandler);
