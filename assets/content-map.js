// assets/content-map.js
// 站点内容分区与搜索过滤函数

const siteConfig = {
  baseUrl: "https://main-home-i-game.com.cn",
  siteName: "爱游戏",
  defaultLanguage: "zh-CN"
};

const contentSections = [
  {
    id: "esports",
    title: "电竞专区",
    description: "覆盖主流电竞赛事与战队动态",
    keywords: ["爱游戏", "电竞", "LOL", "Dota2", "CSGO", "赛事"],
    pages: [
      { path: "/esports/lol", label: "英雄联盟" },
      { path: "/esports/dota2", label: "Dota2" },
      { path: "/esports/csgo", label: "CSGO" }
    ]
  },
  {
    id: "mobile",
    title: "手游推荐",
    description: "热门手机游戏评测与攻略",
    keywords: ["爱游戏", "手游", "王者荣耀", "原神", "攻略"],
    pages: [
      { path: "/mobile/wzry", label: "王者荣耀" },
      { path: "/mobile/yuanshen", label: "原神" },
      { path: "/mobile/peacekeeper", label: "和平精英" }
    ]
  },
  {
    id: "pcgames",
    title: "PC游戏库",
    description: "单机与联机PC游戏资讯",
    keywords: ["爱游戏", "PC", "单机", "Steam", "联机"],
    pages: [
      { path: "/pcgames/steam", label: "Steam特惠" },
      { path: "/pcgames/cyberpunk", label: "赛博朋克2077" },
      { path: "/pcgames/eldenring", label: "艾尔登法环" }
    ]
  },
  {
    id: "news",
    title: "游戏新闻",
    description: "最新的游戏行业动态与更新公告",
    keywords: ["爱游戏", "新闻", "更新", "公告"],
    pages: [
      { path: "/news/updates", label: "版本更新" },
      { path: "/news/events", label: "活动公告" }
    ]
  }
];

function searchContent(keyword) {
  const results = [];
  const lowerKeyword = keyword.toLowerCase();

  contentSections.forEach(section => {
    const matchedPages = section.pages.filter(page => {
      const pageLabel = page.label.toLowerCase();
      const pagePath = page.path.toLowerCase();
      return pageLabel.includes(lowerKeyword) || pagePath.includes(lowerKeyword);
    });

    const hasKeywordMatch = section.keywords.some(k => k.toLowerCase().includes(lowerKeyword));
    const hasDescriptionMatch = section.description.toLowerCase().includes(lowerKeyword);
    const hasTitleMatch = section.title.toLowerCase().includes(lowerKeyword);

    if (hasKeywordMatch || hasDescriptionMatch || hasTitleMatch || matchedPages.length > 0) {
      results.push({
        sectionId: section.id,
        sectionTitle: section.title,
        matchedPages: matchedPages.length > 0 ? matchedPages : [],
        relevance: (hasTitleMatch ? 3 : 0) + (hasDescriptionMatch ? 2 : 0) + (hasKeywordMatch ? 1 : 0) + matchedPages.length
      });
    }
  });

  results.sort((a, b) => b.relevance - a.relevance);
  return results;
}

function getSectionByPath(path) {
  for (const section of contentSections) {
    const found = section.pages.find(p => p.path === path);
    if (found) {
      return { section, page: found };
    }
  }
  return null;
}

function generateSiteMap() {
  const map = [];
  contentSections.forEach(section => {
    section.pages.forEach(page => {
      map.push({
        url: siteConfig.baseUrl + page.path,
        label: page.label,
        section: section.title
      });
    });
  });
  return map;
}

function getKeywordSuggestions(partial) {
  const lowerPartial = partial.toLowerCase();
  const allKeywords = [...new Set(contentSections.flatMap(s => s.keywords))];
  return allKeywords.filter(k => k.toLowerCase().includes(lowerPartial)).slice(0, 5);
}

// 示例使用
console.log("站点地图示例:", generateSiteMap().slice(0, 2));
console.log("搜索'原神':", searchContent("原神"));
console.log("搜索'爱游戏':", searchContent("爱游戏"));
console.log("路径匹配 /mobile/wzry:", getSectionByPath("/mobile/wzry"));
console.log("关键词建议 '电':", getKeywordSuggestions("电"));