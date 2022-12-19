let myLibrary = [];

function Book(title,author,pages,read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayLibrary();
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

    addBookToLibrary(new Book(
        document.querySelector("#title").value,
        document.querySelector("#author").value,
        parseInt(document.querySelector("#pages").value),
        document.querySelector("#read").checked
    ))

    closeBookForm();
});

function closeBookForm() {
    document.querySelector('#newBookForm').style.display = "none";
}

function displayLibrary() {
    const contentDiv = document.querySelector('#content');
    // Clear existing books
    while (contentDiv.firstChild) {
        contentDiv.removeChild(contentDiv.firstChild);
    }

    // Loop through each book in library
    let index = 0;
    myLibrary.forEach((book) => {
        // console.log(index);
        const bookTable = document.createElement('table');
        for (const [key,value] of Object.entries(book)) {
            // console.log(`${key}: ${value}`);
            const tr = document.createElement('tr');
            const th = document.createElement('th');
            const td = document.createElement('td');

            const thText = document.createTextNode(key);
            const tdText = document.createTextNode(value);

            th.appendChild(thText);
            td.appendChild(tdText);

            tr.appendChild(th);
            tr.appendChild(td);
            bookTable.appendChild(tr);
        }
        contentDiv.appendChild(bookTable);

        const readSwitch = document.createElement('input');
        const readLabel = document.createElement('label');
        const readLabelText = document.createElement('p');

        readSwitch.setAttribute('type','checkbox');
        readSwitch.setAttribute('id','switch' + index);
        readLabel.setAttribute('for','switch' + index)
        readLabel.setAttribute('class','toggle');
        readLabelText.innerText = 'UNREAD    READ';

        readLabel.appendChild(readLabelText);
        contentDiv.appendChild(readSwitch);
        contentDiv.appendChild(readLabel);
        ++index;
    })
}

displayLibrary();
console.log(myLibrary);
let book1 = new Book("best book","me",214,true);
let book2 = new Book("worst book","you",214,true);
addBookToLibrary(book1);
addBookToLibrary(book2);
console.log(myLibrary);