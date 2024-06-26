import "./Home.css";
import imageSource1 from "../../../Assets/Images/home1.jpg";
import imageSource2 from "../../../Assets/Images/home2.jpg";
import { SyntheticEvent, useEffect, useState } from "react";
import UserData from "../UserData/UserData";
import Clock from "../Clock/Clock";
import RandomGift from "../RandomGift/RandomGift";
import useTitle from "../../../Utils/UseTitle";
import { monetaryService } from "../../../Services/MonetaryService";
import { notify } from "../../../Utils/Notify";

function Home(): JSX.Element {

    // Custom Hook:
    useTitle("Northwind Home");

    const num = Math.floor(Math.random() * 2) + 1;

    // Demo for getting desserts from backend:
    const desserts = [
        { id: 1, name: "Apple Pie", price: 10.7 },
        { id: 2, name: "Eclair", price: 17.4 },
        { id: 3, name: "Ice Cream", price: 20.5 },
        { id: 4, name: "Lemon Merengue", price: 30.6 }
    ];

    function showBestProduct(): void {
        const bestProduct = "India Coffee";
        notify.success(bestProduct);
    }

    function showBestSeller(args: SyntheticEvent): void {
        console.log(args);
        const bestSeller = "Exotic Liquids";
        notify.success(bestSeller);
    }

    const arr = useState<string>("Time...");
    const time = arr[0];
    const setTime = arr[1];

    function showTime(): void {
        const now = new Date();
        setTime(now.toLocaleTimeString()); // a. Update time variable, b. Rerender the component.
    }

    function showVat(): void {
        const price = +prompt("Enter a price: ")!; // ! --> we're not returning null or undefined.
        const vat = monetaryService.getVat(price);
        notify.success(`Price: ${price}, VAT: ${vat}`);
    }

    return (
        <div className="Home">

            <button onClick={showBestProduct}>Show Best Product</button>
            <button onClick={showBestSeller}>Show Best Seller</button>
            <button onClick={showTime}>Show Time</button>
            <button onClick={showVat}>Show VAT</button>
            {time}
            <hr />

            <UserData />

            <Clock />

            <br />

            <RandomGift />
            
            <br />

            {/* {num === 1 ? <p>10% discount!</p> : null} */}

            {/* Short Circuit */}
            {num === 1 && <p>10% discount!</p>}

            <img src={num === 1 ? imageSource1 : imageSource2} />
            <br />

            Desserts:
            <br />
            {desserts.map(d =>
                <div key={d.id} className="dessert">
                    <span>Name: {d.name}</span>
                    <br />
                    <span>Price: {d.price}</span>
                </div>
            )}

        </div>
    );


    // // Conditional Rendering: 
    // return (
    //     <div className="Home">
    //         {num === 1 ? <img src={imageSource1} /> : <img src={imageSource2} />}
    //     </div>
    // );

    // // Conditional Rendering: 
    // if (num === 1) {
    //     return (
    //         <div className="Home">
    //             <img src={imageSource1} />
    //         </div>
    //     );
    // }

    // return (
    //     <div className="Home">
    //         <img src={imageSource2} />
    //     </div>
    // );

}

export default Home;
