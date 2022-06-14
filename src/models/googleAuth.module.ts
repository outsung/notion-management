import * as Notion from "../utils/notion";

export default Notion.notionModelCreate({
  title: "googleAuth",
  databaseId: "7502ca13e4e34900b947790d1a93eab4",
  field: {
    userId: "title",
    accessToken: "rich_text",
    refreshToken: "rich_text",
    expireTime: "rich_text",
  },
});
