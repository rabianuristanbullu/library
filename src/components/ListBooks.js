import React from "react";

import {  useSelector } from "react-redux";
import { upperFirstLetter } from "../utils/function";
import Button from "./Button";
import api from "../api/api";
import urls from "../api/urls";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import actionTypes from "../redux/actions/actionTypes";
const ListBooks = () => {
  const { booksState, categoriesState } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteButton = (id) => {
    api
      .delete(`${urls.books}/${id}`)
      .then((res) => {
        dispatch({ type: actionTypes.bookActions.DELETE_BOOK, payload: id });
      })
      .catch((err) => {
        alert("hataaa");
      });
  };
  return (
    <div>
      {booksState.books.length === 0 && (
        <div classNameName="my-5 d-flex justify-content-center">
          <div className="alert alert-success" role="alert">
            LİSTELENECEK KİTAP BULUNAMAMIŞTIR
          </div>
        </div>
      )}
      {booksState.books.length > 0 && (
        <div classNameName="container my-5">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Sıra No</th>
                <th scope="col">Kitap Adı</th>
                <th scope="col">Kategori</th>
                <th scope="col">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {booksState.books.map((book, index) => {
                const myCategories = categoriesState.categories.find(
                  (item) => item.id === book.categoryId
                );
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{book.title}</td>
                    <td>{upperFirstLetter(myCategories.name)}</td>
                    <td>
                    <div className="btn-group gap-2" role="group"> 
                    <Button
                        className="btn-sm "
                        text="Detay"
                        type="info"
                        onClick={()=>{navigate(`/detail-book/${book.id}`)}}
                      />
                      <Button
                        onClick={() => {
                          deleteButton(book.id);
                        }}
                        className="btn-sm"
                        text="Sil"
                        type="danger"
                      />
                      <Button
                        className="btn-sm"
                        text="Güncelle"
                        type="warning"
                        onClick={()=>{navigate(`/edit-book/${book.id}`)}}
                      />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListBooks;
