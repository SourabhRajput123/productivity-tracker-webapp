import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your_secret_key'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///site.db'  # You can change this to any other DB
    SQLALCHEMY_TRACK_MODIFICATIONS = False
