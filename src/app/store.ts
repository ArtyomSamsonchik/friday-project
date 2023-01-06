import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import authSlice from "../features/auth/authSlice";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
    auth: authSlice
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

//@ts-ignore
window.store = store