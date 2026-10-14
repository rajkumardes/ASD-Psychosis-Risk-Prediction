from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from prediction import predict_risk


app = FastAPI(
    title="ASD Psychosis Risk Prediction API",
    version="1.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def home():
    return {
        "message": "ASD Psychosis Risk Prediction API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/predict")
def prediction(data: dict):

    result = predict_risk(data)

    return result