import type { Document } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

export interface INewsFeed {
  header: string;
  sourceUrl: string;
  publisher: string;
  publishedOn: Date;
  companyNames: string[];
  sectors: string[];
  isImportant: boolean;
  imageUrl: string;
  impactScore: number;
}

export interface NewsFeedDocument extends INewsFeed, Document {}

const NewsFeedSchema: Schema<NewsFeedDocument> = new Schema(
  {
    header: { type: String, required: true },
    sourceUrl: { type: String, required: true },
    publisher: { type: String, required: true },
    publishedOn: { type: Date, required: true },
    companyNames: { type: [String], required: true },
    sectors: { type: [String], required: true },
    isImportant: { type: Boolean, required: true },
    imageUrl: { type: String, required: true },
    impactScore: { type: Number, required: true },
  },
  { timestamps: true }
);

const NewsFeedModelObj = () =>
  mongoose.model<NewsFeedDocument>('NewsFeed', NewsFeedSchema, 'news_feed');

// export default AnnouncementModel;
export default (mongoose.models.NewsFeed as mongoose.Model<NewsFeedDocument>) ||
  NewsFeedModelObj();
