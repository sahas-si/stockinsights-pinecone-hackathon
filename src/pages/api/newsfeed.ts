import type { NextApiRequest, NextApiResponse } from 'next';

import NewsFeed from '@/db/models/NewsFeed.model';
import dbConnect from '@/db/utils/connect';

interface QueryParams {
  company?: string;
  publisher?: string;
  publishedFrom?: string;
  important?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect(); // Connect to the MongoDB database
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { company, publisher, publishedFrom, important }: QueryParams = req.query;

  try {
    const query: any = {};

    if (company && company.length > 0) {
      query.companyNames = { $in: company.split(',') };
    }

    if (publisher && publisher.length > 0) {
      query.publisher = { $in: publisher.split(',') };
    }

    if (publishedFrom) {
      console.log(publishedFrom)
      let d = new Date(publishedFrom)
      var nextday = new Date(publishedFrom)
      nextday.setDate(d.getDate() + 1)
      query.publishedOn = { $gte: new Date(publishedFrom), $lt: nextday};
    }

    if (important === "true") {
      query.isImportant = true;
    }
    console.log("Query filter", query)

    const newsFeeds = await NewsFeed.find(query).limit(process.env.FEED_LIMIT ? Number(process.env.FEED_LIMIT as string): 500);

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
