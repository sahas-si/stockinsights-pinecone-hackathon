import type { NextApiRequest, NextApiResponse } from 'next';

import NewsFeed from '@/db/models/NewsFeed.model';
import dbConnect from '@/db/utils/connect';

interface QueryParams {
  company?: string;
  publisher?: string;
  publishedOn?: string;
  important?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect(); // Connect to the MongoDB database
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { company, publisher, publishedOn, important }: QueryParams = req.query;

  try {
    const query: any = {};

    if (company && company.length > 0) {
      query.companyNames = { $in: company.split(',') };
    }

    if (publisher && publisher.length > 0) {
      query.publisher = { $in: publisher.split(',') };
    }

    if (publishedOn) {
      query.publishedOn = { $gte: new Date(publishedOn) };
    }

    if (important === "true") {
      query.isImportant = true;
    }
    console.log("Query filter", query)

    const newsFeeds = await NewsFeed.find(query);

    return res.status(200).json({
      message: 'Success',
      data: newsFeeds,
    });
  } catch (error) {
    console.error('Error while fetching newsfeed', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default handler;
