const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory "database" for books with financial titles
let books = [
    { id: 1, title: 'The Intelligent Investor', author: 'Benjamin Graham' },
    { id: 2, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki' },
    { id: 3, title: 'The Millionaire Next Door', author: 'Thomas J. Stanley' },
    { id: 4, title: 'Your Money or Your Life', author: 'Vicki Robin' },
    { id: 5, title: 'The Total Money Makeover', author: 'Dave Ramsey' },
    { id: 6, title: 'I Will Teach You to Be Rich', author: 'Ramit Sethi' },
    { id: 7, title: 'The Little Book of Common Sense Investing', author: 'John C. Bogle' },
    { id: 8, title: 'A Random Walk Down Wall Street', author: 'Burton G. Malkiel' },
    { id: 9, title: 'The Psychology of Money', author: 'Morgan Housel' },
    { id: 10, title: 'The Bogleheads\' Guide to Investing', author: 'Taylor Larimore' },
    { id: 11, title: 'The Simple Path to Wealth', author: 'JL Collins' },
    { id: 12, title: 'The Four Pillars of Investing', author: 'William J. Bernstein' }
];

// Helper function to generate new IDs
const generateId = () => {
    return books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
};

app.get('/', (req, res) => {
    res.send('Welcome to the Financial Books API! Use /books to access the book collection.');
});

// GET all books
app.get('/books', (req, res) => {
    res.json(books);
});

// GET a single book by ID
app.get('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(book => book.id === id);
    
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// POST a new book
app.post('/books', (req, res) => {
    if (!req.body.title || !req.body.author) {
        return res.status(400).json({ message: 'Title and author are required' });
    }
    
    const newBook = {
        id: generateId(),
        title: req.body.title,
        author: req.body.author
    };
    
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT (update) an existing book
app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(book => book.id === id);
    
    if (bookIndex === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }
    
    if (!req.body.title || !req.body.author) {
        return res.status(400).json({ message: 'Title and author are required' });
    }
    
    const updatedBook = {
        id: id,
        title: req.body.title,
        author: req.body.author
    };
    
    books[bookIndex] = updatedBook;
    res.json(updatedBook);
});

// DELETE a book
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(book => book.id === id);
    
    if (bookIndex === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }
    
    books.splice(bookIndex, 1);
    res.status(204).end();
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Initial financial books loaded:');
    books.forEach(book => {
        console.log(`- ${book.title} by ${book.author}`);
    });
});
