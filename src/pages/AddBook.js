import React, { useState } from "react";
import Header from "../components/Header";
import { useSelector,useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";
import { upperFirstLetter } from "../utils/function";

import api from "../api/api";
import urls from "../api/urls";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const { categoriesState } = useSelector((state) => state);
  const dispatch =useDispatch()
  const navigate=useNavigate()
  const [formState, setFormState] = useState({
    id: String(new Date().getTime()),
    title: "",
    author: "",
    publisher: "",
    price: "",
    isbn: "",
    categoryId: "empty",
  });

  const handleForm = (event) => {
    event.preventDefault();
    // validationn
    if (formState.categoryId === "empty") {
        alert("Kategori alanı zorunludur");
        return;
      }
      if (formState.title === "") {
        alert("Kitap adı zorunludur");
        return;
      }
      if (formState.author === "") {
        alert("Kitap yazarı zorunludur");
        return;
      }
 
      api
      .post(urls.books, formState)
      .then((res) => {
        dispatch({
          type: actionTypes.bookActions.ADD_BOOK,
          payload: formState,
        });
        navigate("/")
      })
      .catch((err) => {});
 
  };

  return (
    <div>
      <Header />
      <div className="container my-5">
        <form onSubmit={handleForm}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Kitap Adı
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Kürk Mantolu Madonna"
              value={formState.title}
              onChange={(event) =>
                setFormState({ ...formState, title: event.target.value })
              }
            />
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
              value={formState.author}
              onChange={(event) =>
                setFormState({ ...formState, author: event.target.value })
              }
            />
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
              value={formState.publisher}
              onChange={(event) =>
                setFormState({ ...formState, publisher: event.target.value })
              }
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
              value={formState.price}
              onChange={(event) =>
                setFormState({ ...formState, price: event.target.value })
              }
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
              value={formState.isbn}
              onChange={(event) =>
                setFormState({ ...formState, isbn: event.target.value })
              }
            />
          </div>
          <select
            className="form-select"
            value={formState.categoryId}
            onChange={(event) => {
              setFormState({
                ...formState,
                categoryId: event.target.value,
              });
            }}
          >
            <option  value="empty">
              Kategori Seçin
            </option>
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

export default AddBook;
