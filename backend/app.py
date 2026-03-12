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

CORS(app)

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
@app.route('/projects')
def get_projects():
    return jsonify(load_data().get('projects', []))

@app.route('/api/skills')
@app.route('/skills')
def get_skills():
    return jsonify(load_data().get('skills', []))

@app.route('/api/contact', methods=['POST'])
@app.route('/contact', methods=['POST'])
def contact():
    data = request.json
    if not data or not data.get('name') or not data.get('email') or not data.get('message'):
        return jsonify({"error": "Missing required fields"}), 400
    
    messages_file = os.path.join(BASE_DIR, 'messages.json')
    try:
        with open(messages_file, 'r') as file:
            messages = json.load(file)
    except FileNotFoundError:
        messages = []
        
    messages.append({
        "name": data['name'],
        "email": data['email'],
        "message": data['message']
    })
    
    with open(messages_file, 'w') as file:
        json.dump(messages, file, indent=4)
        
    return jsonify({"success": "Message saved successfully"}), 201


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