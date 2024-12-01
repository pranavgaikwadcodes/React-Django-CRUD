import { useState } from 'react'
import './App.css'
import Card from './components/Card'
import { InputBox } from './components/InputBox'

function addBookHandler() {

}

function App() {
  const [bookName, setBookName] = useState('')
  const [bookPrice, setBookPrice] = useState('')
  return (
    <>
      <div className='bg-slate-300 h-screen'>
        <h1>Book Website</h1>
        <Card>
          <div className="text-lg">
            Add books
          </div>
          <div>
            <InputBox
              placeholder={`Book Name`}
              onChnage={(e) => {
                setBookName(e.target.value)
                console.log(bookName);
              }} />

            <InputBox
              placeholder={`Book Price`}
              onChnage={(e) => {
                setBookPrice(e.target.value)
                console.log(bookPrice);
              }} />

            <button 
            type="button" 
            class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 mt-4"
            onClick={addBookHandler}
            >
              Add Book
            </button>

          </div>
        </Card>
      </div>
    </>
  )
}

export default App
