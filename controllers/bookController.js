import prisma from "../utils/prisma.js";

export const addBook = async (req, res) => {
  try {

    const { title, author, isbn, availability } = req.body;

    // Add new book to the db
    const book = await prisma.books.create({
      data: { title, author, isbn, availability },
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const borrowBook = async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    const { user_id } = req.body;

    // Check if book is available
    const book = await prisma.books.findUnique({ where: { id: bookId } });
    if (!book || !book.availability) {
      return res.status(400).json({ error: 'Book not available.' });
    }

    // Update book availability 
    await prisma.books.update({
      where: { id: bookId },
      data: { availability: false },
    });

    // Create transaction
    const transaction = await prisma.transactions.create({
      data: { user_id, book_id: bookId, borrowed_at: new Date() },
    });

    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const returnBook = async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);

    // Check if the book is borrowed
    const book = await prisma.books.findUnique({ where: { id: bookId } });
    if (!book || book.availability) {
      return res.status(400).json({ error: 'Book is not currently borrowed.' });
    }

    // Update book availability and close transaction
    await prisma.books.update({
      where: { id: bookId },
      data: { availability: true },
    });

    // Create transaction
    const transaction = await prisma.transactions.updateMany({
      where: { book_id: bookId, returned_at: null },
      data: { returned_at: new Date() },
    });

    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


