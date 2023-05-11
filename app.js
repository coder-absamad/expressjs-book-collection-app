const express = require('express');
const app = express();
const path = require('path');

const port = 3000;



// static HTML file
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



//JSON array of books 
const books = [];
app.get('/books', (req, res) => {
    res.json(books);
});



// post request
let nextId = 1;
app.post('/books', (req, res) => {
    const { title, author, publishedDate } = req.body;

    if (!title || !author) {
        return res.status(400).send('Title and author are required.');
    }
    const book = {
        id: nextId++,
        title,
        author,
        publishedDate,
    };

    books.push(book);
    res.json(book);
});



// delete request
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(book => book.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Book not found.' });
    }

    books.splice(index, 1);
    res.json({ message: 'Book successfully deleted.' });
});


app.listen(port, () => console.log(`Listening on port ${port}...`));
