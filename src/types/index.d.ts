import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Mongoose } from 'mongoose';

declare global {
  var supabaseClient: SupabaseClient;
  var mongoose: {
    promise: Promise<Mongoose> | null;
    conn: Mongoose | null;
  };
}