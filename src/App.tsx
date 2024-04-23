import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [app, setApp] = useState<AppItem[]>([])
  const [appSingle, setAppSingle] = useState<string>('')
  const [booksList, setBookList] = useState<Book[]>([])
  const [newBook, setNewBook] = useState<string>()
  const [autorBook, setAutorBook] = useState<string>()


useEffect(() => {
const sumarOConcatenar = <T extends string | number>(a: T, b: T): T  => {
  if(typeof a === "string" && typeof b === "string"){
   return a + b as T
  }
  else if(typeof a === "number" && typeof b === "number"){
   return a + b as T
  }
  else {
    throw new Error('Los argumentos deben ser del mismo tipo (string o number).');
  }
}

console.log(sumarOConcatenar("hola", "mundo"))
console.log(sumarOConcatenar(2 , 5))
}, [])




  interface AppItem{
    id: number;
    text: string;
    active: boolean;
  }

  interface Book{
    id: number;
    name: string;
    autor: string;
}


const onChangeBookName = (e: React.ChangeEvent<HTMLInputElement>) => {
setNewBook(e.target.value)
}
const onChangeBookAutor = (e: React.ChangeEvent<HTMLInputElement>) => {
  setAutorBook(e.target.value)
  }

const createNewBook = () => {
  let bookName = document.getElementById("bookName") as HTMLInputElement
  let bookAutor = document.getElementById("bookAutor") as HTMLInputElement

  if(autorBook && newBook){
    setBookList(prevState => ([...prevState, {id: Date.now(), name: newBook, autor: autorBook}]))
  setAutorBook("")
  setNewBook("")
  bookName.value = ""
  bookAutor.value = ""
  }
  else{
    alert("Escriba tanto el nombre como el autor del libro porfavor")
  }
}

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppSingle(e.target.value)
  }

  const onSubmit = () => {
    setApp(prevState => ([...prevState, { id: Date.now(), text: appSingle, active: false }]))
    setAppSingle('')
  }

  const deleteItem = (idItem: number) => {
    const filtracion = app.filter((item) => {
      return item.id !== idItem
    })

    setApp(filtracion)
  }
  const deleteItemBook = (idItem: number) => {
    const filtracion = booksList.filter((item) => {
      return item.id !== idItem
    })

    setBookList(filtracion)
  }


  const toggleActive = (id: number) => {
    setApp(prevState =>
      prevState.map(item =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  };


  // GESTION DE CONTACTOS
  

  
  
  


  return (
    <>
 <div>
  <h1>Deseas agregar el nombre de un libro?</h1>
  <input id='bookName' onChange={(e) => onChangeBookName(e)} placeholder='nombre libro' />
  <input id='bookAutor' onChange={(e) => onChangeBookAutor(e)} placeholder='autor libro' />
  <button onClick={createNewBook}>Enviar libro</button>
 </div>
 <div>
  <h1>Libros guardados en la biblioteca</h1>
  {
    booksList.map((book, index) => (
      <div className='book-container' key={index}>
        <h1>Nombre libro: {book.name}</h1>
        <h1>Autor libro: {book.autor}</h1>
        <h1>Id libro: {book.id}</h1>
        <button onClick={() => deleteItemBook(book.id)}>Eliminar libro</button>
      </div>
    )

    )
  }
 </div>


      <div className='container-onsubmit'>
      <input value={appSingle} onChange={onChange}/>
      <button onClick={onSubmit}>Agregar</button>
      </div>

      <ul>
       {app.map((item, index) => {
   return <li  className={item.active ? "active": ""} key={index} >{item.text} <button onClick={() => toggleActive(item.id)}>Completed</button> <button onClick={() => deleteItem(item.id)}>x</button></li>     
       })} </ul>
       
     
    </>
  )
}

export default App
