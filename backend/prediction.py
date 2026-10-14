import os
import joblib
import pandas as pd


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "xgboost_final_model.pkl"
)

PREPROCESSOR_PATH = os.path.join(
    BASE_DIR,
    "models",
    "preprocessor.pkl"
)


model = joblib.load(MODEL_PATH)
preprocessor = joblib.load(PREPROCESSOR_PATH)


FEATURE_NAMES = [
    "age",
    "language_score",
    "social_score",
    "repetitive_behavior",
    "cognitive_score",
    "anxiety_level",
    "emotional_regulation",
    "sleep_quality",
    "paranoia_traits",
    "perceptual_abnormalities",
    "gender",
    "speech_delay",
    "attention_deficit",
    "family_history_asd",
    "family_history_psychosis",
    "developmental_delay",
    "functional_decline"
]


def predict_risk(input_data):

    df = pd.DataFrame(
        [input_data],
        columns=FEATURE_NAMES
    )

    processed_data = preprocessor.transform(df)

    prediction = model.predict(processed_data)[0]

    probabilities = model.predict_proba(processed_data)[0]

    return {
        "risk_class": int(prediction),
        "probabilities": {
            "class_0": float(probabilities[0]),
            "class_1": float(probabilities[1]),
            "class_2": float(probabilities[2])
        }
    }