
from flask import Flask, render_template, redirect, url_for
import markdown

app = Flask(__name__, static_folder='styles')

@app.route('/')
def home():
    return redirect(url_for('introduction'))

@app.route("/introduction")
def introduction():
    with open("content/introduction.md", "r", encoding="utf-8") as f:
        md_text = f.read()
    
    html_content = markdown.markdown(md_text)

    return render_template("index.html", content=html_content)

@app.route("/character-creation")
def character_creation():
    with open("content/character-creation.md", "r", encoding="utf-8") as f:
        md_text = f.read()
    
    html_content = markdown.markdown(md_text)

    return render_template("index.html", content=html_content)

@app.route("/rolling-the-dice")
def rolling_the_dice():
    with open("content/rolling-the-dice.md", "r", encoding="utf-8") as f:
        md_text = f.read()
    
    html_content = markdown.markdown(md_text)

    return render_template("index.html", content=html_content)

if __name__ == '__main__':
    app.run(debug=True)
