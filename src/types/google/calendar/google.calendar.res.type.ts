export type GetEventByNameRes =
  | { error: any }
  | { items: GetEventByNameResItem[] };

export interface GetEventByNameResItem {
  summary: string;
  start: {
    dateTime: string;
  };
  end: {
    dateTime: string;
  };
}

export interface GoogleCalendarEvent {
  summary: string;
  start: string;
  end: string;
  duration: number;
}
