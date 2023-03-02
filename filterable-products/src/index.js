import React from "react";
import ReactDOM from 'react-dom/client';

import {FilterableProductTable} from "./filterableProductTable";
import {products} from "./dataBaseMock";


//const PRODUCTS = products();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<FilterableProductTable products={products()} />);
