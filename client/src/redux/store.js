import { createStore } from "redux";
import reducers from "./reducers/index";

const store = createStore(
    reducers,
    {},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

// { createStore, applyMiddleware, compose }

/* import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers/index";

const persistConfig = {
    key: "root",
    storage,
    stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, reducers);


const store = () =>
    createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

// sessionService.initSessionService(store);

export default store; */
