from datetime import time as time_type

import joblib
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import sys
import os
import importlib
from services.parse_user_query import ParseUtils
# Lấy thư mục gốc project (thư mục chứa "services")
PROJECT_ROOT = os.path.abspath(os.path.join(os.getcwd(), ".."))
sys.path.append(PROJECT_ROOT)
import services.parse_user_query as parse_module
# Reload module để chắc chắn lấy file mới
import services.query_service.extract_category as extractSport
import services.query_service.extract_location as extract_location
import services.query_service.extract_time as extract_time
importlib.reload(extract_location)
importlib.reload(extractSport)
importlib.reload(extract_time)
from services.query_service.extract_location import ExtractLocation
from services.query_service.extract_category import ExtractSport
from services.query_service.extract_time import ExtractTime

def create_training_data(venues_df, historical_queries):
    training_data = []
    if not isinstance(historical_queries, pd.DataFrame):
        historical_queries = pd.DataFrame(historical_queries)


    for idx, query_record in historical_queries.iterrows():
        query = query_record["query"]
        clicked_venue_id = query_record.get("clicked_venue_id") or query_record.get("venueId")
        for _, venue_row in venues_df.iterrows():   
            features = ParseUtils.pair_feature(parsed_query=query_record, venue_row=venue_row)
            venue_id = venue_row.get("venueId") or venue_row.get("venueid") or venue_row.get("id")
            label = 1 if str(venue_id) == str(clicked_venue_id) else 0
            record = {
                "sport_match": features['sport_match'],
                "location_match" : features['location_match'],
                "time_match": features['time_match'],
                "label": label,
                "query": query,
                "venue_id": venue_id,
            }

            training_data.append(record)

    df_training = pd.DataFrame(training_data)
    return df_training


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
model = joblib.load("./checkpoints/venue_ranker.pkl")
class QueryRequest(BaseModel):
    query: str
@app.get("/")
def root():
    return {"message": "Venue Recommendation API is running"}
@app.post("/predict")
def predict(request: QueryRequest):

    query = request.query

    parsed_df = pd.DataFrame([{"query": query}])
    # 1. Parse user query
    parsed_df = ExtractLocation.merge_query_with_locations(parsed_df)
    parsed_df = ExtractSport.extract_category_from_df(parsed_df)
    parsed_df = ExtractTime.extract_time_from_df(parsed_df)
    
    df = pd.read_csv('./datasets/df.csv')
    df = df.drop(columns=["Unnamed: 0"])
    df = df.drop_duplicates()
    
    # Tạo training data
    df_test = create_training_data(venues_df=df, historical_queries=parsed_df)
    
    # Lấy features để predict
    df_features = df_test[["sport_match", "location_match", "time_match"]]
    
    # Dự đoán
    predictions = model.predict(df_features)
    df_test["pred"] = predictions
    
    # Sort theo prediction giảm dần để lấy top venues
    df_test_sorted = df_test.sort_values(by="pred", ascending=False)
    
    # Lấy top 3 kết quả
    top_results = df_test_sorted.head(3)[["venue_id", "query", "sport_match", "location_match", "time_match", "pred"]].to_dict(orient="records")
    
    # 5. Return top 3
    return {
        "query": query,
        "parsed": parsed_df.to_dict(orient="records"),
        "total_venues": int(len(df_test)),
        "top_results": top_results
    }


@app.get("/debug/columns")
def debug_columns():
    """Debug endpoint to check CSV columns"""
    try:
        venues_df = pd.read_csv("./datasets/ground.csv")
        return {
            "columns": venues_df.columns.tolist(),
            "sample_row": venues_df.iloc[0].to_dict() if len(venues_df) > 0 else None,
            "total_rows": len(venues_df)
        }
    except Exception as e:
        return {"error": str(e)}


