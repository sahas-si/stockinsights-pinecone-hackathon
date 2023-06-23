export const apidummy = {
  status: "success",
  totalArticles: 2, // Total count of news articles for the selected filters
  perPage: 20, // Number of news articles per page
  currentPage: 1, // Current page number
  data: [
    {
      _id: "611d53f1b8a2eef1abcde123",
      header: "Sample Article 1",
      sourceUrl: "https://example.com/article1",
      publisher: "The Wall Street Journal",
      publishedOn: "2023-06-19T10:30:00Z",
      companyNames: ["Company A", "Company B"],
      sectors: ["Technology", "Finance"],
      isImportant: true,
      imageUrl: "https://example.com/image1.jpg",
    },
    {
      _id: "611d53f1b8a2eef1abcde456",
      header: "Sample Article 2",
      sourceUrl: "https://example.com/article2",
      publisher: "Financial Times",
      publishedOn: "2023-06-18T15:45:00Z",
      companyNames: ["Company C", "Company D"],
      sectors: ["Energy", "Investment"],
      isImportant: false,
      imageUrl: "https://example.com/image2.jpg",
    },
  ],
};
