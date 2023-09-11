import React, { useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { upperFirstLetter } from "../utils/function";
import urls from "../api/urls";
import api from "../api/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import actionTypes from "../redux/actions/actionTypes";

const CategoriesEdit = () => {
  const { categoryId } = useParams();
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const { categoriesState } = useSelector((state) => state);
  const myCategories = categoriesState.categories.find(
    (item) => item.id === categoryId
  );
  const [editForm, setEditForm] = useState(myCategories);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const editSubmit = (event) => {
    event.preventDefault();
    if (!editForm.name) {
      setError(true);
      setErrorMessage("Kategori Adı Boş Bırakılamaz!");
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }

    const hasCategory = categoriesState.categories.find(
      (item) =>
        upperFirstLetter(item.name.trim().replaceAll(" ", "")) ===
        upperFirstLetter(editForm.name.trim().replaceAll(" ", ""))
    );
    if (hasCategory) {
      setError(true);
      setErrorMessage(`${hasCategory.name} ismiyle zaten bir kategori mevcut`);
      setTimeout(() => {
        setError(true);
      }, 3000);
      return
    }

    // api call
    api.put(`${urls.categories}/${categoryId}`,editForm)
    .then((res)=>{
        dispatch({type:actionTypes.categoryAction.EDIT_CATEGORIES,payload:editForm})
        navigate("/categories-page")
    })
    .catch((err)=>{
        alert("hata")
    })
  };

  return (
    <div>
      <Header />
      <div
        className="mb-3 container my-5 w-50 "
        style={{
          border: "1px solid black",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "5px 5px grey",
        }}
      >
        <form onSubmit={editSubmit}>
          <label htmlFor="name" className="form-label ">
            <b>KATEGORİ ADI</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Kategori Adı Giriniz "
            value={editForm.name}
            onChange={(event) => {
              setEditForm({ ...editForm, name: event.target.value });
            }}
          />
          {error === true && (
            <p className="text-danger">
              <small>{errorMessage}</small>
            </p>
          )}

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-success my-3 btn-sm">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoriesEdit;
