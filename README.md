# Fullstack CRUD App

Author: Erik Andersson

## Project Description

This is a simple fullstack CRUD application built with FastAPI (backend) and React (frontend).
You can create, read, update, and delete books through the frontend interface.

## Project Structure
backend/  - FastAPI backend  
frontend/ - React frontend  

## Getting Started
### Start Backend
```
cd backend
pip install -r requirements.txt
python app.py
```

The backend will start on http://127.0.0.1:8000 by default.

### Start Frontend
```
cd frontend
npm install
npm run dev
```

The frontend will start on http://localhost:5173 (or the URL shown in terminal).

## API Endpoints

- POST /books – create a new book
- GET /books – get all books
- GET /books/{id} – get a single book by ID
- PUT /books/{id} – update a book by ID
- DELETE /books/{id} – delete a book by ID

## Notes

- Make sure the backend is running before using the frontend.