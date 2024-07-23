import asyncio
import websockets
import json
import os
import random

tracks = [
    {"name": "Track 1", "file": "tracks/JQSQ.mp3"},
    {"name": "Track 2", "file": "tracks/LKNS.mp3"},
    {"name": "Track 3", "file": "tracks/SLUO.mp3"},
    {"name": "Track 4", "file": "tracks/TFUQ.mp3"}
]
current_track_index = 0

async def send_track(websocket):
    global current_track_index
    track = tracks[current_track_index]
    with open(track["file"], "rb") as f:
        audio_data = f.read()
        message = json.dumps({
        "type": "track",
        "trackName": track["name"],
        # "audio": audio_data.decode('latin1')  # Convert binary data to string
        })
        print(f"Sending track {track['name']}")
        await websocket.send(message)
        await websocket.send(audio_data)  # Send audio data as binary

async def handler(websocket, path):
    global current_track_index
    await send_track(websocket)
    async for message in websocket:
        command = json.loads(message)
        if command["action"] == "next":
            current_track_index = (current_track_index + 1) % len(tracks)
        elif command["action"] == "random":
            current_track_index = random.randint(0, len(tracks) - 1)
        await send_track(websocket)

print(os.listdir('tracks'))
start_server = websockets.serve(handler, "localhost", 3000)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
