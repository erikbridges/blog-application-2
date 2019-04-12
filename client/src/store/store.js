import { applyMiddleware, createStore } from "redux";
import promise from "redux-promise-middleware";
import reducer from "./reducers/reducerExecute";

const composeStoreWithMiddleware = createStore(
  reducer,
  applyMiddleware(promise)
);

export default composeStoreWithMiddleware;
