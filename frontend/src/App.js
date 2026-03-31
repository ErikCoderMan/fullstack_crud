const API = "http://127.0.0.1:8000/books";

const root = document.getElementById("root");

let books = [];

async function fetchBooks() {
    const res = await fetch(API);
    books = await res.json();
    render();
}

async function addBook(title, author) {
    await fetch(API, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({title, author})
    });
    fetchBooks();
}

async function updateBook(id, title, author) {
    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({title, author})
    });
    fetchBooks();
}

async function deleteBook(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchBooks();
}

function render() {
    root.innerHTML = `
        <h1>Books CRUD</h1>
        <div>
            <input id="title" placeholder="Title">
            <input id="author" placeholder="Author">
            <button id="addBtn">Add Book</button>
        </div>
        <ul>
            ${books.map(b => `
                <li>
                    ${b.title} by ${b.author}
                    <button data-id="${b.id}" class="editBtn">Edit</button>
                    <button data-id="${b.id}" class="delBtn">Delete</button>
                </li>
            `).join("")}
        </ul>
    `;

    document.getElementById("addBtn").onclick = () => {
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        addBook(title, author);
    };

    document.querySelectorAll(".editBtn").forEach(btn => {
        btn.onclick = () => {
            const b = books.find(bk => bk.id == btn.dataset.id);
            const newTitle = prompt("Title:", b.title);
            const newAuthor = prompt("Author:", b.author);
            updateBook(b.id, newTitle, newAuthor);
        };
    });

    document.querySelectorAll(".delBtn").forEach(btn => {
        btn.onclick = () => deleteBook(btn.dataset.id);
    });
}

// Initial load
fetchBooks();