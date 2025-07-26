import joblib
import numpy as np

# Load models at startup (placeholder paths)
try:
    real_fake_model = joblib.load('models/real_fake_xgboost.pkl')
except:
    real_fake_model = None

# dummy fingerprint labels
fingerprint_labels = ["ElevenLabs", "iMyFone", "Descript", "Unknown"]

def predict_real_or_fake(features):
    if real_fake_model:
        prob = real_fake_model.predict_proba([features])[0][1]
        is_fake = prob > 0.5
        return is_fake, float(prob)
    else:
        # dummy
        return True, 0.85

def predict_fingerprint(features):
    # dummy logic: choose random label
    import random
    return random.choice(fingerprint_labels)
