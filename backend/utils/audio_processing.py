import ffmpeg, soundfile as sf, os

def convert_to_wav(input_path, out_path, sr=16000):
    try:
        (
            ffmpeg
            .input(input_path)
            .output(out_path, format="wav", acodec="pcm_s16le", ac=1, ar=str(sr))
            .overwrite_output()
            .run(quiet=True)
        )
    except:
        data, orig_sr = sf.read(input_path)
        sf.write(out_path, data, sr)
    return out_path
