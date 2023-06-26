import json
import traceback

from dateutil import tz
from langchain.text_splitter import RecursiveCharacterTextSplitter, Document
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Pinecone
import tiktoken
import pinecone
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv
from pymongo import MongoClient
import certifi

load_dotenv()

india_tz = tz.gettz("Asia/Kolkata")

tokenizer = tiktoken.get_encoding('p50k_base')

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
PINECONE_API_KEY = os.getenv('PINECONE_API_KEY')
PINECONE_ENVIRONMENT = os.getenv('PINECONE_ENVIRONMENT')
PINECONE_INDEX_NAME = os.getenv('PINECONE_INDEX_NAME')

EMBED_MODEL_NAME = "text-embedding-ada-002"
EMBEDDING_CHUNK_SIZE = 1000
TEXT_SPLITTER_CHUNK_SIZE = 512
TEXT_SPLITTER_CHUNK_OVERLAP = 20
PINECONE_UPSERT_BATCH_SIZE = 100

# Connect to the MongoDB instance, database & collection
MONGO_URL=os.getev("MONGO_URL")
DB_NAME=os.getenv("DB_NAME")
COLLECTION = os.getenv("COLLECTION")

client = MongoClient(MONGO_URL,tlsCAFile=certifi.where())
mongo_db = client[DB_NAME]
collection = mongo_db[COLLECTION]




def init_pinecode():
    # openai.api_key = OPENAI_API_KEY
    pinecone.init(api_key=PINECONE_API_KEY, environment=PINECONE_ENVIRONMENT)
    pinecone_index = pinecone.Index(PINECONE_INDEX_NAME)
    print("Pinecone init complete!")
    return pinecone_index

def tiktoken_length(text):
    # For Textsplitter the length function is required
    tokens = tokenizer.encode(text, disallowed_special=())
    return len(tokens)


def split_and_format_section_into_chunks(record):
    record_section = record["generated_summary"]
    record_chunks = RecursiveCharacterTextSplitter(chunk_size=TEXT_SPLITTER_CHUNK_SIZE,
                                                   chunk_overlap=TEXT_SPLITTER_CHUNK_OVERLAP,
                                                   length_function=tiktoken_length).split_text(record_section)
    record_chunks_formatted = []
    for i in range(len(record_chunks)):
        metadata = {
            "concall_id": str(record.get("_id")),
            "chunk_type": "transcript_summary",
            "chunk_no": i,
            "record_type": "earnings_transcript",
            "quarter": record.get("quarter"),
            "year": record.get("year"),
            "company_name": record.get("company_name"),
            "company_id": record.get("company_id"),
            "ticker": record.get("ticker"),
            "country": "US"
        }
        formatted_record = {
            "id": f"{record.get('_id')}|{i}",
            'text': record_chunks[i],
            'metadata': metadata
        }
        record_chunks_formatted.append(formatted_record)

    return record_chunks_formatted


def create_store_embeds(record_chunks, pinecode_vs, embeddings_generator):
    try:
        print("Generating and storing all the embeddings in pinecone started!")
        store_result = pinecode_vs.from_texts(texts=[chunk["text"] for chunk in record_chunks],
                                              ids=[chunk["id"] for chunk in record_chunks],
                                              metadatas=[chunk["metadata"] for chunk in record_chunks],
                                              embedding=embeddings_generator,
                                              index_name=PINECONE_INDEX_NAME,
                                              batch_size=PINECONE_UPSERT_BATCH_SIZE)
        print("Storing all the embeddings in pinecone complete!", store_result)
    except Exception as e:
        print("Error in pinecone from_texts: ", e)


def lambda_handler():
    pinecone_index = init_pinecode()
    init_stats = pinecone_index.describe_index_stats()
    initial_vectors_count = init_stats["total_vector_count"]

    embeddings_generator = OpenAIEmbeddings(model=EMBED_MODEL_NAME, openai_api_key=OPENAI_API_KEY,
                                            chunk_size=EMBEDDING_CHUNK_SIZE)
    pinecode_vs = Pinecone(index=pinecone_index, embedding_function=embeddings_generator.embed_documents,
                           text_key="text")

    # Retrieve records from MongoDB
    us_report_insights_DB_Records = list(collection.find())

    chunks_all_records = []
    print("Splitting to chunks for concalls started!")

    for (counter, concall_record) in enumerate(us_report_insights_DB_Records):
        try:
            record_chunks = split_and_format_section_into_chunks(concall_record)
            chunks_all_records.extend(record_chunks)
        except Exception as e:
            traceback.print_exc()
            print(
                f'Error while chunk splitting the {concall_record["name"] if concall_record.get("name") else concall_record.get("company_name")}')

    print("Splitting to chunks for concalls complete!")
    print(f"First record : {chunks_all_records[0]}") if len(chunks_all_records) > 0 else print(f"No records to update!")

    create_store_embeds(chunks_all_records, pinecode_vs, embeddings_generator)

    final_stats = pinecone_index.describe_index_stats()

    print(f"Index stats before insertions : {init_stats}")
    print(f"Index stats after insertions : {final_stats}")

    final_vectors_count = final_stats["total_vector_count"]

    res_body = {
                "concall_records": len(us_report_insights_DB_Records),
                "pinecone_embeddings_count_before_upsertion": initial_vectors_count,
                "pinecone_embeddings_count_after_upsertion": final_vectors_count,
                "pinecone_new_embeddings_added_count": final_vectors_count - initial_vectors_count
                }

    print(res_body)
    return res_body

if __name__ == '__main__':
    lambda_handler()