import {
  createHandler,
  Get,
  Param,
  Req,
} from "@storyofams/next-api-decorators";
import { HttpException } from "../../../src/exceptions";
import { JwtAuthGuard } from "../../../src/middlewares/JwtAuthGuard";

import * as M from "../../../src/models";
import * as googleCalendarService from "../../../src/services/google/google.calendar.service";
import type { NextApiRequestWithUser } from "../../../src/types/common";

class CalendarHandler {
  @Get("/all")
  public async getCalendars() {
    const res = await M.calendar.get();
    return res;
  }

  @Get("/:_id")
  public async getCalendarById(@Param("_id") _id: string) {
    const res = await M.calendar.findOneById(_id);

    const googleAuth = await M.googleAuth.findOneByUniqueFiled(res.userId);

    if (!res.calendarIds.length) throw new HttpException("UNDEFINED_ERROR");
    if (!googleAuth.accessToken) throw new HttpException("UNDEFINED_ERROR");

    switch (res.type) {
      case "sum":
        if (!res.eventName) throw new HttpException("UNDEFINED_ERROR");

        const calendarEvents = await googleCalendarService.getEventByName({
          calendarId: res.calendarIds[0],
          eventName: res.eventName,
          token: googleAuth.accessToken,
          refreshToken: googleAuth.refreshToken,
        });

        return {
          hours:
            calendarEvents.reduce((sum, { duration }) => sum + duration, 0) /
            1000 /
            60 /
            60,
          eventName: res.eventName,
          icon: res.icon,
          text: res.text,
          color: res.color,
        };
      case "now":
        throw new HttpException("UNDEFINED_ERROR");
      default:
        throw new HttpException("UNDEFINED_ERROR");
    }
  }
}

export default createHandler(CalendarHandler);
