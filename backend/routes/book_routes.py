from fastapi import APIRouter, HTTPException
from models.book import Book
from schemas.book import BookCreate
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

router = APIRouter()

DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)

Book.metadata.create_all(bind=engine)

@router.post("/books")
def create_book(book: BookCreate):
    db = SessionLocal()
    db_book = Book(title=book.title, author=book.author)
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

@router.get("/books")
def get_books():
    db = SessionLocal()
    return db.query(Book).all()

@router.get("/books/{id}")
def get_book(id: int):
    db = SessionLocal()
    book = db.query(Book).filter(Book.id == id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

@router.put("/books/{id}")
def update_book(id: int, updated: BookCreate):
    db = SessionLocal()
    book = db.query(Book).filter(Book.id == id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    book.title = updated.title
    book.author = updated.author
    db.commit()
    return book

@router.delete("/books/{id}")
def delete_book(id: int):
    db = SessionLocal()
    book = db.query(Book).filter(Book.id == id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    db.delete(book)
    db.commit()
    return {"message": "Deleted"}