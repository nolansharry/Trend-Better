export const PLACEHOLDER_USER = {
  name: "John Doe",
  username: "@johndoe",
  bio: "Finance enthusiast. Investor. Always watching the market.",
  avatarUrl: null,
};

export const PLACEHOLDER_VIDEOS = [
  {
    id: 1,
    title: "Why the Fed matters to your portfolio",
    views: 8400,
    duration: "3:12",
    category: "Macro",
    thumbnailUrl: null,
  },
  {
    id: 2,
    title: "Top 3 stocks to watch this week",
    views: 15000,
    duration: "4:45",
    category: "Equities",
    thumbnailUrl: null,
  },
  {
    id: 3,
    title: "Is crypto dead or just sleeping?",
    views: 22000,
    duration: "5:30",
    category: "Crypto",
    thumbnailUrl: null,
  },
  {
    id: 4,
    title: "Breaking down the latest CPI report",
    views: 6100,
    duration: "2:58",
    category: "Macro",
    thumbnailUrl: null,
  },
];

export const PLACEHOLDER_ARTICLES = [
  {
    id: 1,
    title: "The dollar's dominance is quietly cracking",
    source: "Bloomberg",
    publishedAt: "2h ago",
    category: "FX",
    imageUrl: null,
  },
  {
    id: 2,
    title: "JPMorgan sees S&P at 6,800 by year-end",
    source: "WSJ",
    publishedAt: "5h ago",
    category: "Equities",
    imageUrl: null,
  },
  {
    id: 3,
    title: "Fed minutes reveal deeper rate cut debate",
    source: "Reuters",
    publishedAt: "1d ago",
    category: "Macro",
    imageUrl: null,
  },
  {
    id: 4,
    title: "Inside the AI chip shortage nobody is talking about",
    source: "FT",
    publishedAt: "2d ago",
    category: "Tech",
    imageUrl: null,
  },
];

export const PLACEHOLDER_TWEETS = [
  {
    id: 1,
    author: "Elon Musk",
    handle: "@elonmusk",
    avatarUrl: null,
    content:
      "The Fed is going to have to cut rates. There's no other option at this point. Inflation is cooling and the economy needs stimulus.",
    timestamp: "2h ago",
    likes: 48200,
    retweets: 8100,
    category: "Macro",
  },
  {
    id: 2,
    author: "Cathie Wood",
    handle: "@CathieWood",
    avatarUrl: null,
    content:
      "AI is deflationary. The productivity gains from artificial intelligence will compress costs across every sector. Don't sleep on ARKK.",
    timestamp: "5h ago",
    likes: 12400,
    retweets: 3200,
    category: "Tech",
  },
  {
    id: 3,
    author: "Michael Saylor",
    handle: "@saylor",
    avatarUrl: null,
    content:
      "Bitcoin is the only rational macro hedge in 2026. Everything else is noise. The dollar is losing 7-8% purchasing power annually.",
    timestamp: "1d ago",
    likes: 31000,
    retweets: 7600,
    category: "Crypto",
  },
  {
    id: 4,
    author: "Warren Buffett",
    handle: "@WarrenBuffett",
    avatarUrl: null,
    content:
      "Never bet against America. Short-term volatility is the price you pay for long-term gains. Stay patient, stay invested.",
    timestamp: "2d ago",
    likes: 92000,
    retweets: 21000,
    category: "Equities",
  },
];

export const PLACEHOLDER_KALSHI = {
  stats: { total: 48, winRate: 62, profitLoss: "+$4,200" },
  activity: [
    {
      id: 1,
      question: "Will the Fed cut rates in May 2026?",
      position: "YES",
      stake: "$250",
      result: "WON",
      payout: "+$180",
    },
    {
      id: 2,
      question: "Will BTC hit $100K before June?",
      position: "NO",
      stake: "$100",
      result: "LOST",
      payout: "-$100",
    },
    {
      id: 3,
      question: "Will CPI drop below 3% in Q2?",
      position: "YES",
      stake: "$500",
      result: "PENDING",
      payout: "--",
    },
    {
      id: 4,
      question: "Will NVDA beat earnings estimates?",
      position: "YES",
      stake: "$300",
      result: "WON",
      payout: "+$220",
    },
  ],
};
