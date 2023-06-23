import type { NextApiRequest, NextApiResponse } from 'next';

import NewsFeed from '@/db/models/NewsFeed.model';
import dbConnect from '@/db/utils/connect';

interface QueryParams {
  company?: string;
  sector?: string;
  publishedOn?: string;
  important?: boolean;
}


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
   
   await dbConnect();  // Connect to the MongoDB database
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { company, sector, publishedOn, important }: QueryParams = req.query;

  try {
    const query: any = {};

    if (company && company.length > 0) {
      query.companyNames = { $in: company.split(',') };
    }

    if (sector && sector.length > 0) {
      query.sectors = { $in: sector.split(',') };
    }

    if (publishedOn) {
      query.publishedOn = { $gte: new Date(publishedOn) };
    }

    if (important) {
      query.isImportant = true;
    }

    const newsFeeds = await NewsFeed.find(query);

    return res.status(200).json({
      message: 'Success',
      data: newsFeeds,
    });
  } catch (error) {
    console.error("Error while fetching newsfeed", error)
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default handler;
