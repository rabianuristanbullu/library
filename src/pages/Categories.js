import React from "react";
import Header from "../components/Header";
import { useNavigate, Link} from "react-router-dom";
import { useSelector } from "react-redux";
import { upperFirstLetter } from "../utils/function";
import api from "../api/api";
import urls from "../api/urls";
import { useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";

const Categories = () => {
  const navigate = useNavigate();
  const dispatch =useDispatch()
  const { booksState, categoriesState } = useSelector((state) => state);
  const deleteFunction=(id)=>{
    api.delete(`${urls.categories}/${id}`)
    .then((res)=>{
      dispatch({type:actionTypes.categoryAction.DELETE_CATEGORIES,payload:id})
      dispatch({type:actionTypes.bookActions.DELETE_BOOKS_AFTER_DELETE_CATEGORY,payload:id})
    })
    .catch((err)=>{

    })
  }
  return (
    <div>
      <Header />
      <div className="container my-5">
        <div className="d-flex justify-content-end">
          <button onClick={()=>{navigate("/categories-add-page")}} type="button" class="btn btn-success w-25">
            KATEGORİ EKLE
          </button>
        </div>
        {categoriesState.categories.length === 0 && (
          <div classNameName="my-5 d-flex justify-content-center">
            <div className="alert alert-success" role="alert">
              LİSTELENECEK KATEGORİ BULUNAMAMIŞTIR
            </div>
          </div>
        )}
        {categoriesState.categories.length > 0 && (
          <div classNameName="container my-5">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Sıra No</th>
                  <th scope="col">Kategori Adı</th>
                  <th scope="col">Kitap Sayısı</th>
                  <th scope="col">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {categoriesState.categories.map((category, index) => {
                  const myBooks = booksState.books.filter(
                    (item) => item.categoryId === category.id
                  );
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{upperFirstLetter(category.name)}</td>
                      <td>{myBooks.length}</td>
                      <td>
                        <div
                          className="btn-group gap-1"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button onClick={()=>{deleteFunction(category.id)}} type="button" className="btn btn-danger">
                            SİL
                          </button>
                          
                          <Link to={`/edit-category/${category.id}`} className="btn btn-warning btn-sm">
                        Güncelle
                      </Link>
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
    </div>
  );
};

export default Categories;
