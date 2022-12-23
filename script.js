const myLibrary = [];

function Book(title, author, pages, read) {
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
  addBookBtn.disabled = true;
});

const newBookForm = document.querySelector('#newBookForm');
function openBookForm() {
  newBookForm.style.display = 'block';
  newBookForm.reset();
}

newBookForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Do not submit form

  addBookToLibrary(
    new Book(
      document.querySelector('#title').value,
      document.querySelector('#author').value,
      parseInt(document.querySelector('#pages').value),
      document.querySelector('#book-read').checked
    )
  );

  closeBookForm();
});

const cancelBookInfo = document.querySelector('#cancelBookInfo');
cancelBookInfo.addEventListener('click', (event) => {
  closeBookForm();
});

function closeBookForm() {
  document.querySelector('#newBookForm').style.display = 'none';
  addBookBtn.disabled = false;
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
    const bookDiv = document.createElement('div');
    const bookTable = document.createElement('table');
    const readSwitch = document.createElement('input');
    const readLabel = document.createElement('label');
    const deleteBtn = document.createElement('button');

    bookDiv.setAttribute('class', 'bookDiv');
    readSwitch.setAttribute('type', 'checkbox');
    readSwitch.setAttribute('class', 'checkbox');
    readSwitch.setAttribute('id', `switch${index}`);
    readLabel.setAttribute('for', `switch${index}`);
    readLabel.setAttribute('class', 'toggle');
    deleteBtn.innerText = 'Delete';
    deleteBtn.setAttribute('id', `delete${index}`);
    deleteBtn.setAttribute('class', 'delete');

    for (const [key, value] of Object.entries(book)) {
      // console.log(`${key}: ${value}`);
      const tr = document.createElement('tr');
      const th = document.createElement('th');
      const td = document.createElement('td');

      const thText = document.createTextNode(key);
      const tdText = document.createTextNode(value);

      th.appendChild(thText);
      td.appendChild(tdText);
      td.setAttribute('class', key);

      tr.appendChild(th);
      tr.appendChild(td);
      bookTable.appendChild(tr);
    }
    console.log(bookTable.rows[3].cells[1].innerText);
    if (bookTable.rows[3].cells[1].innerText === 'true') {
      readSwitch.setAttribute('checked', 'checked');
    }

    bookDiv.appendChild(deleteBtn);
    bookDiv.appendChild(bookTable);
    // const readLabelText = document.createElement('p');

    readSwitch.addEventListener('change', (event) => {
      if (event.currentTarget.checked) {
        console.log('checked');
      } else {
        console.log('unchecked');
      }
      const libraryIndex = parseInt(event.currentTarget.id.substring(6)); // the id is 'switch[index]' so ignore first 6 characters
      updateReadValue(libraryIndex);
    });
    // readLabelText.innerText = 'UNREAD    READ';

    deleteBtn.addEventListener('click', (event) => {
      const libraryIndex = parseInt(event.currentTarget.id.substring(6)); // the id is 'delete[index]' so ignore first 6 characters
      deleteBook(libraryIndex);
    });

    // readLabel.appendChild(readLabelText);
    bookDiv.appendChild(readSwitch);
    bookDiv.appendChild(readLabel);
    contentDiv.appendChild(bookDiv);
    index += 1;
  });
}

function updateReadValue(libraryIndex) {
  myLibrary[libraryIndex].read = !myLibrary[libraryIndex].read;
  displayLibrary();
}

function deleteBook(libraryIndex) {
  myLibrary.splice(libraryIndex, 1);
  displayLibrary();
}

displayLibrary();
console.log(myLibrary);
const book1 = new Book('best book', 'me', 214, true);
const book2 = new Book('worst book', 'you', 214, false);
addBookToLibrary(book1);
addBookToLibrary(book2);
console.log(myLibrary);
