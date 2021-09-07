import { createStore } from "redux";
import reducers from "./reducers/index";

//const initialState = {};

//const middleware = [thunk];

const store = createStore(
    reducers,

    //compose(applyMiddleware(...middleware)),
    {},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
