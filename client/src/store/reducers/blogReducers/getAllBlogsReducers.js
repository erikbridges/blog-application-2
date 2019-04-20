const initialState = {
  loading: false,
  error: false,
  errorMessage: ""
};

export default function signInReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_BLOGS_PENDING": {
      return { ...state, loading: true, error: false };
    }
    case "GET_ALL_BLOGS_FULFILLED": {
      return { ...state, loading: false, error: false };
    }
    case "GET_ALL_BLOGS_REJECTED": {
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.errorMessage
      };
    }
    default: {
      return state;
    }
  }
}
