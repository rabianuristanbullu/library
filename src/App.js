import React, { useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import Header from "./components/Header";
import actionTypes from "./redux/actions/actionTypes";
import urls from "./api/urls";
import axios from "axios";
import api from "./api/api";
import Loading from "./components/Loading";
import Error from "./components/Error";
import NotFound from "./pages/NotFound";
import AddBook from "./pages/AddBook";
import DetailsPage from "./pages/DetailsPage";
import EditBook from "./pages/EditBook";
import Categories from "./pages/Categories";
import AddCategory from "./pages/AddCategory";
import CategoriesEdit from "./pages/CategoriesEdit";

function App() {
  const { booksState, categoriesState } = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: actionTypes.bookActions.GET_BOOKS_START });
    api
      .get(urls.books)
      .then((res) => {
        setTimeout(() => {
          dispatch({
            type: actionTypes.bookActions.GET_BOOKS_SUCCESS,
            payload: res.data,
          });
        }, 1000);
      })
      .catch((err) => {
        
        dispatch({
          type: actionTypes.bookActions.GET_BOOKS_FAİL,
          payload: "Kitap Bilgileri Çekilirken Bir Hata Oluştu",
        });
      });

    dispatch({ type: actionTypes.categoryAction.GET_CATEGORY_START });
    api
      .get(urls.categories)
      .then((res) => {
        setTimeout(() => {
          dispatch({
            type: actionTypes.categoryAction.GET_CATEGORY_SUCCESS,
            payload: res.data,
          });
        }, 1000);
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.categoryAction.GET_CATEGORY_FAİL,
          payload:
            "Kategori Verileri Çekildiği Esnada Bİr Hata İle Karşılaşıldı",
        });
      });
  }, []);

  if (booksState.pending === true || categoriesState.pending === true)
    return <Loading />;

  if (booksState.error === true || categoriesState.error === true)
    return <Error />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories-page" element={<Categories/>} />
        <Route path="/categories-add-page" element={<AddCategory/>} />
        <Route path="/edit-category/:categoryId" element={<CategoriesEdit/>} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="*" element={<NotFound/>}/>
        <Route path="/detail-book/:bookId" element={<DetailsPage/>}/>
        <Route path="/edit-book/:bookId" element={<EditBook/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
