const cardContainers = document.querySelector('.container');

class Book
{
    #title;
    #author;
    #pages;
    #isRead;

    constructor(title, author, pages, isRead)
    {
        this.#title = title;
        this.#author = author;
        this.#pages = pages;
        this.#isRead = isRead;
    }

    get informations()
    {
        const readStatus = this.#isRead ? "finished reading" : "not read yet";
        return `${this.#title} by ${this.#author}, ${this.#pages} pages, ${readStatus}`;
    }

    get title() { return this.#title; }
    get author() { return this.#author; }
    get pages() { return this.#pages; }
    get isRead() { return this.#isRead; }

    switchReadStatus()
    {
        this.#isRead = !this.#isRead;
    }
}

class Library
{
    #books;

    constructor(...books)
    {
        this.#books = Array.from([...books]).map((book, _, __) => { id: crypto.randomUUID, book });
    }

    addBook(book)
    {
        this.#books.push({ id: crypto.randomUUID(), book });
    }

    removeBook(bookId)
    {
        this.#books = this.#books.filter((book, _, __) => book.id != bookId);
    }

    switchReadStatus(bookId)
    {
        this.#books.find((book, _, __) => book.id === bookId).book.switchReadStatus();
    }

    get getBooks()
    {
        return this.#books;
    }
}

function displayBooks(library)
{
    while (cardContainers.hasChildNodes())
    {
        cardContainers.removeChild(cardContainers.firstChild);
    }

    library.getBooks.forEach(item =>
    {
        const card = document.createElement("div");
        card.dataset.id = item.id;
        card.classList.add("card");
        const name = document.createElement("h2");
        name.textContent = item.book.title;
        const author = document.createElement("h3");
        author.textContent = `By ${item.book.author}`;
        const pages = document.createElement("div");
        pages.textContent = `${item.book.pages} pages`;
        const readStatus = document.createElement("div");
        readStatus.textContent = item.book.isRead ? "Finished reading" : "Not read yet";
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "X";
        removeBtn.addEventListener("click", event =>
        {
            library.removeBook(event.target.parentNode.dataset.id);
            displayBooks(library);
        });
        const switchReadBtn = document.createElement("button");
        switchReadBtn.textContent = "Switch Read Status";
        switchReadBtn.addEventListener("click", event =>
        {
            library.switchReadStatus(event.target.parentNode.dataset.id);
            displayBooks(library);
        });

        card.appendChild(removeBtn);
        card.appendChild(name);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(readStatus);
        card.appendChild(switchReadBtn);
        cardContainers.appendChild(card);
    })
}

const library = new Library();

const dialog = document.querySelector("dialog");
const closeModal = document.querySelector(".close");
const form = document.querySelector("form");
const addButton = document.querySelector(".add");
const submitButton = document.querySelector(".submit");

const titleForm = document.querySelector("#title");
const authorForm = document.querySelector("#author");
const pagesForm = document.querySelector("#pages");
const readForm = document.querySelector("#read");

addButton.addEventListener("click", () => dialog.showModal());

closeModal.addEventListener("click", () =>
{
    form.reset();
    dialog.close();
});

dialog.addEventListener("close", event => 
{
    if (!(event.target.returnValue === "true"))
    {
        return;
    }

    library.addBook(new Book(titleForm.value, authorForm.value, pagesForm.value, readForm.checked));
    displayBooks(library);
    form.reset();
});

submitButton.addEventListener("click", event => 
{
    if (!form.checkValidity())
    {
        return;
    }
    event.preventDefault();
    dialog.close(true);
});

library.addBook(new Book("The Hobbit", "J.R.R. Tolkien", 295, false));

displayBooks(library);