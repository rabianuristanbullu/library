import React from "react";

import { useSelector } from "react-redux"
import Header from "../components/Header";
import ListBooks from "../components/ListBooks";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Home=()=>{
    const navigate=useNavigate()
    const {booksState,categoriesState}=useSelector(state=>state)
    console.log(booksState);
    console.log(categoriesState);
    return(
        <div>
            <Header/>
            <div className="container my-5">
            <div className="d-flex justify-content-end">
          <Button className="btn-success" text="Kitap Ekle" onClick={()=>navigate("/add-book")} />
        </div>
            <ListBooks/>

            </div>
            
        </div>
    )
}

export default Home