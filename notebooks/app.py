from datetime import time as time_type
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
from pydantic import BaseModel

from services.parse_user_query import ParseUtils
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
model = joblib.load("./checkpoints/dummy.pkl")
class QueryRequest(BaseModel):
    query: str
@app.get("/")
def root():
    return {"message": "Venue Recommendation API is running"}
@app.post("/predict")
def predict(request: QueryRequest):
    
    """Predict and rank venues based on user query"""
    query = request.query
    
    # 1. Parse user query
    parsed = ParseUtils.parse_user_query(query)
    print(f"Parsed query: {parsed}")
    
    # 2. Load venues
    venues_df = pd.read_csv("./datasets/ground.csv")
    
    # Debug: print column names
    print(f"Available columns: {venues_df.columns.tolist()}")
    
    # Optional: normalize column names
    # venues_df.columns = venues_df.columns.str.lower().str.strip()
    
    results = []
    
    # 3. Create features and predict for each venue
    for idx, venue_row in venues_df.iterrows():
        try:
            # Create feature vector
            features = ParseUtils.pair_feature(parsed, venue_row)
            df_features = pd.DataFrame(
                [features], 
                columns=["sport_match", "district_match", "time_match"]
            )
            
            # Predict score
            score = model.predict(df_features)[0]
            
            # Get venue info - try different column name variations
            venue_id = None
            venue_name = None
            
            for col in ['venueId', 'venue_id', 'VenueId', 'id', 'Id']:
                if col in venue_row.index and not pd.isna(venue_row[col]):
                    venue_id = venue_row[col]
                    break
            
            for col in ['name', 'Name', 'venue_name', 'Venue_Name']:
                if col in venue_row.index and not pd.isna(venue_row[col]):
                    venue_name = venue_row[col]
                    break
            
            # Debug first venue
            if idx == 0:
                print(f"First venue features: {features}")
                print(f"First venue score: {score}")
            
            results.append({
                "venue_id": str(venue_id) if venue_id is not None else f"venue_{idx}",
                "venue_name": str(venue_name) if venue_name is not None else f"Venue {idx}",
                "score": float(score),
                "features": {
                    "sport_match": features[0],
                    "district_match": features[1],
                    "time_match": features[2]
                }
            })
        except Exception as e:
            print(f"Error processing venue {idx}: {e}")
            continue
    
    # 4. Sort by score (descending)
    results = sorted(results, key=lambda x: x["score"], reverse=True)
    
    # 5. Return response - only top 3
    return {
        "query": query,
        "parsed": parsed,
        "total_venues": len(results),
        "top_results": results[:3]
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


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)