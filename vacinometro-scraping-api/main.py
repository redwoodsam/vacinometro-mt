from dotenv import load_dotenv
load_dotenv()

from flask import Flask
import json
from controllers.scrape_controller import controller



app = Flask(__name__)

@app.route('/')
async def scrape():
    result = await controller()
    return json.dumps(result)
