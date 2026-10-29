const myLibrary = [];

function Book(title, author, pages, read){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read){
    myLibrary.push(new Book(title, author, pages, read));
}
addBookToLibrary("bible", "paul", 1000, true);
addBookToLibrary("quran", "mohammed", 700, false);
addBookToLibrary("torah", "moses", 800, true);


const container = document.getElementById("library");
function displayBooks(){
    container.innerHTML = "";
   for (const book of myLibrary){
        
        const child = document.createElement("div")
        child.dataset.id = book.id
        container.appendChild(child)
        child.textContent = `${book.title} by ${book.author}, ${book.pages} pages, Read: ${book.read}`

        const removeButton = document.createElement("button")
        removeButton.textContent = "Remove"
        child.appendChild(removeButton)

        removeButton.addEventListener("click", () => {
            const index = myLibrary.findIndex(b => b.id === book.id);
            if (index !== -1) {
                myLibrary.splice(index, 1);
                container.removeChild(child);
            }
        });
        const toggleButton = document.createElement("button");
toggleButton.textContent = "Toggle Read";
child.appendChild(toggleButton);

toggleButton.addEventListener("click", () => {
  book.toggleRead();
  displayBooks();
});
    }
}
const form = document.getElementById("addBookForm");
const addBookButton = document.getElementById("addBookButton");
addBookButton.addEventListener("click", () => {
    form.style.display = "block";
});
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;


    addBookToLibrary(title, author, pages, read);
    displayBooks();

    form.reset();
    
    form.style.display = "none";
});
displayBooks();