import {
  createHandler,
  Get,
  Param,
  Req,
} from "@storyofams/next-api-decorators";
import { HttpException } from "../../../../src/exceptions";
import { GoogleAuthGuard } from "../../../../src/middlewares/GoogleAuthGuard";
import type { NextApiRequestWithToken } from "../../../../src/types/common";

import * as GoogleCalendarService from "../../../../src/services/google/google.calendar.service";

class CalendarHandler {
  @Get("/:id/:eventName")
  @GoogleAuthGuard()
  public async getEventByName(
    @Req() req: NextApiRequestWithToken,
    @Param("id") id: string,
    @Param("eventName") eventName: string
  ) {
    return GoogleCalendarService.getEventByName({
      calendarId: id,
      eventName,
      token: req.token,
    });
  }
}

export default createHandler(CalendarHandler);
