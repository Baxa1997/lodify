import {combineReducers} from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import {authReducer} from "./auth/auth.slice";
import {alertReducer} from "./alert/alert.slice";

// const mainPersistConfig = {
//   key: "main",
//   storage,
// };

const authPersistConfig = {
  key: "auth",
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  alert: alertReducer,
  //   main: persistReducer(mainPersistConfig, mainReducer),
  //   auth: persistReducer(authPersistConfig, authReducer),
  //   constructorTable: persistReducer(
  //     constructorTablePersistConfig,
  //     constructorTableReducer
  //   ),
});

export default rootReducer;
