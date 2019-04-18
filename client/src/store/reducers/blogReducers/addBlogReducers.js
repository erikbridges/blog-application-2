const initialState = {
  loading: false,
  error: false,
  errorMessage: ""
};

export default function signInReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_BLOG_PENDING": {
      return { ...state, loading: true, error: false };
    }
    case "ADD_BLOG_FULFILLED": {
      return { ...state, loading: false, error: false };
    }
    case "ADD_BLOG_REJECTED": {
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
