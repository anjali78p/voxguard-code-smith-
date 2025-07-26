import librosa
import numpy as np

def extract_features(file_path):
    y, sr = librosa.load(file_path, sr=16000)
    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
    features = np.concatenate([np.mean(mfcc, axis=1), np.std(mfcc, axis=1)])
    return features
