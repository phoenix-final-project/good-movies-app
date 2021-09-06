import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { sessionService } from "redux-react-session";
import reducers from "./reducers/index";

const initialState = {};

const middleware = [thunk];

const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middleware)),
    {},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

sessionService.initSessionService(store);

export default store;
