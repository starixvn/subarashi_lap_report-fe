import React from "react";
import AppContainer from "./components/AppContainer";
import { Provider } from "react-redux";
import Store from "@srcRoot/lib/store";
import reducer from "./reducers";
// import styles
import "@srcRoot/styles/pages/_settledmatchcount.scss";

const SettledMatchCount = (props) => {
  const store = Store.createStore(reducer, {});
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default SettledMatchCount;
