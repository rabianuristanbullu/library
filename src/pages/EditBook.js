import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { upperFirstLetter } from "../utils/function";
import api from "../api/api";
import urls from "../api/urls";

import actionTypes from "../redux/actions/actionTypes";

const EditBook = () => {
  const { bookId } = useParams();
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const { booksState, categoriesState } = useSelector((state) => state);
  const myBooks = booksState.books.find((item) => item.id === bookId);
  const myCategories = categoriesState.categories.find(
    (item) => item.id === myBooks.categoryId
  );
  const [error,setError]=useState(false)
  const [errorText,setErrorText]=useState("")
  const [errorAuthor,setErrorAuthor]=useState(false)
  const [errorTextAuthor,setErrorTextAuthor]=useState("")
 
  const [form,setForm]=useState(myBooks)
  const formHandle=(event)=>{
    event.preventDefault()
    // validation
    if(form.title===""){
        setError(true)
        setErrorText("Kitap Adı Boş Bırakılamaz")
        setTimeout(() => {
            setError(false)
        }, 3000);
    }
    if(form.author===""){
        setErrorAuthor(true)
        setErrorTextAuthor("Yazar Adı Boş Bırakılamaz")
        setTimeout(() => {
            setErrorAuthor(false)
        }, 3000);
    }
    if(form.categoryId==="empty"){
       alert("KATEGORİ ALANI ZORUNLUDUR")
    }

    //api ile iletişimm
    api.put(`${urls.books}/${bookId}`,form)
    .then((res)=>{
      dispatch({type:actionTypes.bookActions.EDIT_BOOK,payload:form}) 
      navigate("/")
      
    })
    
    .catch((err)=>{
        console.log(err)
    })

  }
  return (
    <div>
      <div className="container my-5">
        <form onSubmit={formHandle}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Kitap Adı
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Kürk Mantolu Madonna"
              value={form.title}
              onChange={(event)=>
                setForm({...form, title: event.target.value})}
            />
            {
                error===true &&
                (<p><small className="text-danger">{errorText}</small></p>)
            }
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">
              Yazar Adı
            </label>
            <input
              type="text"
              className="form-control"
              id="author"
              placeholder="Sabahattin Ali"
              value={form.author}
              onChange={(event)=>
                setForm({...form, author: event.target.value})}
              
            />
             {
                errorAuthor===true &&
                (<p><small className="text-danger">{errorTextAuthor}</small></p>)
            }
          </div>
          <div className="mb-3">
            <label htmlFor="publisher" className="form-label">
              Yayınevi
            </label>
            <input
              type="text"
              className="form-control"
              id="publisher"
              placeholder="YKY"
              value={form.publisher}
              onChange={(event)=>
                setForm({...form, publisher: event.target.value})}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Kitap Fiyatı
            </label>
            <input
              type="text"
              className="form-control"
              id="price"
              placeholder="150 ₺"
              value={form.price}
              onChange={(event)=>
                setForm({...form, price: event.target.value})}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="isbn" className="form-label">
              ISBN
            </label>
            <input
              type="text"
              className="form-control"
              id="isbn"
              placeholder="xxxxxxxxx"
              value={form.isbn}
              onChange={(event)=>
                setForm({...form, isbn: event.target.value})}
            />
          </div>
          <select
            className="form-select"
            value={form.categoryId}
            onChange={(event) => {
              setForm({
                ...form,
                categoryId: event.target.value,
              });
            }}
          >
            <option value="empty">Kategori Seçin</option>
            {categoriesState.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {upperFirstLetter(category.name)}
              </option>
            ))}
          </select>
          <div className="d-flex justify-content-center my-5 ">
            <button type="submit" className="btn btn-success p-3">
              Success
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
