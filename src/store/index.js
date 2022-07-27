import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga/";
import auth from "./auth/slice";
import gallery from "./gallery/slice";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
      auth,
      gallery,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({ thunk: false }),
        sagaMiddleware,
      ],
});

for (const saga in sagas) {
    sagaMiddleware.run(sagas[saga]);
}

export default store;