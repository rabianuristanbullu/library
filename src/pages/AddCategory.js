import React, { useState } from "react";
import Header from "../components/Header";
import { useSelector,useDispatch } from "react-redux";
import { upperFirstLetter } from "../utils/function";
import api from "../api/api";
import urls from "../api/urls";
import { useNavigate } from "react-router-dom";
import actionTypes from "../redux/actions/actionTypes";

const AddCategory = () => {
    const dispatch =useDispatch()
    const navigate =useNavigate()
  const { categoriesState } = useSelector((state) => state);
  const [form, setForm] = useState({
    id: String(new Date().getTime()),
    name: "",
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const formSubmit = (event) => {
    event.preventDefault();
    // validation
    if (!form.name) {
       
      setError(true);
      setErrorMessage("Kategori adı boş bırakılamaz");
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }
    const hasCategory = categoriesState.categories.find(
      (item) =>
        upperFirstLetter(item.name.trim().replaceAll(" ", "")) ===
        upperFirstLetter(form.name.trim().replaceAll(" ", ""))
    );
    if (hasCategory) {
      setError(true);
      setErrorMessage(
        `${upperFirstLetter(
          hasCategory.name
        )} ismiyle zaten bir kategori kayıtlıdır`
      );
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }

    // api call
    api.post(urls.categories,form)
    .then((res)=>{
        dispatch({type:actionTypes.categoryAction.ADD_CATEGORIES,payload:form})
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
        <form onSubmit={formSubmit}>
          <label htmlFor="name" className="form-label ">
            <b>KATEGORİ ADI GİRİNİZ</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Kategori Adı Giriniz "
            value={form.name}
            onChange={(event) => 
              {setForm({ ...form, name: event.target.value });
            }}
          />
          {error && (
            <p>
              <small className="text-danger">{errorMessage}</small>
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

export default AddCategory;

// import { useSelector, useDispatch } from "react-redux";
// import actionTypes from "../redux/actions/actionTypes";

// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// import { upperFirstLetter } from "../utils/function";

// import api from "../api/api";
// import urls from "../api/urls";

// import Header from "../components/Header";
// /* truthy ve falsy
//     truthy: true,dolu string, dolu obje
//     falsy: false, boş string, null, undefined, boş obje
// */

// const AddCategory = () => {
//     const dispatch=useDispatch()
//     const navigate=useNavigate()
//   const { categoriesState } = useSelector((state) => state);
//   const [form, setForm] = useState({
//     id: String(new Date().getTime()),
//     name: "",
//   });
//   const [error, setError] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     /* validation */
//     if (!form.name) {
//       setError(true);
//       setErrorMessage("Kategori adı boş bırakılamaz");
//       setTimeout(() => {
//         setError(false);
//       }, 2000);
//       return;
//     }
//     const hasCategory = categoriesState.categories.find(
//       (item) =>
//         upperFirstLetter(item.name.trim().replaceAll(" ", "")) ===
//         upperFirstLetter(form.name.trim().replaceAll(" ", ""))
//     );
//     if (hasCategory) {
//       setError(true);
//       setErrorMessage(
//         `${upperFirstLetter(
//           hasCategory.name
//         )} ismiyle zaten bir kategori kayıtlıdır`
//       );
//       setTimeout(() => {
//         setError(false);
//       }, 2000);
//       return;
//     }
//     /* api call */
//     api.post(urls.categories,form)
//     .then(res => {
//         dispatch({type:actionTypes.categoryActions.ADD_CATEGORY,payload:form})
//         navigate("/categories")
//     })
//     .catch(err => {})
//   };
//   return (
//     <div>
//       <Header />
//       <div className="container my-5">
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="name" className="form-label">
//               Kategori Adı
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="name"
//               placeholder="Roman"
//               value={form.name}
//               onChange={(event) =>
//                 setForm({ ...form, name: event.target.value })
//               }
//             />
//             {error && (
//               <p>
//                 <small className="text-danger">{errorMessage}</small>
//               </p>
//             )}
//           </div>
//           <div className="d-flex justify-content-center my-5">
//             <button type="submit" className="btn btn-primary w-50">
//               Kaydet
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddCategory;
