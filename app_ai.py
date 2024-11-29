from fastapi import FastAPI, WebSocket, BackgroundTasks
import uvicorn
import base64
from PIL import Image
import io
import asyncio
import tensorflow as tf
import numpy as np
import json
import time


app = FastAPI()
interpreter = tf.lite.Interpreter(model_path="ai/converted_model.tflite")
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

class_names = json.load(open('ai/classes.json', 'r'))

def process_image(data):
    print("Processing image")
    header, encoded = data.split(",", 1)
    image_data = base64.b64decode(encoded)
    image = Image.open(io.BytesIO(image_data))
    image = image.resize((224, 224))
    image_array = np.array(image)
    image_array = np.expand_dims(image_array, axis=0).astype(np.float32)
    
    # tf-Lite API
    interpreter.set_tensor(input_details[0]['index'], image_array)
    interpreter.invoke()
    pred = interpreter.get_tensor(output_details[0]['index'])
    
    predicted_value = class_names[pred.argmax()]
    return predicted_value

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        if data is not None:
            start_time = time.time()
            predicted_value = process_image(data)
            print(f"Received frame data: {predicted_value}")
            print(f"Processing time: {round(time.time()-start_time, 5)*1000} ms")
            await websocket.send_text(predicted_value)

if __name__ == "__main__":
    
    uvicorn.run('app:app', host="localhost", port=8000, reload=True)