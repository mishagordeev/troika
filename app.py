
from flask import Flask, render_template, redirect, url_for
import markdown
from pathlib import Path

app = Flask(__name__, static_folder='styles')

PAGES_DIR = Path("content")

@app.route('/')
def home():
    return redirect('/introduction')

@app.route("/<page_name>")
def md_page(page_name):
    filepath = PAGES_DIR / f"{page_name}.md"
    
    html_content = markdown.markdown(filepath.read_text(encoding="utf-8"))
    return render_template("index.html", content=html_content)

if __name__ == '__main__':
    app.run(debug=True)
