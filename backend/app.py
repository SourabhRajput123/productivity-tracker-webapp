from flask import Flask, render_template, redirect, url_for, flash, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from flask_cors import CORS  # Import CORS
from forms import RegistrationForm, LoginForm
from models import db, User, Task
from config import Config
from werkzeug.security import generate_password_hash, check_password_hash  # Import for password hashing

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
CORS(app)  # Enable CORS for all routes
login_manager = LoginManager(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
@login_required
def index():
    tasks = Task.query.filter_by(user_id=current_user.id).all()
    return render_template('index.html', tasks=tasks)

@app.route('/api/tasks', methods=['GET', 'POST'])  # Create a new API endpoint for tasks
@login_required
def tasks():
    if request.method == 'POST':
        data = request.get_json()  # Get the JSON data from the request
        new_task = Task(title=data['title'], user_id=current_user.id)  # Create a new Task instance
        db.session.add(new_task)
        db.session.commit()
        return jsonify({"message": "Task created successfully!"}), 201

    # Handle GET request to fetch tasks
    user_tasks = Task.query.filter_by(user_id=current_user.id).all()
    return jsonify([{'id': task.id, 'title': task.title} for task in user_tasks])

@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = generate_password_hash(form.password.data)  # Use generate_password_hash from Werkzeug
        user = User(username=form.username.data, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        flash('Your account has been created!', 'success')
        return redirect(url_for('login'))
    return render_template('register.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and check_password_hash(user.password, form.password.data):  # Use check_password_hash from Werkzeug
            login_user(user)
            return redirect(url_for('index'))
        else:
            flash('Login Unsuccessful. Please check username and password', 'danger')
    return render_template('login.html', form=form)

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
