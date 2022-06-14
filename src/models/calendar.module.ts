import * as Notion from "../utils/notion";

export default Notion.notionModelCreate({
  title: "calendar",
  databaseId: "cc11dd97c84f4728b382c0a761608b89",
  field: {
    embedUri: "title",
    userId: "rich_text",
    type: "select",
    views: "files",
    calendarIds: "multi_select",
    eventName: "rich_text",
    icon: "rich_text",
    text: "rich_text",
    color: "rich_text",
  },
});
