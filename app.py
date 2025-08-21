from flask import Flask, render_template, jsonify
import json
import os

app = Flask(__name__)

@app.route("/")
@app.route("/<path:path>")
def index(path=None):
    return render_template("index.html")

@app.route("/pages")
def get_pages():
    path = os.path.join(app.static_folder, "json", "pages.json")
    with open(path, "r", encoding="utf-8") as f:
        pages = json.load(f)
    return jsonify(pages)

if __name__ == "__main__":
    app.run(debug=True)