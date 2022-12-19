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
        console.log(index);
        const bookTable = document.createElement('table');
        const readSwitch = document.createElement('input');
        const readLabel = document.createElement('label');
        readSwitch.setAttribute('type','checkbox');
        readSwitch.setAttribute('class','checkbox');
        readSwitch.setAttribute('id','switch' + index);
        readLabel.setAttribute('for','switch' + index)
        readLabel.setAttribute('class','toggle');

        for (const [key,value] of Object.entries(book)) {
            // console.log(`${key}: ${value}`);
            const tr = document.createElement('tr');
            const th = document.createElement('th');
            const td = document.createElement('td');

            const thText = document.createTextNode(key);
            const tdText = document.createTextNode(value);

            th.appendChild(thText);
            td.appendChild(tdText);
            td.setAttribute('class',key);

            tr.appendChild(th);
            tr.appendChild(td);
            bookTable.appendChild(tr);
        }
        console.log(bookTable.rows[3].cells[1].innerText);
        if (bookTable.rows[3].cells[1].innerText === 'true') {
            readSwitch.setAttribute('checked','checked');
        }
        contentDiv.appendChild(bookTable);
        // const readLabelText = document.createElement('p');

        readSwitch.addEventListener('change', (event) => {
            if (event.currentTarget.checked) {
                console.log('checked');
            } else {
                console.log('unchecked');
            }
            updateReadValue(book);
        })
        // readLabelText.innerText = 'UNREAD    READ';

        // readLabel.appendChild(readLabelText);
        contentDiv.appendChild(readSwitch);
        contentDiv.appendChild(readLabel);
        ++index;
    })
}

function updateReadValue(book) {
    
}

displayLibrary();
console.log(myLibrary);
let book1 = new Book("best book","me",214,true);
let book2 = new Book("worst book","you",214,false);
addBookToLibrary(book1);
addBookToLibrary(book2);
console.log(myLibrary);