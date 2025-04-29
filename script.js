const onErrorNewNotUsedConstructor = "A constructor should be called using the 'new' keyword.";
const myLibrary = [];
const cardContainers = document.querySelector('.container');

function Book(title, author, pages, isRead)
{
    if (!new.target)
    {
        throw error(onErrorNewNotUsedConstructor)
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.info = function()
{
    const readStatus = this.isRead ? "finished reading" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
}

function createBook(title, author, pages, isRead)
{
    myLibrary.push(
        {
            id: crypto.randomUUID(),
            book: new Book(title, author, pages, isRead),
        });
}

function displayBooks()
{
    while (cardContainers.hasChildNodes())
    {
        cardContainers.removeChild(cardContainers.firstChild);
    }

    myLibrary.forEach(item =>
    {
        const card = document.createElement("div");
        card.classList.add("card");
        const name = document.createElement("h2");
        name.textContent = item.book.title;
        const author = document.createElement("h3");
        author.textContent = `By ${item.book.author}`;
        const pages = document.createElement("div");
        pages.textContent = `${item.book.pages} pages`;
        const readStatus = document.createElement("div");
        readStatus.textContent = item.book.isRead ? "Finished reading" : "Not read yet";

        card.appendChild(name);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(readStatus);
        cardContainers.appendChild(card);
    })
}

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

    createBook(titleForm.value, authorForm.value, pagesForm.value, readForm.checked);
    displayBooks();
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


createBook("The Hobbit", "J.R.R. Tolkien", 295, false);
createBook("One Flew Over the Cuckoo's Nest", "Ken Kesey", 291, true);

displayBooks();