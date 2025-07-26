# 🎙️ VoxGuard – AI-Powered Deepfake Voice Detection API

> ⚠️ Detect cloned voices, prevent fraud, and identify the source of voice generation tools like ElevenLabs or iMyFone. Built with FastAPI, XGBoost, Librosa, and SpeechBrain.

---

## 🔍 Overview

**VoxGuard** is an advanced backend API that detects whether an uploaded voice sample is **real or fake (AI-generated)** using machine learning and deep learning models. It also supports **fingerprinting**, identifying which service may have cloned the voice (e.g., ElevenLabs, Descript).

---

## 🧠 Features

- ✅ Upload or record voice in real-time
- ✅ Identify the fingerprint of the generation source (e.g., ElevenLabs, iMyFone)
- 🎯 Detect deepfakes with XGBoost classifier
- 📈 Confidence score with every prediction
- 🔍 Voice fingerprint detection (SpeechBrain, ResNet, etc.)
- 🔊 Audio preprocessing using `Librosa` + `OpenSMILE`
- ⚙️ Also detect fake audio from telegram app

---

## 🏗️ Tech Stack

| Layer          | Tools Used                                |
|----------------|-------------------------------------------|
| **Backend**    | FastAPI, Python                           |
| **Audio**      | Librosa, SoundDevice, OpenSMILE           |
| **ML Models**  | XGBoost, ResNet, SpeechBrain, TorchAudio  |
| **Frontend**   | React.js + TailwindCSS (planned)          |
| **DevOps**     | GitHub Codespaces, Uvicorn, REST API      |

