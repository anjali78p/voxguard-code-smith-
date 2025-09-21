import librosa, numpy as np
from resemblyzer import VoiceEncoder, preprocess_wav
from speechbrain.pretrained import EncoderClassifier

# load models lazily
encoder = None
speechbrain_model = None

def extract_features(wav_path, sr=16000):
    y, sr = librosa.load(wav_path, sr=sr, mono=True)
    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
    return np.mean(mfcc, axis=1)

def extract_embedding(wav_path):
    global encoder, speechbrain_model
    if encoder is None:
        encoder = VoiceEncoder()
    if speechbrain_model is None:
        speechbrain_model = EncoderClassifier.from_hparams("speechbrain/spkrec-ecapa-voxceleb")

    # resemblyzer embedding
    wav = preprocess_wav(wav_path)
    emb1 = encoder.embed_utterance(wav)

    # speechbrain embedding
    emb2 = speechbrain_model.encode_file(wav_path).squeeze().cpu().numpy()

    return np.concatenate([emb1, emb2])
