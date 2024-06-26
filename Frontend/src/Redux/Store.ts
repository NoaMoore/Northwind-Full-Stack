import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "./AppState";
import { productReducersContainer } from "./ProductsSlice";
import { supplierReducersContainer } from "./SuppliersSlice";
import { authReducersContainer } from "./AuthSlice";

// Creating the application store - the redux manager object: 
export const appStore = configureStore<AppState>({
    reducer: {
        products: productReducersContainer,
        suppliers: supplierReducersContainer,
        user: authReducersContainer
    }
});

