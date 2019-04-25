const initialState = {
  loading: false,
  error: false,
  errorMessage: "",
  post: null
};

export default function getBlogReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_BLOG_PENDING": {
      return { ...state, loading: true, error: false };
    }
    case "GET_BLOG_FULFILLED": {
      return {
        ...state,
        loading: false,
        error: false,
        post: action.payload.data
      };
    }
    case "GET_BLOG_REJECTED": {
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
