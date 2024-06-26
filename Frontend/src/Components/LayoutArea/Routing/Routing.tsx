import { Navigate, Route, Routes } from "react-router-dom";
import About from "../../AboutArea/About/About";
import Home from "../../HomeArea/Home/Home";
import AddProduct from "../../ProductsArea/AddProduct/AddProduct";
import ProductDetails from "../../ProductsArea/ProductDetails/ProductDetails";
import ProductList from "../../ProductsArea/ProductList/ProductList";
import AddSupplier from "../../SuppliersArea/AddSupplier/AddSupplier";
import SupplierDetails from "../../SuppliersArea/SupplierDetails/SupplierDetails";
import SupplierList from "../../SuppliersArea/SupplierList/SupplierList";
import Page404 from "../page404/page404";
import "./Routing.css";
import EditProduct from "../../ProductsArea/EditProduct/EditProduct";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";

function Routing(): JSX.Element {
    return (
        <div className="Routing">

            <Routes>

                {/* Home: */}
                <Route path="/home" element={<Home />} />

                {/* Products: */}
                <Route path="/products" element={<ProductList />} />

                {/* Product Details: */}
                <Route path="/products/details/:id" element={<ProductDetails />} />

                {/* Add Product: */}
                <Route path="/products/new" element={<AddProduct />} />

                {/* Edit Product: */}
                <Route path="/products/edit/:id" element={<EditProduct />} />

                {/* Suppliers: */}
                <Route path="/suppliers" element={<SupplierList />} />

                {/* Add Supplier: */}
                <Route path="/suppliers/new" element={<AddSupplier />} />

                {/* Supplier Details: */}
                <Route path="/suppliers/details/:id" element={<SupplierDetails />} />

                {/* About: */}
                <Route path="/about" element={<About />} />

                {/* Register: */}
                <Route path="/register" element={<Register />} />

                {/* Login: */}
                <Route path="/login" element={<Login />} />

                {/* Default Route: */}
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/" element={<Navigate to="/home" />} />

                {/* Page not found route: */}
                <Route path="*" element={<Page404 />} />

            </Routes>

        </div>
    );
}

export default Routing;
