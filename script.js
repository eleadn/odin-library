const onErrorNewNotUsedConstructor = "A constructor should be called using the 'new' keyword.";

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