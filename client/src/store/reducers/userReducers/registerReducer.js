const initialState = {
  loading: false,
  error: false,
  errorMessage: ""
};

export default function signInReducer(state = initialState, action) {
  switch (action.type) {
    case "REGISTER_USER_PENDING": {
      return { ...state, loading: true, error: false };
    }
    case "REGISTER_USER_FULFILLED": {
      return { ...state, loading: false, error: false };
    }
    case "REGISTER_USER_REJECTED": {
      console.log(action.payload);
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
