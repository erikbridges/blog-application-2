const initialState = {
  loading: false,
  error: false,
  errorMessage: ""
};

export default function signInReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_USER_PENDING": {
      return { ...state, loading: true, error: false };
    }
    case "LOGIN_USER_FULFILLED": {
      return { ...state, loading: false, error: false };
    }
    case "LOGIN_USER_REJECTED": {
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
