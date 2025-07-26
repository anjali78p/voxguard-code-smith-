from fastapi import File, UploadFile
import shutil
import os
from utils.audio_processing import process_audio
from utils.feature_extraction import extract_features
from classifier import predict_fake_audio, predict_fingerprint

@app.post("/detect-audio")
async def detect_audio(file: UploadFile = File(...)):
    # Save uploaded file temporarily
    temp_path = f"temp_uploads/{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Process and extract features
    wav_path = process_audio(temp_path)
    features = extract_features(wav_path)

    # Make predictions
    is_fake, confidence = predict_fake_audio(features)
    fingerprint = predict_fingerprint(features)

    # Clean up
    os.remove(wav_path)

    return {
        "is_fake": is_fake,
        "confidence": confidence,
        "fingerprint": fingerprint
    }
