import { NavLink } from "react-router-dom";
import "./Menu.css";
import TotalProducts from "../../ProductsArea/TotalProducts/TotalProducts";
import TotalCategories from "../../CategoriesArea/TotalCategories/TotalCategories";

function Menu(): JSX.Element {
    return (
        <div className="Menu">

            <NavLink to="/home">Home</NavLink>
            <NavLink to="/products" end>Products</NavLink>
            <NavLink to="/products/new">Add Product</NavLink>
            <NavLink to="/about">About</NavLink>

            <div>
                <TotalProducts />
                <TotalCategories />
            </div>

        </div>
    );
}

export default Menu;
