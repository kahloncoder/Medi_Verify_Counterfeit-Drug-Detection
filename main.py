# main.py
from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
from pyzbar.pyzbar import decode as zbar_decode

app = FastAPI()

# ----------------- 👇 ADD THIS SECTION 👇 -----------------
# This is the CORS middleware configuration. It tells the browser that it's safe
# to allow requests from your frontend.

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",  # Added your specific frontend URL
    # You can add other URLs here if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (POST, GET, etc.)
    allow_headers=["*"],  # Allows all headers
)
# ----------------- 👆 END OF ADDED SECTION 👆 -----------------


def decode_frame(frame):
    """Decodes QR codes or barcodes from a single image frame."""
    decoded_objects = zbar_decode(frame)
    ids = [obj.data.decode('utf-8') for obj in decoded_objects]
    return ids


@app.post("/scan-image")
async def scan_image(file: UploadFile):
    """Receives an uploaded image, decodes it, and returns any found IDs."""
    image_bytes = await file.read()
    np_arr = np.frombuffer(image_bytes, np.uint8)
    frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    if frame is None:
        return {"detected_ids": [], "error": "Could not decode image."}

    ids = decode_frame(frame)
    # Your React code expects a 'success' and 'id' field, so let's adjust the response.
    if ids:
        return {"success": True, "id": ids[0], "all_ids": ids}
    else:
        return {"success": False, "message": "No QR code found in the image."}


@app.get("/scan-live")
async def scan_live():
    """Captures a frame from the default webcam, decodes it, and returns IDs."""
    # Note: This endpoint may be slow and is not suitable for a real-time video stream.
    # It is intended for a single snapshot from the server's webcam.
    cap = cv2.VideoCapture(0)
    ret, frame = cap.read()
    cap.release()

    if not ret:
        return {"detected_ids": [], "error": "Could not capture frame from webcam."}

    ids = decode_frame(frame)
    return {"detected_ids": ids}