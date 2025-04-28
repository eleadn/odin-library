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

createBook("The Hobbit", "J.R.R. Tolkien", 295, false);
createBook("One Flew Over the Cuckoo's Nest", "Ken Kesey", 291, true);

displayBooks();