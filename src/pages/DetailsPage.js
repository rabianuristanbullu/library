import React from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { upperFirstLetter } from "../utils/function";

const DetailsPage = () => {
  const { bookId } = useParams();
  const { booksState, categoriesState } = useSelector((state) => state);
  const myBook = booksState.books.find((item) => item.id === bookId);
  const myCategory = categoriesState.categories.find(
    (item) => item.id === myBook.categoryId
  );
  const navigate=useNavigate()

  console.log(myCategory);
  return (
    <div>
      <Header />
      <div className="container my-5">
        <div className="card">
          <div className="card-headerc text-center ">
            
            <h1>KİTAP DETAYLARI</h1>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Kitap Adı: {myBook.title}</li>
            <li className="list-group-item">Kitap Yazarı: {myBook.author}</li>
            <li className="list-group-item">
              Yayınevi:
              {myBook.publisher === ""
                ? "Belirtilmemiş"
                : upperFirstLetter(myBook.publisher)}
            </li>
            <li className="list-group-item">
              Fiyatı:
              {myBook.price === ""
                ? "Belirtilmemiş"
                : upperFirstLetter(myBook.price)}
            </li>
            <li className="list-group-item">
              ISBN:
              {myBook.isbn === ""
                ? "Belirtilmemiş"
                : upperFirstLetter(myBook.isbn)}
            </li>
            <li className="list-group-item">Kategori: {myCategory.name}</li>
            
          </ul>
          
        </div>
        <div className="d-flex justify-content-center">
        <button className="btn btn-lg btn-success my-5 " onClick={()=>{navigate("/")}}>Geri</button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
