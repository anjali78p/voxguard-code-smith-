import os
import ffmpeg
import uuid

TEMP_DIR = "temp_uploads"

def save_and_convert_to_wav(file):
    """Save uploaded file and convert to wav format"""
    if not os.path.exists(TEMP_DIR):
        os.makedirs(TEMP_DIR)
    unique_id = str(uuid.uuid4())
    input_path = os.path.join(TEMP_DIR, f"{unique_id}_input")
    output_path = os.path.join(TEMP_DIR, f"{unique_id}.wav")

    # Save uploaded file
    with open(input_path, "wb") as buffer:
        buffer.write(file)

    # Convert to wav
    (
        ffmpeg
        .input(input_path)
        .output(output_path, format='wav', acodec='pcm_s16le', ac=1, ar='16k')
        .run(quiet=True, overwrite_output=True)
    )

    # Delete original
    os.remove(input_path)

    return output_path
