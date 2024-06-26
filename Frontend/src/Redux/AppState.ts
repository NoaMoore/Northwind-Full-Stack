import ProductModel from "../Models/ProductModel";
import SupplierModel from "../Models/SupplierModel";
import UserModel from "../Models/UserModel";

// Application global state: 
export type AppState = {

    // First slice data - array of products: 
    products: ProductModel[];

    // Second slice data - array of suppliers: 
    suppliers: SupplierModel[];

    // Third slice data - the user:
    user: UserModel;
};
