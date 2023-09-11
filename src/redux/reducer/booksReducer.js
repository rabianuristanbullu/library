import actionTypes from "../actions/actionTypes";

const initialState = {
  pending: true,
  succes: false,
  books: [],
  error: false,
  errorMessage: "",
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.bookActions.GET_BOOKS_START:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.bookActions.GET_BOOKS_SUCCESS:
      return {
        ...state,
        pending: false,
        succes: true,
        books: action.payload,
        error: false,
      };
    case actionTypes.bookActions.GET_BOOKS_FAİL:
      return {
        ...state,
        pending: false,
        success: false,
        error: true,
        errorMessage: action.payload,
      };
    case actionTypes.bookActions.ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    case actionTypes.bookActions.DELETE_BOOK:
      let filteredBook = state.books.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        books: filteredBook,
      };
    case actionTypes.bookActions.EDIT_BOOK:
      let tempArray = [];
      for (let i = 0; i < state.books.length; i++) {
        if (state.books[i].id !== action.payload.id) {
          tempArray.push(state.books[i]);
        }else{
          tempArray.push(action.payload)
        }
      }
      return{
        ...state,books:tempArray
      }
    case actionTypes.bookActions.DELETE_BOOKS_AFTER_DELETE_CATEGORY:
      const filterBook=state.books.filter(item=> item.categoryId!==action.payload)
      return{
        ...state,books:filterBook
      }
    default:
      return state;
  }
};

export default booksReducer;
