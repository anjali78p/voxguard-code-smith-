from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tempfile, os

from utils.audio_processing import convert_to_wav
from utils.feature_extraction import extract_features, extract_embedding
from utils.classifier import load_models, predict_real_fake, predict_fingerprint

app = FastAPI(title="Voice Clone Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # adjust in production
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models
MODELS = load_models("models")

@app.get("/")
def root():
    return {"message": "API running"}

@app.post("/detect")
async def detect(file: UploadFile = File(...)):
    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded")

    with tempfile.TemporaryDirectory() as tmpdir:
        file_path = os.path.join(tmpdir, file.filename)
        with open(file_path, "wb") as f:
            f.write(await file.read())

        # convert to wav
        wav_path = convert_to_wav(file_path, os.path.join(tmpdir, "converted.wav"))

        # extract features & embeddings
        features = extract_features(wav_path)
        embedding = extract_embedding(wav_path)

        # predict
        is_fake, confidence = predict_real_fake(features, embedding, MODELS)
        fingerprint = predict_fingerprint(features, embedding, MODELS)

        return {
            "is_fake": is_fake,
            "confidence": confidence,
            "fingerprint": fingerprint
        }
