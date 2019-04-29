const initialState = {
  loading: false,
  error: false,
  errorMessage: ""
};

export default function getBlogById(state = initialState, action) {
  switch (action.type) {
    case "GET_BLOG_BY_ID": {
      return { ...state, loading: true, error: false };
    }
    case "GET_BLOG_BY_ID_FULFILLED": {
      return { ...state, loading: false, error: false };
    }
    case "GET_BLOG_BY_ID_REJECTED": {
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
