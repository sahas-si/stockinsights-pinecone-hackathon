import type { NextApiRequest, NextApiResponse } from 'next';

import NewsFeed, { NewsFeedDocument } from '@/db/models/NewsFeed.model';
import dbConnect from '@/db/utils/connect';
import { companySentiment } from '@/types/type';

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

    const newsFeeds:NewsFeedDocument[] = await NewsFeed.find(query).sort({impactScore: -1}).limit(process.env.FEED_LIMIT ? Number(process.env.FEED_LIMIT as string): 500);
    for (let newsFeed of newsFeeds as NewsFeedDocument[]){
        let companySentiments = newsFeed.companySentiment
        newsFeed.companySentiment = companySentiments.filter((sentiment) => sentiment.sentiment != 'neutral')
    }

    const filteredNewsFeeds:NewsFeedDocument[] = newsFeeds.filter((newsFeed) => newsFeed.companySentiment.length > 0)
    // let companies:{name:string, selected:boolean}[] = []
    // let companyMap = new Map<String, boolean>();
    // for(let newsFeed of filteredNewsFeeds as NewsFeedDocument[]) {
    //   for (let ele of newsFeed.companySentiment) {
    //     if(ele.sentiment == 'positive' || ele.sentiment == 'negative') {
    //       if(companyMap.has(ele.company)) {
    //         continue
    //       } else {
    //         companyMap.set(ele.company, true)
    //         companies.push({name: ele.company, selected:true})
    //       }
    //     }
    //   }
    // }
    // companies.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)

    // console.log(companies.slice(0,100))
    // console.log(companies.slice(100,-1))
    
    return res.status(200).json({
      message: 'Success',
      data: filteredNewsFeeds,
    });
  } catch (error) {
    console.error('Error while fetching newsfeed', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default handler;
