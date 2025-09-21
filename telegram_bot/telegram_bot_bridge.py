from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
import requests, os

BACKEND_URL = "http://localhost:8000/detect"  # adjust for deployment
BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Send me a voice message or audio file to detect if it's cloned.")

async def handle_audio(update: Update, context: ContextTypes.DEFAULT_TYPE):
    file = await update.message.voice.get_file()
    file_path = await file.download_to_drive("temp.ogg")

    with open("temp.ogg", "rb") as f:
        files = {"file": f}
        response = requests.post(BACKEND_URL, files=files)

    if response.ok:
        result = response.json()
        await update.message.reply_text(str(result))
    else:
        await update.message.reply_text("Error processing audio.")

def main():
    app = Application.builder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.VOICE | filters.AUDIO, handle_audio))
    app.run_polling()

if __name__ == "__main__":
    main()
