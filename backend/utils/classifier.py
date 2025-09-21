import os, joblib, numpy as np, torch

def load_models(model_dir):
    models = {}
    rf = os.path.join(model_dir, "real_fake_xgb.pkl")
    fp = os.path.join(model_dir, "fingerprint_xgb.pkl")
    models["real_fake"] = joblib.load(rf) if os.path.exists(rf) else None
    models["fingerprint"] = joblib.load(fp) if os.path.exists(fp) else None
    return models

def predict_real_fake(features, embedding, models):
    if models["real_fake"] is None:
        return False, 0.5
    x = np.concatenate([features.flatten(), embedding.flatten()]).reshape(1, -1)
    prob = models["real_fake"].predict_proba(x)[0][1]
    return bool(prob > 0.5), float(prob)

def predict_fingerprint(features, embedding, models):
    if models["fingerprint"] is None:
        return "Unknown"
    x = np.concatenate([features.flatten(), embedding.flatten()]).reshape(1, -1)
    return str(models["fingerprint"].predict(x)[0])
