export interface companySentiment {
  company: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}
export interface dataPoint {
  _id: string;
  header: string;
  sourceUrl: string;
  publisher: string;
  publishedOn: string;
  companyNames: string[];
  companySentiment: companySentiment[];
  sectors: string[];
  isImportant: boolean;
  imageUrl: string;
  description: string;
}
export interface apiResponse {
  status: string;
  totalArticles: number; // Total count of news articles for the selected filters
  perPage: number; // Number of news articles per page
  currentPage: number;
  data: dataPoint[];
}
