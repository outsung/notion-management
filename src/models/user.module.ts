import * as Notion from "../utils/notion";

export default Notion.notionModelCreate({
  title: "user",
  databaseId: "f2d5116ba16345adb4ffcd94882ee982",
  field: {
    email: "title",
    code: "rich_text",
    // status : ''
  },
});
