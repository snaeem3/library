let myLibrary = [];

function Book(title,author,pages,read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

const addBookBtn = document.querySelector('#addBookButton');
addBookBtn.addEventListener('click', () => {
    openBookForm();
});

function openBookForm() {
    document.querySelector('#newBookForm').style.display = "block";
}

const submitBookInfo = document.querySelector('#submitBookInfo');
submitBookInfo.addEventListener('click', (event) => {
    event.preventDefault();
    
    addBookToLibrary(Book(
        document.querySelector("#title").value,
        document.querySelector("#author").value,
        document.querySelector("#pages").value,
        document.querySelector("#read").checked
    ))

    closeBookForm();
});

function closeBookForm() {
    document.querySelector('#newBookForm').style.display = "none";
}

console.log(myLibrary);
let book1 = Book("best book","me",214,true);
let book2 = Book("worst book","me",214,true);
addBookToLibrary(book1);
addBookToLibrary(book2);
console.log(myLibrary);