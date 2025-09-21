import os
import pandas as pd
import numpy as np
from backend.utils.feature_extraction import extract_features, extract_embedding

# Paths to real and fake audio folders
REAL_DIR = 'dataset/real'
FAKE_DIR = 'dataset/fake'

# Output CSV
OUT_CSV = 'features.csv'

# Helper to process a folder

def process_folder(folder, label):
    data = []
    for fname in os.listdir(folder):
        if fname.endswith('.wav') or fname.endswith('.mp3') or fname.endswith('.flac'):
            path = os.path.join(folder, fname)
            try:
                features = extract_features(path)
                embedding = extract_embedding(path)
                row = np.concatenate([features.flatten(), embedding.flatten()])
                data.append(list(row) + [label])
            except Exception as e:
                print(f"Error processing {path}: {e}")
    return data

# Extract features for real and fake
real_data = process_folder(REAL_DIR, 0)
fake_data = process_folder(FAKE_DIR, 1)

all_data = real_data + fake_data

# Create column names
num_features = len(all_data[0]) - 1 if all_data else 0
columns = [f'f{i}' for i in range(num_features)] + ['label']

# Save to CSV
if all_data:
    df = pd.DataFrame(all_data, columns=columns)
    df.to_csv(OUT_CSV, index=False)
    print(f"Saved features to {OUT_CSV}")
else:
    print("No data found. Please check your dataset folders.")
