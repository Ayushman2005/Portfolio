from flask import Flask, render_template, request, jsonify, session, redirect, url_for, flash
from flask_cors import CORS
import os
import json
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
import requests

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", "super_secret_key")

# Configuration

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, 'portfolio_data.json')
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'static', 'images')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['ADMIN_USERNAME'] = os.getenv("ADMIN_USERNAME")
app.config['ADMIN_PASSWORD'] = os.getenv("ADMIN_PASSWORD")

# Ensure upload directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

CORS(app, resources={r"/*": {"origins": ["https://ayushman-kar.netlify.app", "http://localhost:5173"]}})

# Helper functions for JSON data
def load_data():
    try:
        with open(DATA_FILE, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return {
            "name": "Ayushman Kar",
            "bio": "Passionate engineering student...",
            "email": "karayushman736@gmail.com",
            "phone": "+91 93485 12092",
            "location": "Bargarh, Odisha, India",
            "projects": [], 
            "skills": [], 
            "certifications": [], 
            "experience": []
        }

def save_data(data):
    with open(DATA_FILE, 'w') as file:
        json.dump(data, file, indent=4)

# --- PUBLIC ROUTES ---
@app.route('/')
def home():
    return {"status": "Backend is running!"}

@app.route('/')
def index():
    data = load_data()
    return render_template('index.html', data=data)

@app.route('/api/data')
def get_data():
    return jsonify(load_data())

@app.route('/api/projects')
def get_projects():
    return jsonify(load_data()['projects'])

@app.route('/api/chat', methods=['POST'])
def chat():
    data = load_data()
    user_message = request.json.get('message')
    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    try:
        context = f"""
You are an AI assistant for a portfolio website. Your purpose is to answer questions about the portfolio owner based ONLY on the following context. If you don't know the answer or the information is not in the context, politely inform the user that you don't have that information. Answer concisely and professionally.

Context:
Name: {data.get('name')}
Title: {data.get('title')}
Bio: {data.get('bio')}
Email: {data.get('email')}
Phone: {data.get('phone')}
Location: {data.get('location')}

Skills: {json.dumps(data.get('skills', []))}
Projects: {json.dumps(data.get('projects', []))}
Certifications: {json.dumps(data.get('certifications', []))}
Experience: {json.dumps(data.get('experience', []))}

User Question: {user_message}
Answer:"""
        
        # Call Local Ollama instance (defaulting to llama3, ensure it's pulled: `ollama pull llama3`)
        payload = {
            "model": "llama3",  # You can change this to "mistral", "phi3", etc.
            "prompt": context,
            "stream": False
        }
        
        # Note: Default Ollama port is 11434
        response = requests.post("http://localhost:11434/api/generate", json=payload)
        
        if response.status_code == 200:
            result = response.json()
            return jsonify({"response": result.get("response", "")})
        else:
            print(f"Ollama Error Status: {response.status_code}")
            return jsonify({"error": "Failed to generate response from Ollama"}), 500

    except requests.exceptions.ConnectionError:
        print("Connection error: Is Ollama running?")
        return jsonify({"error": "Cannot connect to local AI model. Make sure Ollama is running."}), 503
    except Exception as e:
        print(f"Chat error: {e}")
        return jsonify({"error": "Failed to generate response"}), 500


# --- ADMIN ROUTES ---
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        if username and password and username == app.config.get('ADMIN_USERNAME') and password == app.config.get('ADMIN_PASSWORD'):
            session['logged_in'] = True
            return redirect(url_for('admin_dashboard'))
        else:
            flash('Invalid credentials')
            
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('login'))

@app.route('/admin')
def admin_dashboard():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    
    data = load_data()
    return render_template('admin.html', projects=data['projects'])

@app.route('/admin/add_project', methods=['POST'])
def add_project():
    if not session.get('logged_in'):
        return redirect(url_for('login'))

    data = load_data()
    
    # Handle Image Upload
    file = request.files['image']
    filename = ""
    if file and file.filename != '':
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    
    # Process technologies string into a list
    tech_string = request.form.get('technologies', '')
    tech_list = [tech.strip() for tech in tech_string.split(',') if tech.strip()]

    # Create new project object
    new_project = {
        'title': request.form.get('title'),
        'description': request.form.get('description'),
        'technologies': tech_list,
        'image': filename,
        'github': request.form.get('github', '#'),
        'demo': request.form.get('demo', '#')
    }
    
    # Append and save
    data['projects'].append(new_project)
    save_data(data)
    
    flash('Project added successfully!')
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/add_skill', methods=['POST'])
def add_skill():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    
    data = load_data()
    new_skill = {
        'name': request.form.get('name'),
        'level': int(request.form.get('level', 0))
    }
    
    data['skills'].append(new_skill)
    save_data(data)
    
    flash('Skill added successfully!')
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/add_certification', methods=['POST'])
def add_certification():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    
    data = load_data()
    new_cert = {
        'title': request.form.get('title'),
        'issuer': request.form.get('issuer'),
        'date': request.form.get('date')
    }
    
    data['certifications'].append(new_cert)
    save_data(data)
    
    flash('Certification added successfully!')
    return redirect(url_for('admin_dashboard'))

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)