import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';
import { InputBox } from './components/InputBox';
import { BooksList } from './components/BooksList';
import axios from 'axios';
import { CustomButton } from './components/Button';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
function App() {
  const [bookName, setBookName] = useState('');
  const [bookPrice, setBookPrice] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks(); // Properly invoking the fetch function
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/books/`);
      setBooks(response.data); // Ensure the data is set to state correctly
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const addBookHandler = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/books/create', {
        title: bookName,
        price: bookPrice,
      });
      setBooks([...books, response.data]); // Append the newly added book to the list
      setBookName('');
      setBookPrice('');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex flex-col items-center">
      <h1 className="text-center text-xl font-bold">Book Website</h1>
      <Card>
        <div className="text-lg">Add a Book</div>
        <div>
          <InputBox
            placeholder="Book Name"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
          <InputBox
            placeholder="Book Price"
            value={bookPrice}
            onChange={(e) => setBookPrice(e.target.value)}
          />
          <CustomButton name="Add Book" onClick={addBookHandler} />
        </div>
      </Card>
      <div className=' w-[50%]'>
        <h2 className="text-center mt-5 text-lg font-semibold">Books:</h2>
        <BooksList books={books} setBooks={setBooks} />
      </div>
    </div>
  );
}

export default App;
