import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root = createRoot(document.getElementById("root"));
const _rootUrl = window.rootUrl || "/";
root.render(
    <React.Fragment>
        <BrowserRouter basename={_rootUrl}>
            <App />
        </BrowserRouter>
    </React.Fragment>
);
