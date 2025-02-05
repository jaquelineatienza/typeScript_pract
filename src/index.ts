import { nanoid } from 'nanoid'

import fs from 'node:fs/promises'
import path from 'node:path'

const __dirname = import.meta.dirname

// interface: structure for defining the content of an object
interface Book {
    id: string;
    title: string;
    price: string;
}

const filePath = path.resolve(__dirname, "../data/books.json")
console.log(filePath)
try {
    const data = await fs.readFile(filePath, { encoding: "utf-8" })
    console.log(data)

} catch (error) {
    console.log(error)
}

// funtion for read books
const readFile = async () => {

    try {
        const data = await fs.readFile(filePath, 'utf-8');

        return JSON.parse(data)
    } catch (error) {
        console.log(error)
    }
}
// Function to convert arrays into json objects
const writeFile = async (books: Book[]) => {
    await fs.writeFile(filePath, JSON.stringify(books, null, 2))
}

const getBooks = async () => {
    try {
        const books = await readFile();
        console.log(books)
    } catch (error) {
        console.log(error)
    }
}

const addBook = async (book: Book) => {
    try {
        const books = await readFile();
        books.push(book)
        await writeFile(books);
        console.log('book added successfully')
    } catch (error) {
        console.log(error)

    }
}

const deleteBook = async (id: string) => {
    try {
        const books = await readFile();
        const newBooks = books.filter((book: Book) => book.id !== id)
        await writeFile(newBooks)
    } catch (error) {

    }
}
const updateBook = async (updateBook: Book) => {
    try {
        const books = await readFile();
        const book = books.find((book: Book) => book.id === updateBook.id);
        if (!book) {
            console.log("book not found");
            return
        }

        const index = books.indexOf(book);
        books[index] = { ...book, ...updateBook };
        await writeFile(books);

        console.log('Book updated successfully')
    } catch (error) {
        console.log(error)
    }
}

await addBook({
    id: nanoid(),
    title: "New Book",
    price: "19.99",
});

await updateBook({ id: "8clLYrMCFMQoBvkligYZd", title: "update book3", price: "30.1" });
await deleteBook("8clLYrMCFMQoBvkligYZd")

await getBooks()
