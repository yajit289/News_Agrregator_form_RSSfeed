import Parser from "rss-parser";

const parser = new Parser();

export const fetchNews = async () => {
  try {
    const feed = await parser.parseURL("https://feeds.bbci.co.uk/news/rss.xml");
    const articles = feed.items.map((item) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      content: item.contentSnippet,
    }));
    return articles;
  } catch (error){
    console.log("Rss fetch Error:",error.message);
    return [];
  }
};
