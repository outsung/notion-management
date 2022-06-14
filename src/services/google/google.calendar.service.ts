import { GOOGLE_CALENDAR_API_URI } from "../../constants/google.constant";
import { HttpException } from "../../exceptions";
import {
  GetEventByNameRes,
  GoogleCalendarEvent,
} from "../../types/google/calendar";
import { googleCalendarNormalizing } from "../../utils/google";

interface GetEventByNameProps {
  token: string;
  refreshToken?: string;
  calendarId: string;
  eventName: string;
}
export async function getEventByName({
  token,
  calendarId,
  eventName,
  refreshToken,
}: GetEventByNameProps): Promise<GoogleCalendarEvent[]> {
  const res = (await (
    await fetch(
      `${GOOGLE_CALENDAR_API_URI}/calendars/${calendarId}/events?q=${eventName}&key=${process.env.GOOGLE_API_KEY}&maxResults=2500`,
      { headers: { Authorization: "Bearer " + token } }
    )
  ).json()) as GetEventByNameRes;

  if ("error" in res) {
    if (refreshToken) {
      const newToken = await refreshAccessToken(refreshToken);
      if (newToken) {
        return getEventByName({
          token: newToken,
          refreshToken,
          calendarId,
          eventName,
        });
      }
    }

    console.log(
      `${GOOGLE_CALENDAR_API_URI}/calendars/${calendarId}/events?q=${eventName}&key=${process.env.GOOGLE_API_KEY}`,
      res.error
    );
    throw new HttpException("NOT_FOUND_GOOGLE_TOKEN");
  }

  if (!("items" in res)) throw new HttpException("UNDEFINED_ERROR");

  return res.items.map(googleCalendarNormalizing);
}

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
export async function refreshAccessToken(refreshToken: string) {
  console.log("refreshAccessToken start: ", refreshToken);
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID || "",
        client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    console.log({ googleres: refreshedTokens });

    return refreshedTokens.access_token;
    // return {
    //   ...token,
    //   accessToken: ,
    //   accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
    //   refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    // };
  } catch (error) {
    console.log("refreshAccessToken error", error);
    return null;
    //  {
    //   ...token,
    //   error: "RefreshAccessTokenError",
    // };
  }
}
