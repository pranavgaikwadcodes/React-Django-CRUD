import { useState } from 'react';
import axios from 'axios';

export const BooksList = ({ books, setBooks }) => {
    const [editableBookId, setEditableBookId] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newPrice, setNewPrice] = useState('');

    const handleEditClick = (book) => {
        setEditableBookId(book.id);
        setNewTitle(book.title);
        setNewPrice(book.price);
    };

    const handleUpdate = async (id) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/books/${id}`, {
                title: newTitle,
                price: newPrice,
            });
            const updatedBook = response.data;

            setBooks(books.map((book) => (book.id === id ? updatedBook : book)));

            setEditableBookId(null);
            setNewTitle('');
            setNewPrice('');
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/books/${id}`);
            setBooks(books.filter((book) => book.id !== id));
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <div className="p-3 m-2 rounded-xl min-w-[50%]">
            {books.length > 0 ? (
                <ul>
                    {books.map((book) => (
                        <li key={book.id} className="mt-2 bg-slate-200 p-2 rounded flex flex-col">
                            {editableBookId === book.id ? (
                                <div className="flex flex-col space-y-2">
                                    <input
                                        type="text"
                                        className="p-1 border rounded"
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        placeholder="New Title"
                                    />
                                    <input
                                        type="number"
                                        className="p-1 border rounded"
                                        value={newPrice}
                                        onChange={(e) => setNewPrice(e.target.value)}
                                        placeholder="New Price"
                                    />
                                    <button
                                        className="bg-green-500 text-white p-1 rounded"
                                        onClick={() => handleUpdate(book.id)}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="bg-gray-500 text-white p-1 rounded"
                                        onClick={() => setEditableBookId(null)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center">
                                    <span>
                                        <strong>{book.title}</strong> - Rs {book.price}
                                    </span>
                                    <div className="space-x-2">
                                        <button
                                            className="text-blue-800"
                                            onClick={() => handleEditClick(book)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-800"
                                            onClick={() => handleDelete(book.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No books available. Add a book to see it listed here!</p>
            )}
        </div>
    );
};
