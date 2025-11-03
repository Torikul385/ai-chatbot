from fastapi import  UploadFile
from typing import Optional 
import os 
from uuid import uuid4
UPLOAD_DIR = "public/uploads" 

async def fileUpload(file: Optional[UploadFile]): 
    if not file:
        return ""  # handle None

    try:
        file_path = os.path.join(UPLOAD_DIR,  file.filename)

        # Read file bytes
        contents_bytes = await file.read()

        # Write bytes to disk
        with open(file_path, "wb") as f:
            f.write(contents_bytes)

        # Try decoding to UTF-8 string for further processing
        try:
            contents_str = contents_bytes.decode("utf-8")
        except UnicodeDecodeError:
            contents_str = ""  # return empty string if not UTF-8 text

        return contents_str

    except Exception as e:
        print("fileUpload error:", e)
        return ""