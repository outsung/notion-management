import {
  GetEventByNameResItem,
  GoogleCalendarEvent,
} from "../../../types/google/calendar";

export function googleCalendarNormalizing(
  item: GetEventByNameResItem
): GoogleCalendarEvent {
  return {
    end: item.end.dateTime,
    start: item.start.dateTime,
    summary: item.summary,
    duration:
      Number(new Date(item.end.dateTime)) -
      Number(new Date(item.start.dateTime)),
  };
}
